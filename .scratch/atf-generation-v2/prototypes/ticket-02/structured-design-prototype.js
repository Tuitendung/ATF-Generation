const {
    VARIABLE_DESIGN_HEADER,
    VARIABLE_TEST_DATA_HEADER,
} = require('./fixtures/fixture-matrix')

const DESIGN_KEY = /^[a-z][a-z0-9_]{0,63}$/
const ESCAPABLE = new Set(['|', ';', '=', '"', '\\'])
const VARIABLE_DESIGN_COLUMNS = [
    'entry_key', 'entry_kind', 'parent_key', 'label', 'control_type',
    'semantic_type', 'value_domain', 'default', 'visible', 'mandatory',
    'read_only', 'reference_table', 'order',
]
const VARIABLE_TEST_DATA_COLUMNS = [
    'test_value_key', 'variable_key', 'value', 'data_profile_key', 'mrvs_row_key',
]
const CONTROL_SEMANTIC = {
    single_line_text: 'text',
    multi_line_text: 'text',
    integer: 'integer',
    decimal: 'decimal',
    checkbox: 'boolean',
    yes_no: 'boolean',
    select_box: 'choice',
    multiple_choice: 'choice',
    reference: 'reference',
    list_collector: 'reference_set',
    lookup_select: 'reference',
    date: 'date',
    date_time: 'date_time',
}

function physicalLines(text) {
    return String(text).split(/\r\n|\n/)
}

function diagnostic(code, section, physicalLine, relevantKey, message) {
    return {
        severity: 'ERROR',
        code,
        section,
        physical_line: physicalLine,
        relevant_key: relevantKey || '',
        message,
    }
}

function splitEscapedCells(line) {
    const cells = ['']
    let invalidEscape = false

    for (let index = 0; index < line.length; index += 1) {
        const character = line[index]
        if (character === '\\') {
            const escaped = line[index + 1]
            if (!escaped || !ESCAPABLE.has(escaped)) {
                invalidEscape = true
                cells[cells.length - 1] += character
                if (escaped) {
                    cells[cells.length - 1] += escaped
                    index += 1
                }
            } else {
                cells[cells.length - 1] += character + escaped
                index += 1
            }
        } else if (character === '|') {
            cells.push('')
        } else {
            cells[cells.length - 1] += character
        }
    }

    return { cells, invalidEscape }
}

function decodeEscapes(value) {
    return value.replace(/\\([|;="\\])/g, '$1')
}

function validScalar(value, semanticType) {
    if (value === 'EMPTY') return true
    if (semanticType === 'text' || semanticType === 'choice') {
        return value.length >= 2 && value.startsWith('"') && value.endsWith('"')
    }
    if (semanticType === 'integer') return /^-?\d{1,15}$/.test(value)
    if (semanticType === 'decimal') {
        const match = value.match(/^-?(\d+)(?:\.(\d{1,6}))?$/)
        return Boolean(match && (match[1] + (match[2] || '')).length <= 15)
    }
    if (semanticType === 'boolean') return value === 'true' || value === 'false'
    if (semanticType === 'date') {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
        const parsed = new Date(value + 'T00:00:00Z')
        return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
    }
    if (semanticType === 'date_time') {
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) return false
        const parsed = new Date(value)
        return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().replace('.000Z', 'Z') === value
    }
    if (semanticType === 'reference') return /^REFERENCE_BY\(.+\)$/.test(value)
    if (semanticType === 'reference_set') return /^REFERENCE_SET\(.+\)$/.test(value) || value === 'EMPTY'
    return false
}

function parseTable(text, contract) {
    const lines = physicalLines(text)
    const diagnostics = []
    const rows = []
    const seenKeys = new Set()

    if (lines[0].trim() === '') {
        diagnostics.push(diagnostic(
            'SECTION_LEADING_BLANK', contract.section, 1, '',
            `${contract.section} must start with its exact header on physical line 1.`,
        ))
    }
    if (lines[0] !== contract.header) {
        diagnostics.push(diagnostic(
            'HEADER_MISMATCH', contract.section, 1, '',
            `${contract.section} header does not exactly match the Schema Version 2 header.`,
        ))
        return { rows, diagnostics }
    }

    for (let lineIndex = 1; lineIndex < lines.length; lineIndex += 1) {
        const source = lines[lineIndex]
        const lineNumber = lineIndex + 1
        if (source.trim() === '') continue

        const split = splitEscapedCells(source)
        if (split.invalidEscape) {
            diagnostics.push(diagnostic(
                'INVALID_ESCAPE', contract.section, lineNumber, '',
                'Only \\|, \\;, \\=, \", and \\\\ are valid Design Escape Sequences.',
            ))
            continue
        }
        if (split.cells.length !== contract.columns.length) {
            diagnostics.push(diagnostic(
                'COLUMN_COUNT_INVALID', contract.section, lineNumber, '',
                `Expected ${contract.columns.length} cells but found ${split.cells.length}.`,
            ))
            continue
        }

        const row = { physical_line: lineNumber }
        for (let cellIndex = 0; cellIndex < contract.columns.length; cellIndex += 1) {
            row[contract.columns[cellIndex]] = decodeEscapes(split.cells[cellIndex].trim())
        }
        rows.push(row)

        const key = row[contract.keyColumn]
        if (!DESIGN_KEY.test(key)) {
            diagnostics.push(diagnostic(
                'DESIGN_KEY_INVALID', contract.section, lineNumber, key,
                `${contract.keyColumn} must be a lowercase Design Key of 1 through 64 characters.`,
            ))
        } else if (seenKeys.has(key)) {
            diagnostics.push(diagnostic(
                'DESIGN_KEY_DUPLICATE', contract.section, lineNumber, key,
                `${key} repeats within ${contract.section}.`,
            ))
        } else {
            seenKeys.add(key)
        }

        contract.validateRow(row, diagnostics)
    }

    return { rows, diagnostics }
}

function parseVariableDesign(text) {
    return parseTable(text, {
        section: 'Variable Design',
        header: VARIABLE_DESIGN_HEADER,
        columns: VARIABLE_DESIGN_COLUMNS,
        keyColumn: 'entry_key',
        validateRow(row, diagnostics) {
            if (!['variable', 'single_row_variable_set', 'multi_row_variable_set'].includes(row.entry_kind)) {
                diagnostics.push(diagnostic(
                    'ENTRY_KIND_INVALID', 'Variable Design', row.physical_line, row.entry_key,
                    'entry_kind is outside the closed Schema Version 2 set.',
                ))
                return
            }
            if (row.entry_kind !== 'variable') return
            if (!Object.hasOwn(CONTROL_SEMANTIC, row.control_type)) {
                diagnostics.push(diagnostic(
                    'CONTROL_TYPE_UNSUPPORTED', 'Variable Design', row.physical_line, row.entry_key,
                    'control_type is outside the prototype mapping.',
                ))
                return
            }
            if (CONTROL_SEMANTIC[row.control_type] !== row.semantic_type) {
                diagnostics.push(diagnostic(
                    'CONTROL_SEMANTIC_MISMATCH', 'Variable Design', row.physical_line, row.entry_key,
                    'control_type and semantic_type are not an accepted mapping.',
                ))
                return
            }
            if (!validScalar(row.default, row.semantic_type)) {
                diagnostics.push(diagnostic(
                    'BASELINE_TYPE_MISMATCH', 'Variable Design', row.physical_line, row.entry_key,
                    'default is not valid for the declared Semantic Value Type.',
                ))
            }
            for (const property of ['visible', 'mandatory', 'read_only']) {
                if (row[property] !== 'true' && row[property] !== 'false') {
                    diagnostics.push(diagnostic(
                        'BASELINE_TYPE_MISMATCH', 'Variable Design', row.physical_line, row.entry_key,
                        `${property} must be true or false.`,
                    ))
                }
            }
            if (!/^\d+$/.test(row.order)) {
                diagnostics.push(diagnostic(
                    'ORDER_INVALID', 'Variable Design', row.physical_line, row.entry_key,
                    'order must be a nonnegative integer.',
                ))
            }
        },
    })
}

function parseVariableTestData(text, variableDesignResult) {
    const variables = new Map(
        (variableDesignResult?.rows || []).map((row) => [row.entry_key, row]),
    )
    return parseTable(text, {
        section: 'Variable Test Data',
        header: VARIABLE_TEST_DATA_HEADER,
        columns: VARIABLE_TEST_DATA_COLUMNS,
        keyColumn: 'test_value_key',
        validateRow(row, diagnostics) {
            for (const keyColumn of ['data_profile_key', 'mrvs_row_key']) {
                if (row[keyColumn] && !DESIGN_KEY.test(row[keyColumn])) {
                    diagnostics.push(diagnostic(
                        'DESIGN_KEY_INVALID', 'Variable Test Data', row.physical_line,
                        row[keyColumn], `${keyColumn} is not a valid Design Key.`,
                    ))
                }
            }
            const variable = variables.get(row.variable_key)
            if (!variable) {
                diagnostics.push(diagnostic(
                    'TEST_VARIABLE_UNKNOWN', 'Variable Test Data', row.physical_line,
                    row.test_value_key, `${row.variable_key} does not resolve in Variable Design.`,
                ))
                return
            }
            if (!validScalar(row.value, variable.semantic_type)) {
                diagnostics.push(diagnostic(
                    'TEST_VALUE_TYPE_MISMATCH', 'Variable Test Data', row.physical_line,
                    row.test_value_key, 'Candidate value is invalid for the declared Semantic Value Type.',
                ))
            }
        },
    })
}

const ANCHORS = ['BEHAVIOR_ID', 'TARGET', 'TRIGGER', 'LOGIC', 'END']

function anchorAt(line) {
    const trimmed = line.trim()
    let match = trimmed.match(/^BEHAVIOR_ID:\s*([^\s]+)\s*$/)
    if (match) return { name: 'BEHAVIOR_ID', value: match[1], valid: DESIGN_KEY.test(match[1]) }
    match = trimmed.match(/^TARGET:\s*([^\s]+)\s*$/)
    if (match) return {
        name: 'TARGET', value: match[1],
        valid: match[1] === 'CATALOG_FORM' || DESIGN_KEY.test(match[1]),
    }
    if (trimmed === 'TRIGGER:') return { name: 'TRIGGER', value: '', valid: true }
    if (trimmed === 'LOGIC:') return { name: 'LOGIC', value: '', valid: true }
    if (trimmed === 'END') return { name: 'END', value: '', valid: true }
    const prefix = trimmed.match(/^(BEHAVIOR_ID|TARGET|TRIGGER|LOGIC|END)\b/)
    return prefix ? { name: prefix[1], value: '', valid: false } : null
}

function outcomeAt(line) {
    const trimmed = line.trim()
    const match = trimmed.match(/^OUTCOME_ID:\s*([^\s]+)\s*$/)
    if (match) return { value: match[1], valid: DESIGN_KEY.test(match[1]) }
    return /^OUTCOME_ID\b/.test(trimmed) ? { value: '', valid: false } : null
}

function splitBusinessLogic(text) {
    const sourceLines = physicalLines(text)
    const diagnostics = []
    const blocks = []
    const behaviorIds = new Set()
    let current = null

    if (sourceLines.every((line) => line.trim() === '')) {
        return {
            blocks,
            diagnostics: [diagnostic(
                'SECTION_MISSING', 'Business Logic', 0, '',
                'Business Logic is absent or blank.',
            )],
        }
    }

    function addAnchorFailure(line, relevantKey) {
        diagnostics.push(diagnostic(
            'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', line, relevantKey,
            'A required structural anchor is malformed, duplicated, missing, or out of order.',
        ))
    }

    function closeCurrent(endLine) {
        const missing = ANCHORS.slice(0, 4).filter((name) => !current.seen.has(name))
        if (missing.length > 0) addAnchorFailure(0, current.behavior_id)
        if (current.outcome_ids.length === 0) {
            diagnostics.push(diagnostic(
                'OUTCOME_ID_INVALID', 'Business Logic', 0, current.behavior_id,
                'The block has no valid Test Designer-authored OUTCOME_ID marker.',
            ))
        }
        current.end_line = endLine
        current.lines = sourceLines
            .slice(current.start_line - 1, endLine)
            .map((line, index) => ({ physical_line: current.start_line + index, text: line }))
        blocks.push({
            behavior_id: current.behavior_id,
            target: current.target,
            start_line: current.start_line,
            end_line: current.end_line,
            outcome_ids: current.outcome_ids.slice(),
            lines: current.lines,
        })
        current = null
    }

    for (let index = 0; index < sourceLines.length; index += 1) {
        const line = sourceLines[index]
        const lineNumber = index + 1
        const anchor = anchorAt(line)

        if (anchor?.name === 'BEHAVIOR_ID' && anchor.valid) {
            if (current) {
                diagnostics.push(diagnostic(
                    'BEHAVIOR_NESTED', 'Business Logic', lineNumber, anchor.value,
                    'A new Behavior Block begins before the current block ends.',
                ))
                continue
            }
            current = {
                behavior_id: anchor.value,
                target: '',
                start_line: lineNumber,
                seen: new Set(['BEHAVIOR_ID']),
                lastAnchorIndex: 0,
                outcome_ids: [],
                outcomeIdSet: new Set(),
            }
            if (behaviorIds.has(anchor.value)) {
                diagnostics.push(diagnostic(
                    'BEHAVIOR_ID_DUPLICATE', 'Business Logic', lineNumber, anchor.value,
                    `${anchor.value} repeats within Business Logic.`,
                ))
            } else {
                behaviorIds.add(anchor.value)
            }
            continue
        }

        if (!current) {
            if (line.trim() !== '') {
                const code = anchor ? 'BEHAVIOR_ANCHOR_INVALID' : 'BUSINESS_CONTENT_OUTSIDE_BLOCK'
                diagnostics.push(diagnostic(
                    code, 'Business Logic', lineNumber, '',
                    'Nonblank Business Logic content appears outside a Behavior Block.',
                ))
            }
            continue
        }

        if (anchor) {
            if (!anchor.valid) {
                addAnchorFailure(lineNumber, current.behavior_id)
                continue
            }
            const anchorIndex = ANCHORS.indexOf(anchor.name)
            if (anchor.name === 'END') {
                if (current.lastAnchorIndex !== ANCHORS.indexOf('LOGIC')) {
                    addAnchorFailure(lineNumber, current.behavior_id)
                }
                closeCurrent(lineNumber)
                continue
            }
            if (current.seen.has(anchor.name) || anchorIndex !== current.lastAnchorIndex + 1) {
                addAnchorFailure(lineNumber, current.behavior_id)
                continue
            }
            current.seen.add(anchor.name)
            current.lastAnchorIndex = anchorIndex
            if (anchor.name === 'TARGET') current.target = anchor.value
            continue
        }

        const outcome = outcomeAt(line)
        if (outcome) {
            if (!outcome.valid) {
                diagnostics.push(diagnostic(
                    'OUTCOME_ID_INVALID', 'Business Logic', lineNumber, current.behavior_id,
                    'OUTCOME_ID must contain one valid Design Key.',
                ))
            } else if (current.outcomeIdSet.has(outcome.value)) {
                diagnostics.push(diagnostic(
                    'OUTCOME_ID_DUPLICATE', 'Business Logic', lineNumber, outcome.value,
                    `${outcome.value} repeats within ${current.behavior_id}.`,
                ))
            } else {
                current.outcomeIdSet.add(outcome.value)
                current.outcome_ids.push(outcome.value)
            }
        }
    }

    if (current) {
        diagnostics.push(diagnostic(
            'BEHAVIOR_UNTERMINATED', 'Business Logic', 0, current.behavior_id,
            'The Behavior Block has no closing END anchor.',
        ))
    }

    return { blocks, diagnostics }
}

function validateBeforeNowAssist(text, invokeNowAssist) {
    const result = splitBusinessLogic(text)
    if (result.diagnostics.length > 0) {
        return {
            terminal_result: 'DESIGN_INVALID',
            now_assist_calls: 0,
            blocks: result.blocks,
            diagnostics: result.diagnostics,
        }
    }

    for (const block of result.blocks) invokeNowAssist(block)
    return {
        terminal_result: null,
        now_assist_calls: result.blocks.length,
        blocks: result.blocks,
        diagnostics: [],
    }
}

module.exports = {
    parseVariableDesign,
    parseVariableTestData,
    splitBusinessLogic,
    validateBeforeNowAssist,
}

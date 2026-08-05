const test = require('node:test')
const assert = require('node:assert/strict')

const {
    parseVariableDesign,
    parseVariableTestData,
    splitBusinessLogic,
    validateBeforeNowAssist,
} = require('../structured-design-prototype')
const { tableFixtures, businessLogicFixtures } = require('../fixtures/fixture-matrix')

function diagnosticIdentity(diagnostic) {
    return [
        diagnostic.severity,
        diagnostic.code,
        diagnostic.section,
        diagnostic.physical_line,
        diagnostic.relevant_key,
    ]
}

test('Variable Design fixtures parse deterministically with retained physical lines', () => {
    for (const fixture of tableFixtures.variableDesign.valid) {
        const first = parseVariableDesign(fixture.text)
        const second = parseVariableDesign(fixture.text)
        assert.deepEqual(first, second, fixture.name)
        assert.deepEqual(first.diagnostics, [], fixture.name)
        assert.deepEqual(
            first.rows.map((row) => row.physical_line),
            fixture.expectedPhysicalLines,
            fixture.name,
        )
        assert.deepEqual(first.rows, fixture.expectedRows, fixture.name)
    }
})

test('Variable Test Data fixtures parse types and all five Design Escape Sequences', () => {
    const design = parseVariableDesign(tableFixtures.sharedVariableDesign)
    assert.deepEqual(design.diagnostics, [])

    for (const fixture of tableFixtures.variableTestData.valid) {
        const first = parseVariableTestData(fixture.text, design)
        const second = parseVariableTestData(fixture.text, design)
        assert.deepEqual(first, second, fixture.name)
        assert.deepEqual(first.diagnostics, [], fixture.name)
        assert.deepEqual(first.rows, fixture.expectedRows, fixture.name)
    }
})

test('Design Text Table invalid fixtures return exact ordered diagnostics', () => {
    for (const fixture of tableFixtures.invalid) {
        const result = fixture.section === 'Variable Design'
            ? parseVariableDesign(fixture.text)
            : parseVariableTestData(
                fixture.text,
                parseVariableDesign(tableFixtures.sharedVariableDesign),
            )

        assert.deepEqual(
            result.diagnostics.map(diagnosticIdentity),
            fixture.expectedDiagnostics,
            fixture.name,
        )
    }
})

test('CRLF and LF inputs have identical table semantics and physical line identity', () => {
    const lf = parseVariableDesign(tableFixtures.lineEndingText)
    const crlf = parseVariableDesign(tableFixtures.lineEndingText.replaceAll('\n', '\r\n'))
    assert.deepEqual(crlf, lf)
})

test('Business Logic fixtures split only structural anchors and preserve original lines', () => {
    for (const fixture of businessLogicFixtures.valid) {
        const first = splitBusinessLogic(fixture.text)
        const second = splitBusinessLogic(fixture.text)
        assert.deepEqual(first, second, fixture.name)
        assert.deepEqual(first.diagnostics, [], fixture.name)
        assert.deepEqual(
            first.blocks.map((block) => ({
                behavior_id: block.behavior_id,
                target: block.target,
                start_line: block.start_line,
                end_line: block.end_line,
                outcome_ids: block.outcome_ids,
                original_lines: block.lines.map((line) => line.text),
            })),
            fixture.expectedBlocks,
            fixture.name,
        )
    }
})

test('condition and effect prose is opaque to the structural splitter', () => {
    const a = splitBusinessLogic(businessLogicFixtures.opaqueA)
    const b = splitBusinessLogic(businessLogicFixtures.opaqueB)
    assert.deepEqual(a.diagnostics, [])
    assert.deepEqual(b.diagnostics, [])
    assert.deepEqual(
        a.blocks.map(({ behavior_id, target, start_line, end_line, outcome_ids }) => ({
            behavior_id, target, start_line, end_line, outcome_ids,
        })),
        b.blocks.map(({ behavior_id, target, start_line, end_line, outcome_ids }) => ({
            behavior_id, target, start_line, end_line, outcome_ids,
        })),
    )
})

test('Business Logic invalid fixtures return exact ordered diagnostics under LF and CRLF', () => {
    for (const fixture of businessLogicFixtures.invalid) {
        for (const text of [fixture.text, fixture.text.replaceAll('\n', '\r\n')]) {
            const result = splitBusinessLogic(text)
            assert.deepEqual(
                result.diagnostics.map(diagnosticIdentity),
                fixture.expectedDiagnostics,
                fixture.name,
            )
        }
    }
})

test('structurally invalid Business Logic makes zero Now Assist calls', () => {
    let calls = 0
    const result = validateBeforeNowAssist(
        businessLogicFixtures.invalid.find((fixture) => fixture.name === 'nested block').text,
        () => {
            calls += 1
        },
    )

    assert.equal(result.terminal_result, 'DESIGN_INVALID')
    assert.equal(result.now_assist_calls, 0)
    assert.equal(calls, 0)
    assert.ok(result.diagnostics.length > 0)
})

test('structurally valid Business Logic invokes the supplied seam once per block', () => {
    const calledWith = []
    const fixture = businessLogicFixtures.valid.find((candidate) => candidate.name === 'two independent blocks')
    const result = validateBeforeNowAssist(fixture.text, (block) => calledWith.push(block.behavior_id))

    assert.equal(result.terminal_result, null)
    assert.equal(result.now_assist_calls, 2)
    assert.deepEqual(calledWith, ['unicode_prompt', 'second_behavior'])
})

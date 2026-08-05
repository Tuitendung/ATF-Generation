const assert = require('node:assert/strict')
const crypto = require('node:crypto')
const {
    parseVariableDesign,
    parseVariableTestData,
    splitBusinessLogic,
    validateBeforeNowAssist,
} = require('./structured-design-prototype')
const { tableFixtures, businessLogicFixtures } = require('./fixtures/fixture-matrix')

function stable(value) {
    return JSON.stringify(value)
}

function hash(value) {
    return crypto.createHash('sha256').update(stable(value), 'utf8').digest('hex')
}

function repeat(name, operation) {
    const results = Array.from({ length: 10 }, operation)
    for (const result of results.slice(1)) assert.deepEqual(result, results[0], name)
    return { name, repeated_runs: 10, result_sha256: hash(results[0]) }
}

const variableDesign = parseVariableDesign(tableFixtures.sharedVariableDesign)
assert.deepEqual(variableDesign.diagnostics, [])

const matrix = []
for (const fixture of tableFixtures.variableDesign.valid) {
    matrix.push(repeat(`Variable Design valid: ${fixture.name}`, () => parseVariableDesign(fixture.text)))
}
for (const fixture of tableFixtures.variableTestData.valid) {
    matrix.push(repeat(
        `Variable Test Data valid: ${fixture.name}`,
        () => parseVariableTestData(fixture.text, variableDesign),
    ))
}
for (const fixture of tableFixtures.invalid) {
    matrix.push(repeat(`Design Text Table invalid: ${fixture.name}`, () => (
        fixture.section === 'Variable Design'
            ? parseVariableDesign(fixture.text)
            : parseVariableTestData(fixture.text, variableDesign)
    )))
}
for (const fixture of businessLogicFixtures.valid) {
    matrix.push(repeat(`Business Logic valid: ${fixture.name}`, () => splitBusinessLogic(fixture.text)))
}
for (const fixture of businessLogicFixtures.invalid) {
    matrix.push(repeat(`Business Logic invalid: ${fixture.name}`, () => splitBusinessLogic(fixture.text)))
}

let invalidCalls = 0
const invalidGate = validateBeforeNowAssist(
    businessLogicFixtures.invalid.find((fixture) => fixture.name === 'nested block').text,
    () => { invalidCalls += 1 },
)
assert.equal(invalidCalls, 0)
assert.equal(invalidGate.now_assist_calls, 0)
assert.equal(invalidGate.terminal_result, 'DESIGN_INVALID')

const lf = parseVariableDesign(tableFixtures.lineEndingText)
const crlf = parseVariableDesign(tableFixtures.lineEndingText.replaceAll('\n', '\r\n'))
assert.deepEqual(lf, crlf)

process.stdout.write(JSON.stringify({
    evidence_kind: 'local_executable_fixture_evidence',
    generated_at_utc: new Date().toISOString(),
    node_version: process.version,
    servicenow_sdk_version: '4.8.1',
    repeated_matrix: matrix,
    matrix_case_count: matrix.length,
    line_endings: {
        lf_result_sha256: hash(lf),
        crlf_result_sha256: hash(crlf),
        equivalent: true,
        retained_data_physical_lines: lf.rows.map((row) => row.physical_line),
    },
    structurally_invalid_business_logic: {
        terminal_result: invalidGate.terminal_result,
        now_assist_calls: invalidGate.now_assist_calls,
        observed_callback_calls: invalidCalls,
        ordered_diagnostic_sha256: hash(invalidGate.diagnostics),
    },
}, null, 2) + '\n')

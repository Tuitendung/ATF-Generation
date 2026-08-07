'use strict'

var assert = require('assert')
var crypto = require('crypto')
var fs = require('fs')
var path = require('path')

var GENERATED_UPDATE_DIRECTORY = path.resolve(__dirname, '../../../dist/app/update')
var EXPECTED_OUTPUT_RULES = [
    'Return only one JSON object and no Markdown or commentary.',
    'The object must exactly match the supplied Output Schema and must contain no additional properties.',
    'For supported, unambiguous Design, return status accepted and the complete normalized contract.',
    'For invalid, ambiguous, label-based, or unsupported Design, return status rejected with one stable code and physical source lines.',
    'Preserve quoted literals exactly, including Unicode, punctuation, and every whitespace character.',
    'Never translate, correct, normalize, or execute quoted text.',
].join('\n')
var EXTRACTOR_PROMPT_NAME = 'Ticket 01 Independent Extraction'
var VERIFIER_PROMPT_NAME = 'Ticket 01 Independent Verification Interpretation'
var EXPECTED_PROMPTS = [EXTRACTOR_PROMPT_NAME, VERIFIER_PROMPT_NAME]
var EXTRACTOR_V2_PROMPT_SHA256 = '2e14877f4558445f2d3926679b588b29dde560c537687b99f62bc58215ed097f'
var VERIFIER_V2_PROMPT_SHA256 = '955969442dfab07e9a12038c68c7fd4ed4c08351daf2b24bb41b2b65e22877ae'
var EXPECTED_REJECTION_DECISION_RULES = [
    'Use BOOLEAN_PARENTHESES_REQUIRED when one condition expression mixes AND and OR without explicit source parentheses.',
    'Do not use BOOLEAN_PARENTHESES_REQUIRED when the condition uses only one boolean operator or explicit source parentheses make the grouping unambiguous.',
    'For BOOLEAN_PARENTHESES_REQUIRED, cite only the physical condition line or lines containing the ambiguous mixed boolean expression.',
    'Do not cite valid BEHAVIOR_ID, TARGET, TRIGGER, LOGIC, OUTCOME_ID, or END anchors for BOOLEAN_PARENTHESES_REQUIRED.',
    'Use TECHNICAL_IDENTIFIER_REQUIRED when the Design uses a display label instead of a declared technical entry_key, or uses a fixed-choice display label instead of its internal value.',
    'Do not use TECHNICAL_IDENTIFIER_REQUIRED when the Design uses declared technical entry_key values and fixed-choice internal values.',
    'For TECHNICAL_IDENTIFIER_REQUIRED, cite only the physical line containing the label-based reference.',
    'Do not cite unrelated valid structural anchor lines for TECHNICAL_IDENTIFIER_REQUIRED.',
    'Use EFFECT_PROPERTY_UNSUPPORTED when an effect request is understandable but its requested property, presentation behavior, or effect capability is absent from the supported effects catalog.',
    'Do not use EFFECT_PROPERTY_UNSUPPORTED when the effect statement cannot be parsed into a supported effect shape or is structurally invalid.',
    'Use EFFECT_INVALID only when the effect statement cannot be parsed into a supported effect shape or is structurally invalid.',
    'Do not use EFFECT_INVALID merely because a clearly understandable requested property, presentation behavior, or effect capability is unsupported.',
    'For a rejected response, include only the physical source line or lines that directly contain the invalid, ambiguous, label-based, changed, or unsupported construct.',
    'Do not include BEHAVIOR_ID, TARGET, TRIGGER, LOGIC, OUTCOME_ID, END, or other valid structural anchor lines unless that anchor itself is the reason for rejection.',
].join('\n')
var EXPECTED_INPUT_REFERENCES = [
    '{{variable_design}}',
    '{{business_logic_block}}',
    '{{capability_catalog}}',
    '{{output_schema}}',
]

function decodeXmlText(value) {
    return value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
}

function elementText(xml, elementName) {
    var match = new RegExp('<' + elementName + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + elementName + '>').exec(xml)
    return match ? decodeXmlText(match[1]).replace(/\r\n/g, '\n') : null
}

function generatedPromptRecords() {
    assert.ok(
        fs.existsSync(GENERATED_UPDATE_DIRECTORY),
        'generated metadata is missing; run the SDK 4.8.1 build before this test'
    )

    return fs.readdirSync(GENERATED_UPDATE_DIRECTORY)
        .filter(function (fileName) { return /^sys_generative_ai_config_[a-f0-9]+\.xml$/.test(fileName) })
        .map(function (fileName) {
            var filePath = path.join(GENERATED_UPDATE_DIRECTORY, fileName)
            var xml = fs.readFileSync(filePath, 'utf8')
            return {
                fileName: fileName,
                name: elementText(xml, 'name'),
                prompt: elementText(xml, 'prompt'),
                version: elementText(xml, 'version'),
                active: elementText(xml, 'active'),
                model: elementText(xml, 'model'),
                state: elementText(xml, 'state'),
                temperature: elementText(xml, 'temperature'),
            }
        })
        .filter(function (record) { return EXPECTED_PROMPTS.indexOf(record.name) >= 0 })
}

function promptRecord(records, name, version) {
    return records.filter(function (record) {
        return record.name === name && record.version === version
    })[0]
}

function sha256(value) {
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex')
}

function assertGeneratedDraftSettings(record) {
    assert.strictEqual(record.active, 'false', record.name + ' version ' + record.version + ' must remain inactive before publication')
    assert.strictEqual(record.state, 'draft', record.name + ' version ' + record.version + ' must remain draft before publication')
    assert.strictEqual(record.model, 'llm_generic_small_v2', record.name + ' version ' + record.version + ' must report the generated SDK model token')
    assert.strictEqual(record.temperature, '0.2', record.name + ' version ' + record.version + ' must report the generated SDK temperature')
}

function testGeneratedTicket01PromptsContainDistinctExtractorV3AndUnchangedV2() {
    var records = generatedPromptRecords()
    var fileNames = {}
    var extractorV2 = promptRecord(records, EXTRACTOR_PROMPT_NAME, '2')
    var extractorV3 = promptRecord(records, EXTRACTOR_PROMPT_NAME, '3')
    var verifierV2 = promptRecord(records, VERIFIER_PROMPT_NAME, '2')

    assert.strictEqual(records.length, 3, 'the SDK must emit unchanged Extractor v2, distinct Extractor v3, and unchanged Verifier v2 records')
    assert.ok(extractorV2, 'the existing Extractor prompt version 2 record must remain present')
    assert.ok(extractorV3, 'a distinct Extractor prompt version 3 record must exist')
    assert.ok(verifierV2, 'the independent Verifier prompt version 2 record must remain present')
    assert.strictEqual(sha256(extractorV2.prompt), EXTRACTOR_V2_PROMPT_SHA256, 'Extractor prompt version 2 must remain byte-for-byte unchanged')
    assert.strictEqual(sha256(verifierV2.prompt), VERIFIER_V2_PROMPT_SHA256, 'Verifier prompt version 2 must remain byte-for-byte unchanged')
    assert.strictEqual(extractorV2.state, 'published', 'the unchanged lower Extractor v2 must reflect its already-published lifecycle state')
    assert.strictEqual(extractorV2.prompt.indexOf(EXPECTED_REJECTION_DECISION_RULES), -1, 'the published Extractor v2 baseline must not be mutated with v3 rules')
    assert.strictEqual(verifierV2.prompt.indexOf(EXPECTED_REJECTION_DECISION_RULES), -1, 'Verifier v2 must not receive Extractor v3 decision rules')
    assert.ok(extractorV3.prompt.indexOf(EXPECTED_REJECTION_DECISION_RULES) >= 0, 'Extractor v3 must inline the exact rejection decision and source-line attribution rules')
    assert.ok(extractorV3.prompt.indexOf('## Output\n' + EXPECTED_OUTPUT_RULES) >= 0, 'Extractor v3 must preserve the six reviewed output rules')
    assert.strictEqual(/\$\{[^}]+\}/.test(extractorV3.prompt), false, 'Extractor v3 must not emit unresolved JavaScript template placeholders')
    assert.strictEqual(/(?:^|\n)(?:outputRules|rejectionDecisionRules|sourceLineRules)(?:\n|$)/.test(extractorV3.prompt), false, 'Extractor v3 must not emit a literal rules-variable name')
    assert.notStrictEqual(extractorV2.fileName, extractorV3.fileName, 'Extractor v3 must have a distinct generated metadata identity')

    records.forEach(function (record) {
        assert.ok(record.prompt, record.name + ' must have generated prompt text')
        assert.strictEqual(
            /(?:^|\n)outputRules(?:\n|$)/.test(record.prompt),
            false,
            record.name + ' must not contain the unresolved outputRules identifier'
        )
        assert.ok(record.prompt.indexOf(EXPECTED_OUTPUT_RULES) >= 0, record.name + ' must retain the exact six reviewed output rules')
        EXPECTED_INPUT_REFERENCES.forEach(function (reference) {
            assert.ok(record.prompt.indexOf(reference) >= 0, record.name + ' must retain input reference ' + reference)
        })
        if (record === extractorV3 || record === verifierV2) {
            assertGeneratedDraftSettings(record)
        }
        assert.strictEqual(fileNames[record.fileName], undefined, 'all Ticket 01 prompt versions must be emitted as distinct records')
        fileNames[record.fileName] = true
    })

    assert.deepStrictEqual(
        records.map(function (record) { return record.name }).filter(function (name, index, names) { return names.indexOf(name) === index }).sort(),
        EXPECTED_PROMPTS.slice().sort(),
        'generated prompt names must remain limited to the reviewed Extractor and independent Verifier'
    )
}

testGeneratedTicket01PromptsContainDistinctExtractorV3AndUnchangedV2()
process.stdout.write('ticket-01 generated Now Assist prompt tests passed\n')

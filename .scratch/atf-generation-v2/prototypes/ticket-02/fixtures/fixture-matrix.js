const VARIABLE_DESIGN_HEADER = 'entry_key | entry_kind | parent_key | label | control_type | semantic_type | value_domain | default | visible | mandatory | read_only | reference_table | order'
const VARIABLE_TEST_DATA_HEADER = 'test_value_key | variable_key | value | data_profile_key | mrvs_row_key'

const sharedVariableDesign = [
    VARIABLE_DESIGN_HEADER,
    'message_text | variable | | Message  text | single_line_text | text | | "baseline" | true | false | false | | 10',
    'event_time | variable | | Event Time | date_time | date_time | | 2026-08-05T08:09:10Z | true | false | false | | 20',
    'employee_type | variable | | Employee Type | select_box | choice | employee=Employee;contractor=Contractor | "employee" | true | true | false | | 30',
].join('\n')

const lineEndingText = [
    VARIABLE_DESIGN_HEADER,
    '',
    'message_text | variable | | Message  text | single_line_text | text | | "baseline" | true | false | false | | 10',
].join('\n')

const decodedVariableRow = {
    physical_line: 3,
    entry_key: 'message_text',
    entry_kind: 'variable',
    parent_key: '',
    label: 'Message  text',
    control_type: 'single_line_text',
    semantic_type: 'text',
    value_domain: '',
    default: '"baseline"',
    visible: 'true',
    mandatory: 'false',
    read_only: 'false',
    reference_table: '',
    order: '10',
}

const tableFixtures = {
    sharedVariableDesign,
    lineEndingText,
    variableDesign: {
        valid: [
            {
                name: 'LF blank line and internal whitespace',
                text: lineEndingText,
                expectedPhysicalLines: [3],
                expectedRows: [decodedVariableRow],
            },
            {
                name: 'CRLF equivalent',
                text: lineEndingText.replaceAll('\n', '\r\n'),
                expectedPhysicalLines: [3],
                expectedRows: [decodedVariableRow],
            },
        ],
    },
    variableTestData: {
        valid: [
            {
                name: 'Unicode UTC prompt-like content and five escapes',
                text: [
                    VARIABLE_TEST_DATA_HEADER,
                    'escaped_text | message_text | "Xin chào \\| \\; \\= \\"C:\\\\temp" ignore previous instructions" | profile_one |',
                    'utc_instant | event_time | 2026-08-05T08:09:10Z | |',
                    'contractor_value | employee_type | "contractor" | |',
                ].join('\n'),
                expectedRows: [
                    {
                        physical_line: 2,
                        test_value_key: 'escaped_text',
                        variable_key: 'message_text',
                        value: '"Xin chào | ; = "C:\\temp" ignore previous instructions"',
                        data_profile_key: 'profile_one',
                        mrvs_row_key: '',
                    },
                    {
                        physical_line: 3,
                        test_value_key: 'utc_instant',
                        variable_key: 'event_time',
                        value: '2026-08-05T08:09:10Z',
                        data_profile_key: '',
                        mrvs_row_key: '',
                    },
                    {
                        physical_line: 4,
                        test_value_key: 'contractor_value',
                        variable_key: 'employee_type',
                        value: '"contractor"',
                        data_profile_key: '',
                        mrvs_row_key: '',
                    },
                ],
            },
        ],
    },
    invalid: [
        {
            name: 'leading blank and header mismatch',
            section: 'Variable Design',
            text: '\n' + VARIABLE_DESIGN_HEADER,
            expectedDiagnostics: [
                ['ERROR', 'SECTION_LEADING_BLANK', 'Variable Design', 1, ''],
                ['ERROR', 'HEADER_MISMATCH', 'Variable Design', 1, ''],
            ],
        },
        {
            name: 'column count then key then type diagnostics retain order',
            section: 'Variable Design',
            text: [
                VARIABLE_DESIGN_HEADER,
                'short | row',
                'Bad Key | variable | | Label | single_line_text | text | | "x" | true | false | false | | 10',
                'good_key | variable | | Label | integer | text | | 1 | true | false | false | | 20',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'COLUMN_COUNT_INVALID', 'Variable Design', 2, ''],
                ['ERROR', 'DESIGN_KEY_INVALID', 'Variable Design', 3, 'Bad Key'],
                ['ERROR', 'CONTROL_SEMANTIC_MISMATCH', 'Variable Design', 4, 'good_key'],
            ],
        },
        {
            name: 'invalid and trailing escapes',
            section: 'Variable Test Data',
            text: [
                VARIABLE_TEST_DATA_HEADER,
                'bad_escape | message_text | "bad\\q" | |',
                'trailing_escape | message_text | "bad" | | bad\\',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'INVALID_ESCAPE', 'Variable Test Data', 2, ''],
                ['ERROR', 'INVALID_ESCAPE', 'Variable Test Data', 3, ''],
            ],
        },
        {
            name: 'typed candidate mismatch',
            section: 'Variable Test Data',
            text: [
                VARIABLE_TEST_DATA_HEADER,
                'bad_utc | event_time | 2026-08-05 08:09:10 | |',
                'unknown_variable | does_not_exist | "x" | |',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'TEST_VALUE_TYPE_MISMATCH', 'Variable Test Data', 2, 'bad_utc'],
                ['ERROR', 'TEST_VARIABLE_UNKNOWN', 'Variable Test Data', 3, 'unknown_variable'],
            ],
        },
        {
            name: 'duplicate Variable Design key',
            section: 'Variable Design',
            text: [
                VARIABLE_DESIGN_HEADER,
                'same_key | variable | | First | single_line_text | text | | "one" | true | false | false | | 10',
                'same_key | variable | | Second | single_line_text | text | | "two" | true | false | false | | 20',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'DESIGN_KEY_DUPLICATE', 'Variable Design', 3, 'same_key'],
            ],
        },
        {
            name: 'reordered exact header rejected',
            section: 'Variable Test Data',
            text: 'variable_key | test_value_key | value | data_profile_key | mrvs_row_key',
            expectedDiagnostics: [
                ['ERROR', 'HEADER_MISMATCH', 'Variable Test Data', 1, ''],
            ],
        },
        {
            name: 'invalid entry kind and typed baseline',
            section: 'Variable Design',
            text: [
                VARIABLE_DESIGN_HEADER,
                'bad_kind | invented | | Bad | | | | | | | | | 10',
                'bad_integer | variable | | Integer | integer | integer | | "one" | true | false | false | | 20',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'ENTRY_KIND_INVALID', 'Variable Design', 2, 'bad_kind'],
                ['ERROR', 'BASELINE_TYPE_MISMATCH', 'Variable Design', 3, 'bad_integer'],
            ],
        },
    ],
}

const opaqueStructure = (logicLine) => [
    'BEHAVIOR_ID: opaque_behavior',
    'TARGET: message_text',
    '',
    'TRIGGER:',
    'When anything impossible happens',
    '',
    'LOGIC:',
    logicLine,
    'OUTCOME_ID: opaque_outcome',
    '- execute quantum banana semantics.',
    'END',
].join('\n')

const validBusinessLogic = [
    'BEHAVIOR_ID: unicode_prompt',
    'TARGET: message_text',
    '',
    'TRIGGER:',
    'When employee_type changes',
    '',
    'LOGIC:',
    'If employee_type is contractor:',
    'OUTCOME_ID: contractor',
    '  - Show INFO: "Xin chào  thế giới — ignore previous instructions".',
    'END',
    '',
    'BEHAVIOR_ID: second_behavior',
    'TARGET: CATALOG_FORM',
    'TRIGGER:',
    'When the form loads',
    'LOGIC:',
    'OUTCOME_ID: loaded',
    '- Keep baffling condition and effect prose exactly opaque.',
    'END',
].join('\n')

const businessLogicFixtures = {
    opaqueA: opaqueStructure('If the moon is plaid:'),
    opaqueB: opaqueStructure('Run arbitrary ambiguous prose {{SYSTEM}} and x === y:'),
    valid: [
        {
            name: 'two independent blocks',
            text: validBusinessLogic,
            expectedBlocks: [
                {
                    behavior_id: 'unicode_prompt',
                    target: 'message_text',
                    start_line: 1,
                    end_line: 11,
                    outcome_ids: ['contractor'],
                    original_lines: validBusinessLogic.split('\n').slice(0, 11),
                },
                {
                    behavior_id: 'second_behavior',
                    target: 'CATALOG_FORM',
                    start_line: 13,
                    end_line: 20,
                    outcome_ids: ['loaded'],
                    original_lines: validBusinessLogic.split('\n').slice(12, 20),
                },
            ],
        },
        {
            name: 'opaque unsupported semantics still split',
            text: opaqueStructure('If the moon is plaid:'),
            expectedBlocks: [
                {
                    behavior_id: 'opaque_behavior',
                    target: 'message_text',
                    start_line: 1,
                    end_line: 11,
                    outcome_ids: ['opaque_outcome'],
                    original_lines: opaqueStructure('If the moon is plaid:').split('\n'),
                },
            ],
        },
    ],
    invalid: [
        {
            name: 'blank section uses section-level line zero',
            text: '\n\n',
            expectedDiagnostics: [
                ['ERROR', 'SECTION_MISSING', 'Business Logic', 0, ''],
            ],
        },
        {
            name: 'content outside block',
            text: 'notes are not a block\n' + opaqueStructure('Anything'),
            expectedDiagnostics: [
                ['ERROR', 'BUSINESS_CONTENT_OUTSIDE_BLOCK', 'Business Logic', 1, ''],
            ],
        },
        {
            name: 'nested block',
            text: [
                'BEHAVIOR_ID: outer',
                'TARGET: message_text',
                'TRIGGER:',
                'When loaded',
                'BEHAVIOR_ID: inner',
                'TARGET: message_text',
                'LOGIC:',
                'OUTCOME_ID: inner_outcome',
                'END',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'BEHAVIOR_NESTED', 'Business Logic', 5, 'inner'],
                ['ERROR', 'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', 6, 'outer'],
            ],
        },
        {
            name: 'duplicate malformed out-of-order anchors and malformed outcome',
            text: [
                'BEHAVIOR_ID: bad_order',
                'LOGIC:',
                'TARGET: message_text',
                'TARGET: other',
                'TRIGGER',
                'OUTCOME_ID bad',
                'END',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', 2, 'bad_order'],
                ['ERROR', 'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', 4, 'bad_order'],
                ['ERROR', 'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', 5, 'bad_order'],
                ['ERROR', 'OUTCOME_ID_INVALID', 'Business Logic', 6, 'bad_order'],
                ['ERROR', 'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', 7, 'bad_order'],
                ['ERROR', 'BEHAVIOR_ANCHOR_INVALID', 'Business Logic', 0, 'bad_order'],
                ['ERROR', 'OUTCOME_ID_INVALID', 'Business Logic', 0, 'bad_order'],
            ],
        },
        {
            name: 'missing END',
            text: opaqueStructure('Anything').split('\n').slice(0, -1).join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'BEHAVIOR_UNTERMINATED', 'Business Logic', 0, 'opaque_behavior'],
            ],
        },
        {
            name: 'duplicate behavior and outcome identifiers',
            text: opaqueStructure('Anything') + '\n' + [
                'BEHAVIOR_ID: opaque_behavior',
                'TARGET: message_text',
                'TRIGGER:',
                'When loaded',
                'LOGIC:',
                'OUTCOME_ID: same',
                'OUTCOME_ID: same',
                'END',
            ].join('\n'),
            expectedDiagnostics: [
                ['ERROR', 'BEHAVIOR_ID_DUPLICATE', 'Business Logic', 12, 'opaque_behavior'],
                ['ERROR', 'OUTCOME_ID_DUPLICATE', 'Business Logic', 18, 'same'],
            ],
        },
    ],
}

module.exports = {
    VARIABLE_DESIGN_HEADER,
    VARIABLE_TEST_DATA_HEADER,
    tableFixtures,
    businessLogicFixtures,
}

(function () {
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var APP_SCOPE_ID = '4c6b7718ad6b40709b6243636b59e772'
    var SYSTEM_ADMINISTRATOR_ID = '6816f79cc0a8016401c5a33be04be441'
    var VIEW_NAME = 'catalog_test_specification'
    var EXPECTED_CREATE_SPECIFICATION_URL =
        'kb_knowledge.do?sys_id=-1&sysparm_view=' +
        VIEW_NAME +
        '&sysparm_query=kb_knowledge_base%3D' +
        KB_ID
    var EXPECTED_MODULE_FILTER =
        'kb_knowledge_base=' + KB_ID + '^ORDERBYDESCsys_updated_on'

    function fail(message) {
        throw new Error('Ticket 02 acceptance failed: ' + message)
    }

    function expectEqual(actual, expected, label) {
        if (String(actual || '') !== String(expected || '')) {
            fail(label + ' expected [' + expected + '] but was [' + actual + ']')
        }
    }

    function expectOne(record, label) {
        record.setLimit(2)
        record.query()
        if (!record.next()) {
            fail(label + ' was not found')
        }
        var found = record.getUniqueValue()
        if (record.next()) {
            fail(label + ' was ambiguous')
        }
        record.get(found)
        return record
    }

    function expectNoScopedRecord(table, field, value, label) {
        var record = new GlideRecord(table)
        record.addQuery(field, value)
        record.addQuery('sys_scope', APP_SCOPE_ID)
        record.setLimit(1)
        record.query()
        if (record.next()) {
            fail(label + ' must not exist')
        }
    }

    function expectActivePublishedFlow(record, field, expectedName, label) {
        if (!record.getValue(field)) {
            fail(label + ' must be configured')
        }
        var referencedRecord = record.getElement(field).getRefRecord()
        if (!referencedRecord || !referencedRecord.isValidRecord()) {
            fail(label + ' reference is invalid')
        }
        expectEqual(referencedRecord.getValue('name'), expectedName, label)
        expectEqual(referencedRecord.getValue('active'), '1', label + ' active')
        expectEqual(referencedRecord.getValue('status'), 'published', label + ' status')
        expectEqual(referencedRecord.getValue('type'), 'flow', label + ' type')
    }

    var knowledgeBase = new GlideRecord('kb_knowledge_base')
    if (!knowledgeBase.get(KB_ID)) {
        fail('application-owned Specification Knowledge Base was not found by metadata identity')
    }
    expectEqual(knowledgeBase.getValue('title'), 'Catalog Test Specifications', 'Knowledge Base title')
    expectEqual(knowledgeBase.getValue('active'), '1', 'Knowledge Base active')
    expectEqual(knowledgeBase.getValue('application'), APP_SCOPE_ID, 'Knowledge Base application')
    expectEqual(
        knowledgeBase.getValue('owner'),
        SYSTEM_ADMINISTRATOR_ID,
        'Knowledge Base owner'
    )

    expectEqual(knowledgeBase.getValue('workflow'), '', 'Legacy Knowledge Base publish workflow')
    expectActivePublishedFlow(
        knowledgeBase,
        'kb_publish_flow',
        'Knowledge - Instant Publish',
        'Knowledge Base publish flow'
    )
    expectEqual(
        knowledgeBase.getValue('retire_workflow'),
        '',
        'Legacy Knowledge Base retire workflow'
    )
    expectActivePublishedFlow(
        knowledgeBase,
        'kb_retire_flow',
        'Knowledge - Instant Retire',
        'Knowledge Base retire flow'
    )

    var fields = [
        ['x_gemjp_atf_genera_catalog_item', 'reference', 'sc_cat_item', ''],
        ['x_gemjp_atf_genera_schema_version', 'integer', '', '1'],
        ['x_gemjp_atf_genera_accessible_criteria', 'reference', 'user_criteria', ''],
        ['x_gemjp_atf_genera_accessible_user', 'reference', 'sys_user', ''],
        ['x_gemjp_atf_genera_inaccessible_criteria', 'reference', 'user_criteria', ''],
        ['x_gemjp_atf_genera_inaccessible_user', 'reference', 'sys_user', ''],
    ]

    for (var fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        var expectedField = fields[fieldIndex]
        var dictionary = new GlideRecord('sys_dictionary')
        dictionary.addQuery('name', 'kb_knowledge')
        dictionary.addQuery('element', expectedField[0])
        dictionary = expectOne(dictionary, 'Dictionary field ' + expectedField[0])
        expectEqual(dictionary.getValue('internal_type'), expectedField[1], expectedField[0] + ' type')
        expectEqual(dictionary.getValue('reference'), expectedField[2], expectedField[0] + ' reference')
        expectEqual(dictionary.getValue('default_value'), expectedField[3], expectedField[0] + ' default')
        expectEqual(dictionary.getValue('mandatory'), '0', expectedField[0] + ' mandatory')
        expectEqual(dictionary.getValue('read_only'), '0', expectedField[0] + ' editable')
    }

    var module = new GlideRecord('sys_app_module')
    module.addQuery('sys_scope', APP_SCOPE_ID)
    module.addQuery('title', 'Catalog Test Specifications')
    module = expectOne(module, 'Catalog Test Specifications module')
    expectEqual(module.getValue('name'), 'kb_knowledge', 'Module table')
    expectEqual(module.getValue('link_type'), 'LIST', 'Module link type')
    expectEqual(module.getValue('filter'), EXPECTED_MODULE_FILTER, 'Module filter and order')
    expectEqual(module.getValue('view_name'), VIEW_NAME, 'Module view')

    var applicationMenu = new GlideRecord('sys_app_application')
    if (!applicationMenu.get(module.getValue('application'))) {
        fail('ATF Generation application menu was not found')
    }
    expectEqual(applicationMenu.getValue('title'), 'ATF Generation', 'Application menu title')

    var createModule = new GlideRecord('sys_app_module')
    createModule.addQuery('sys_scope', APP_SCOPE_ID)
    createModule.addQuery('title', 'Create New')
    createModule = expectOne(createModule, 'Create New module')
    expectEqual(
        createModule.getValue('application'),
        module.getValue('application'),
        'Create New module application menu'
    )
    expectEqual(createModule.getValue('link_type'), 'DIRECT', 'Create New module link type')
    expectEqual(
        createModule.getValue('query'),
        EXPECTED_CREATE_SPECIFICATION_URL,
        'Create New module direct authoring destination'
    )
    expectEqual(createModule.getValue('active'), '1', 'Create New module active')
    expectEqual(createModule.getValue('order'), '200', 'Create New module order')

    var view = new GlideRecord('sys_ui_view')
    view.addQuery('name', VIEW_NAME)
    view = expectOne(view, 'Catalog Test Specification view')

    var scopedNewAction = new GlideRecord('sys_ui_action')
    scopedNewAction.addQuery('sys_scope', APP_SCOPE_ID)
    scopedNewAction.addQuery('table', 'kb_knowledge')
    scopedNewAction.addQuery('name', 'New')
    scopedNewAction.addQuery('active', true)
    scopedNewAction.setLimit(1)
    scopedNewAction.query()
    if (scopedNewAction.next()) {
        fail('active scoped New UI Action must not exist')
    }

    expectNoScopedRecord(
        'sys_ui_action_view',
        'sys_ui_view',
        view.getUniqueValue(),
        'Ticket 02 UI Action view mapping'
    )

    var list = new GlideRecord('sys_ui_list')
    list.addQuery('name', 'kb_knowledge')
    list.addQuery('view', view.getUniqueValue())
    list.addNullQuery('parent')
    list = expectOne(list, 'Catalog Test Specification list')

    var expectedColumns = [
        'number',
        'short_description',
        'x_gemjp_atf_genera_catalog_item',
        'workflow_state',
        'x_gemjp_atf_genera_schema_version',
        'sys_updated_on',
        'sys_updated_by',
    ]
    var listElements = new GlideRecord('sys_ui_list_element')
    listElements.addQuery('list_id', list.getUniqueValue())
    listElements.orderBy('position')
    listElements.query()
    var columnIndex = 0
    while (listElements.next()) {
        if (columnIndex >= expectedColumns.length) {
            fail('Catalog Test Specification list contains extra columns')
        }
        expectEqual(
            listElements.getValue('element'),
            expectedColumns[columnIndex],
            'List column at position ' + columnIndex
        )
        columnIndex++
    }
    expectEqual(columnIndex, expectedColumns.length, 'List column count')

    var expectedSections = [
        {
            caption: 'Specification Identity',
            fields: [
                'number',
                'kb_knowledge_base',
                'workflow_state',
                'short_description',
                'x_gemjp_atf_genera_catalog_item',
                'x_gemjp_atf_genera_schema_version',
            ],
        },
        {
            caption: 'Permission Design',
            fields: [
                'x_gemjp_atf_genera_accessible_criteria',
                'x_gemjp_atf_genera_accessible_user',
                'x_gemjp_atf_genera_inaccessible_criteria',
                'x_gemjp_atf_genera_inaccessible_user',
            ],
        },
        { caption: 'Human Notes', fields: ['text'] },
    ]

    var form = new GlideRecord('sys_ui_form')
    form.addQuery('name', 'kb_knowledge')
    form.addQuery('view', view.getUniqueValue())
    form = expectOne(form, 'Catalog Test Specification form')

    var formSections = new GlideRecord('sys_ui_form_section')
    formSections.addQuery('sys_ui_form', form.getUniqueValue())
    formSections.orderBy('position')
    formSections.query()
    var sectionIndex = 0
    while (formSections.next()) {
        if (sectionIndex >= expectedSections.length) {
            fail('Catalog Test Specification form contains extra sections')
        }
        var section = formSections.sys_ui_section.getRefRecord()
        var expectedSection = expectedSections[sectionIndex]
        expectEqual(section.getValue('caption'), expectedSection.caption, 'Form section ' + sectionIndex)

        var elements = new GlideRecord('sys_ui_element')
        elements.addQuery('sys_ui_section', section.getUniqueValue())
        elements.orderBy('position')
        elements.query()
        var elementIndex = 0
        while (elements.next()) {
            if (elementIndex >= expectedSection.fields.length) {
                fail(expectedSection.caption + ' contains extra fields')
            }
            expectEqual(
                elements.getValue('element'),
                expectedSection.fields[elementIndex],
                expectedSection.caption + ' field at position ' + elementIndex
            )
            elementIndex++
        }
        expectEqual(elementIndex, expectedSection.fields.length, expectedSection.caption + ' field count')
        sectionIndex++
    }
    expectEqual(sectionIndex, expectedSections.length, 'Form section count')

    expectNoScopedRecord('sys_ui_policy', 'table', 'kb_knowledge', 'Ticket 02 UI Policy')
    expectNoScopedRecord('sys_data_policy2', 'model_table', 'kb_knowledge', 'Ticket 02 Data Policy')
    expectNoScopedRecord(
        'sys_ui_list_control',
        'name',
        'kb_knowledge',
        'Ticket 02 table-wide List Control'
    )
})()

(function (outputs, steps, params, stepResult, assertEqual) {
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var SPECIFICATION_ID = '8a3a39021d033110f8779da9137d35b3'
    var LATER_SPECIFICATION_ID = '9b3a39021d033110f8779da9137d35b3'
    var CATALOG_ITEM_ID = '04b7e94b4f7b4200086eeed18110c7fd'
    var REPRESENTATIVE_TEST_USER_ID = 'd8f57f140b20220050192f15d6673a98'
    var SERVICE_PORTAL_ID = '81b75d3147032100ba13a5554ee4902b'
    var CATALOG_ITEM_PAGE_ID = '9f12251147132100ba13a5554ee490f4'
    var REQUESTED_BY = 'ticket03.integration'

    function fail(message) {
        throw new Error('Ticket 03 worker integration failure: ' + message)
    }

    function requireValue(actual, expected, label) {
        if (String(actual || '') !== String(expected || '')) {
            fail(label + ' expected [' + expected + '] but was [' + actual + ']')
        }
    }

    function requireContains(actual, expected, label) {
        if (String(actual || '').indexOf(String(expected)) === -1) {
            fail(label + ' expected to contain [' + expected + ']')
        }
    }

    function requireRecord(table, sysId, label) {
        var record = new GlideRecord(table)
        if (!record.get(sysId)) {
            fail(label + ' was not found: ' + sysId)
        }
        return record
    }

    function resolveInputDefinition(stepConfigId, element) {
        var definition = new GlideRecord('sys_atf_variable')
        definition.addQuery('sys_class_name', 'atf_input_variable')
        definition.addQuery('model', stepConfigId)
        definition.addQuery('element', element)
        definition.addQuery('active', true)
        definition.addQuery('mandatory', true)
        definition.setLimit(2)
        definition.query()
        if (!definition.next()) {
            fail('required input definition was not found: ' + element)
        }
        var id = definition.getUniqueValue()
        if (definition.next()) {
            fail('required input definition was ambiguous: ' + element)
        }
        return id
    }

    function requireInput(stepId, definitionId, expected, label) {
        var input = new GlideRecord('sys_variable_value')
        input.addQuery('document', 'sys_atf_step')
        input.addQuery('document_key', stepId)
        input.addQuery('variable', definitionId)
        input.setLimit(2)
        input.query()
        if (!input.next()) {
            fail(label + ' input was not found')
        }
        requireValue(input.getValue('value'), expected, label + ' input')
        if (input.next()) {
            fail(label + ' input was duplicated')
        }
    }

    var criteria = new GlideRecord('user_criteria')
    criteria.setLimit(1)
    criteria.query()
    if (!criteria.next()) {
        fail('an OOB User Criteria fixture was not found')
    }
    var criteriaId = criteria.getUniqueValue()

    var staleSpecification = new GlideRecord('kb_knowledge')
    if (staleSpecification.get(SPECIFICATION_ID)) {
        staleSpecification.deleteRecord()
    }

    var specification = new GlideRecord('kb_knowledge')
    specification.initialize()
    specification.setNewGuidValue(SPECIFICATION_ID)
    specification.setValue('kb_knowledge_base', KB_ID)
    specification.setValue('workflow_state', 'published')
    specification.setValue('short_description', 'Ticket 03 worker integration fixture')
    specification.setValue('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
    specification.setValue('x_gemjp_atf_genera_schema_version', 1)
    specification.setValue('x_gemjp_atf_genera_accessible_criteria', criteriaId)
    specification.setValue(
        'x_gemjp_atf_genera_accessible_user',
        REPRESENTATIVE_TEST_USER_ID
    )
    if (!specification.insert()) {
        fail('bound Specification fixture could not be inserted')
    }
    // A second Published record proves that the worker reads the exact bound
    // Specification and does not repeat the Current Specification lookup.
    var laterSpecification = new GlideRecord('kb_knowledge')
    if (laterSpecification.get(LATER_SPECIFICATION_ID)) {
        laterSpecification.deleteRecord()
    }
    laterSpecification.initialize()
    laterSpecification.setNewGuidValue(LATER_SPECIFICATION_ID)
    laterSpecification.setValue('kb_knowledge_base', KB_ID)
    laterSpecification.setValue('workflow_state', 'published')
    laterSpecification.setValue('short_description', 'Ticket 03 later Published fixture')
    laterSpecification.setValue('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
    laterSpecification.setValue('x_gemjp_atf_genera_schema_version', 1)
    laterSpecification.setValue('x_gemjp_atf_genera_accessible_criteria', criteriaId)
    laterSpecification.setValue(
        'x_gemjp_atf_genera_accessible_user',
        '6816f79cc0a8016401c5a33be04be441'
    )
    if (!laterSpecification.insert()) {
        fail('later Published Specification fixture could not be inserted')
    }
    var runStamp = new GlideDateTime().getValue()
    var sessionUserBefore = gs.getUserID()

    var generated = new AtfGenerationService().generateAccessibleFromBoundSpecification({
        catalogItemId: CATALOG_ITEM_ID,
        specificationId: SPECIFICATION_ID,
        runStamp: runStamp,
        requestedBy: REQUESTED_BY,
    })

    requireValue(gs.getUserID(), sessionUserBefore, 'worker session identity')
    specification.deleteRecord()
    laterSpecification.deleteRecord()

    var suite = requireRecord('sys_atf_test_suite', generated.suiteId, 'Test Suite')
    requireValue(suite.getValue('active'), '1', 'Test Suite active')
    requireContains(suite.getValue('name'), runStamp, 'Suite run stamp')

    var test = requireRecord('sys_atf_test', generated.testId, 'Accessible Test')
    requireValue(test.getValue('active'), '1', 'Accessible Test active')
    requireValue(test.getValue('enable_parameterized_testing'), '0', 'automatic parameterized execution')
    requireContains(test.getValue('name'), 'ACCESSIBLE', 'Accessible Test outcome label')
    requireContains(test.getValue('name'), runStamp, 'Accessible Test run stamp')

    var memberships = new GlideRecord('sys_atf_test_suite_test')
    memberships.addQuery('test_suite', generated.suiteId)
    memberships.addQuery('test', generated.testId)
    memberships.query()
    requireValue(memberships.getRowCount(), 1, 'Accessible Suite membership count')
    memberships.next()
    requireValue(memberships.getValue('test'), generated.testId, 'Suite Accessible Test')

    var testSteps = new GlideRecord('sys_atf_step')
    testSteps.addQuery('test', generated.testId)
    testSteps.orderBy('order')
    testSteps.query()
    requireValue(testSteps.getRowCount(), 2, 'Accessible Test step count')

    testSteps.next()
    var impersonateStepId = testSteps.getUniqueValue()
    requireValue(testSteps.getValue('order'), '1', 'Impersonate order')
    var impersonateConfig = requireRecord(
        'sys_atf_step_config',
        testSteps.getValue('step_config'),
        'Impersonate configuration'
    )
    requireValue(impersonateConfig.getValue('name'), 'Impersonate', 'first OOB step')
    requireInput(
        impersonateStepId,
        resolveInputDefinition(impersonateConfig.getUniqueValue(), 'user'),
        REPRESENTATIVE_TEST_USER_ID,
        'Representative Test User'
    )

    testSteps.next()
    var openStepId = testSteps.getUniqueValue()
    requireValue(testSteps.getValue('order'), '2', 'Open a Catalog Item (SP) order')
    var openConfig = requireRecord(
        'sys_atf_step_config',
        testSteps.getValue('step_config'),
        'Open a Catalog Item (SP) configuration'
    )
    requireValue(openConfig.getValue('name'), 'Open a Catalog Item (SP)', 'second OOB step')
    requireInput(
        openStepId,
        resolveInputDefinition(openConfig.getUniqueValue(), 'portal_id'),
        SERVICE_PORTAL_ID,
        'Portal'
    )
    requireInput(
        openStepId,
        resolveInputDefinition(openConfig.getUniqueValue(), 'page_id'),
        CATALOG_ITEM_PAGE_ID,
        'Page'
    )
    requireInput(
        openStepId,
        resolveInputDefinition(openConfig.getUniqueValue(), 'catalog_item'),
        CATALOG_ITEM_ID,
        'Catalog Item Under Test'
    )

    var results = new GlideRecord('sys_atf_test_result')
    results.addQuery('test', generated.testId)
    results.query()
    requireValue(results.getRowCount(), 0, 'automatic Test execution result count')

    stepResult.setOutputMessage(
        'Created and verified bound Suite ' +
            generated.suiteId +
            ' with Accessible Test ' +
            generated.testId
    )
    return true
})(outputs, steps, params, stepResult, assertEqual)

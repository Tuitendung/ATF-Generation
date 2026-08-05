(function (outputs, steps, params, stepResult, assertEqual) {
    // Verified on the Ticket 01 demo instance. Replace these fixtures manually
    // when this executable integration test targets a different instance.
    var REPRESENTATIVE_TEST_USER_ID = 'd8f57f140b20220050192f15d6673a98' // Active OOB ATF.User
    var CATALOG_ITEM_ID = '04b7e94b4f7b4200086eeed18110c7fd' // Active Standard Laptop
    var SERVICE_PORTAL_ID = '81b75d3147032100ba13a5554ee4902b' // OOB Service Portal (/sp)
    var CATALOG_ITEM_PAGE_ID = '9f12251147132100ba13a5554ee490f4' // OOB sc_cat_item page

    function fail(message) {
        throw new Error('Ticket 01 integration failure: ' + message)
    }

    function requireRecord(table, sysId, label) {
        var record = new GlideRecord(table)
        if (!record.get(sysId)) {
            fail(label + ' was not found: ' + sysId)
        }
        return record
    }

    function requireValue(actual, expected, label) {
        if (String(actual) !== String(expected)) {
            fail(label + ' expected [' + expected + '] but was [' + actual + ']')
        }
    }

    function resolveInputDefinition(stepConfigId, element, expectedReference) {
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

        var definitionId = definition.getUniqueValue()
        requireValue(definition.getValue('internal_type'), 'reference', element + ' input type')
        requireValue(definition.getValue('reference'), expectedReference, element + ' reference table')

        if (definition.next()) {
            fail('required input definition was ambiguous: ' + element)
        }

        return definitionId
    }

    function resolveOptionalQueryParameters(stepConfigId) {
        var definition = new GlideRecord('sys_atf_variable')
        definition.addQuery('sys_class_name', 'atf_input_variable')
        definition.addQuery('model', stepConfigId)
        definition.addQuery('element', 'query_params')
        definition.addQuery('active', true)
        definition.addQuery('mandatory', false)
        definition.setLimit(2)
        definition.query()

        if (!definition.next()) {
            fail('optional OOB Query parameters input definition was not found')
        }

        var definitionId = definition.getUniqueValue()
        requireValue(definition.getValue('internal_type'), 'simple_name_values', 'Query parameters input type')
        if (definition.next()) {
            fail('optional OOB Query parameters input definition was ambiguous')
        }

        return definitionId
    }

    function requireInputValue(stepId, variableId, expectedValue, label) {
        var value = new GlideRecord('sys_variable_value')
        value.addQuery('document', 'sys_atf_step')
        value.addQuery('document_key', stepId)
        value.addQuery('variable', variableId)
        value.setLimit(2)
        value.query()

        if (!value.next()) {
            fail(label + ' input value was not found')
        }

        var actualValue = value.getValue('value')
        // ServiceNow returns a null Glide value for the OOB optional empty
        // Query parameters input; it is semantically the persisted empty value.
        if (expectedValue === '' && actualValue === null) {
            actualValue = ''
        }
        requireValue(actualValue, expectedValue, label + ' input value')
        if (value.next()) {
            fail(label + ' input value was duplicated')
        }
    }

    var generated = new AtfGenerationService().generateAccessible({
        catalogItemId: CATALOG_ITEM_ID,
        representativeTestUserId: REPRESENTATIVE_TEST_USER_ID,
        portalId: SERVICE_PORTAL_ID,
        pageId: CATALOG_ITEM_PAGE_ID,
    })

    if (!generated) {
        fail('generation service returned no result')
    }

    var suite = requireRecord('sys_atf_test_suite', generated.suiteId, 'Test Suite')
    requireValue(suite.getValue('active'), '1', 'Test Suite active')

    var test = requireRecord('sys_atf_test', generated.testId, 'Accessible Test')
    requireValue(test.getValue('active'), '1', 'Accessible Test active')
    requireValue(test.getValue('fail_on_server_error'), '0', 'Accessible Test fail on server error')
    requireValue(test.getValue('enable_parameterized_testing'), '0', 'Accessible Test parameterized testing')

    var membership = requireRecord('sys_atf_test_suite_test', generated.membershipId, 'Suite membership')
    requireValue(membership.getValue('test_suite'), generated.suiteId, 'Suite membership suite')
    requireValue(membership.getValue('test'), generated.testId, 'Suite membership test')
    requireValue(membership.getValue('order'), '1', 'Suite membership order')
    requireValue(membership.getValue('abort_on_failure'), '0', 'Suite membership abort on failure')

    var memberships = new GlideRecord('sys_atf_test_suite_test')
    memberships.addQuery('test_suite', generated.suiteId)
    memberships.query()
    requireValue(memberships.getRowCount(), 1, 'generated Test Suite membership count')

    var testSteps = new GlideRecord('sys_atf_step')
    testSteps.addQuery('test', generated.testId)
    testSteps.orderBy('order')
    testSteps.query()
    requireValue(testSteps.getRowCount(), 2, 'Accessible Test step count')

    if (!testSteps.next()) {
        fail('Impersonate step was not found')
    }
    var impersonateStepId = testSteps.getUniqueValue()
    requireValue(impersonateStepId, generated.impersonateStepId, 'Impersonate step id')
    requireValue(testSteps.getValue('active'), '1', 'Impersonate step active')
    requireValue(testSteps.getValue('order'), '1', 'Impersonate step order')
    var impersonateConfigId = testSteps.getValue('step_config')

    if (!testSteps.next()) {
        fail('Open a Catalog Item (SP) step was not found')
    }
    var openStepId = testSteps.getUniqueValue()
    requireValue(openStepId, generated.openCatalogItemStepId, 'Open a Catalog Item (SP) step id')
    requireValue(testSteps.getValue('active'), '1', 'Open a Catalog Item (SP) step active')
    requireValue(testSteps.getValue('order'), '2', 'Open a Catalog Item (SP) step order')
    var openConfigId = testSteps.getValue('step_config')

    var impersonateConfig = requireRecord('sys_atf_step_config', impersonateConfigId, 'Impersonate configuration')
    requireValue(impersonateConfig.getValue('name'), 'Impersonate', 'first Step Configuration')
    var openConfig = requireRecord('sys_atf_step_config', openConfigId, 'Open a Catalog Item (SP) configuration')
    requireValue(openConfig.getValue('name'), 'Open a Catalog Item (SP)', 'second Step Configuration')

    var userDefinitionId = resolveInputDefinition(impersonateConfigId, 'user', 'sys_user')
    var portalDefinitionId = resolveInputDefinition(openConfigId, 'portal_id', 'sp_portal')
    var pageDefinitionId = resolveInputDefinition(openConfigId, 'page_id', 'sp_page')
    var catalogItemDefinitionId = resolveInputDefinition(openConfigId, 'catalog_item', 'sc_cat_item')
    var queryParametersDefinitionId = resolveOptionalQueryParameters(openConfigId)

    requireInputValue(impersonateStepId, userDefinitionId, REPRESENTATIVE_TEST_USER_ID, 'User')
    requireInputValue(openStepId, portalDefinitionId, SERVICE_PORTAL_ID, 'Portal')
    requireInputValue(openStepId, pageDefinitionId, CATALOG_ITEM_PAGE_ID, 'Page')
    requireInputValue(openStepId, catalogItemDefinitionId, CATALOG_ITEM_ID, 'Catalog Item')
    // The OOB GlideVar persistence mechanism materializes the optional Query
    // parameters definition with an empty value. Ticket 01 supplies only the
    // three required Open-step inputs; this empty OOB value is not an added capability.
    requireInputValue(openStepId, queryParametersDefinitionId, '', 'Query parameters')

    var impersonateValues = new GlideRecord('sys_variable_value')
    impersonateValues.addQuery('document', 'sys_atf_step')
    impersonateValues.addQuery('document_key', impersonateStepId)
    impersonateValues.query()
    requireValue(impersonateValues.getRowCount(), 1, 'Impersonate input count')

    var openValues = new GlideRecord('sys_variable_value')
    openValues.addQuery('document', 'sys_atf_step')
    openValues.addQuery('document_key', openStepId)
    openValues.query()
    requireValue(openValues.getRowCount(), 4, 'Open a Catalog Item (SP) OOB input count')

    stepResult.setOutputMessage(
        'Created and verified Suite ' + generated.suiteId + ' with Accessible Test ' + generated.testId
    )
    return true
})(outputs, steps, params, stepResult, assertEqual)

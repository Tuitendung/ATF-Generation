(function (outputs, steps, params, stepResult, assertEqual) {
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var SPECIFICATION_ID = 'aa4a39021d033110f8779da9137d35b3'
    var CATALOG_ITEM_ID = '04b7e94b4f7b4200086eeed18110c7fd'
    var ACCESSIBLE_USER_ID = 'd8f57f140b20220050192f15d6673a98'
    var INACCESSIBLE_USER_ID = '6816f79cc0a8016401c5a33be04be441'
    var SERVICE_PORTAL_ID = '81b75d3147032100ba13a5554ee4902b'
    var CATALOG_ITEM_PAGE_ID = '9f12251147132100ba13a5554ee490f4'
    var REQUESTED_BY = 'ticket04.integration'
    var SHORT_DESCRIPTION_SENTINEL = 'TICKET04_SHORT_DESCRIPTION_IS_NOT_BEHAVIOR'
    var ARTICLE_BODY_SENTINEL = 'TICKET04_ARTICLE_BODY_IS_NOT_BEHAVIOR'

    function fail(message) {
        throw new Error('Ticket 04 generation-service integration failure: ' + message)
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

    function requireStartsWith(actual, expected, label) {
        if (String(actual || '').indexOf(String(expected)) !== 0) {
            fail(label + ' expected to start with [' + expected + '] but was [' + actual + ']')
        }
    }

    function requireNotContains(actual, unexpected, label) {
        if (String(actual || '').indexOf(String(unexpected)) !== -1) {
            fail(label + ' must not contain [' + unexpected + ']')
        }
    }

    function requireDifferent(actual, unexpected, label) {
        if (String(actual || '') === String(unexpected || '')) {
            fail(label + ' must differ from [' + unexpected + ']')
        }
    }

    function requireNonEmpty(value, label) {
        if (!String(value || '')) {
            fail(label + ' must not be empty')
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

    function collectIds(record) {
        var ids = []
        while (record.next()) {
            ids.push(record.getUniqueValue())
        }
        return ids
    }

    function collectRunArtifacts(runStamp) {
        var suites = new GlideRecord('sys_atf_test_suite')
        suites.addQuery('name', 'CONTAINS', runStamp)
        suites.addQuery('description', 'CONTAINS', SPECIFICATION_ID)
        suites.addQuery('description', 'CONTAINS', REQUESTED_BY)
        suites.query()
        var suiteIds = collectIds(suites)

        var tests = new GlideRecord('sys_atf_test')
        tests.addQuery('name', 'CONTAINS', runStamp)
        tests.addQuery('description', 'CONTAINS', SPECIFICATION_ID)
        tests.addQuery('description', 'CONTAINS', REQUESTED_BY)
        tests.query()
        var testIds = collectIds(tests)

        var stepIds = []
        if (testIds.length) {
            var testSteps = new GlideRecord('sys_atf_step')
            testSteps.addQuery('test', 'IN', testIds.join(','))
            testSteps.query()
            stepIds = collectIds(testSteps)
        }

        var membershipIds = []
        if (suiteIds.length) {
            var memberships = new GlideRecord('sys_atf_test_suite_test')
            memberships.addQuery('test_suite', 'IN', suiteIds.join(','))
            memberships.query()
            membershipIds = collectIds(memberships)
        }

        return {
            suiteIds: suiteIds,
            testIds: testIds,
            stepIds: stepIds,
            membershipIds: membershipIds,
        }
    }

    function requireIdIn(ids, expectedId, label) {
        if (ids.indexOf(expectedId) === -1) {
            fail(label + ' was not part of the run artifact set: ' + expectedId)
        }
    }

    function verifyTestGraph(options) {
        var test = requireRecord('sys_atf_test', options.testId, options.label + ' Test')
        requireValue(test.getValue('active'), '1', options.label + ' Test active')
        requireValue(
            test.getValue('fail_on_server_error'),
            '0',
            options.label + ' native server-error behavior'
        )
        requireValue(
            test.getValue('enable_parameterized_testing'),
            '0',
            options.label + ' automatic parameterized execution'
        )
        requireStartsWith(test.getValue('name'), options.namePrefix, options.label + ' name')
        requireContains(test.getValue('name'), options.runStamp, options.label + ' run stamp')

        var description = test.getValue('description')
        if (options.requiredDescriptionLabel) {
            requireContains(
                description,
                options.requiredDescriptionLabel,
                options.label + ' description outcome label'
            )
        }
        requireContains(description, options.expectation, options.label + ' expectation')
        requireContains(description, options.runStamp, options.label + ' description run stamp')
        requireContains(
            description,
            options.catalogItemDisplay,
            options.label + ' Catalog Item display provenance'
        )
        requireContains(description, CATALOG_ITEM_ID, options.label + ' Catalog Item provenance')
        requireContains(
            description,
            options.specificationNumber + ' v1',
            options.label + ' Specification number/version provenance'
        )
        requireContains(description, SPECIFICATION_ID, options.label + ' Specification provenance')
        requireContains(description, REQUESTED_BY, options.label + ' requested-by username provenance')
        requireContains(description, options.criteriaId, options.label + ' User Criteria provenance')
        requireContains(description, options.criteriaDisplay, options.label + ' User Criteria display')
        requireNotContains(
            description,
            options.otherCriteriaId,
            options.label + ' unrelated User Criteria provenance'
        )
        requireContains(
            description,
            options.userId,
            options.label + ' Representative Test User provenance'
        )
        requireContains(
            description,
            options.userDisplay,
            options.label + ' Representative Test User display'
        )
        requireContains(description, options.portalDisplay, options.label + ' Portal display provenance')
        requireContains(description, SERVICE_PORTAL_ID, options.label + ' Portal provenance')
        requireContains(description, options.pageDisplay, options.label + ' Page display provenance')
        requireContains(description, CATALOG_ITEM_PAGE_ID, options.label + ' Page provenance')
        requireNotContains(description, SHORT_DESCRIPTION_SENTINEL, options.label + ' description')
        requireNotContains(description, ARTICLE_BODY_SENTINEL, options.label + ' description')

        var testSteps = new GlideRecord('sys_atf_step')
        testSteps.addQuery('test', options.testId)
        testSteps.orderBy('order')
        testSteps.query()
        requireValue(testSteps.getRowCount(), 2, options.label + ' step count')

        if (!testSteps.next()) {
            fail(options.label + ' Impersonate step was not found')
        }
        var impersonateStepId = testSteps.getUniqueValue()
        requireValue(testSteps.getValue('order'), '1', options.label + ' Impersonate order')
        var impersonateConfig = requireRecord(
            'sys_atf_step_config',
            testSteps.getValue('step_config'),
            options.label + ' Impersonate configuration'
        )
        requireValue(impersonateConfig.getValue('name'), 'Impersonate', options.label + ' first OOB step')
        requireInput(
            impersonateStepId,
            resolveInputDefinition(impersonateConfig.getUniqueValue(), 'user'),
            options.userId,
            options.label + ' Representative Test User'
        )

        if (!testSteps.next()) {
            fail(options.label + ' Open a Catalog Item (SP) step was not found')
        }
        var openStepId = testSteps.getUniqueValue()
        requireValue(testSteps.getValue('order'), '2', options.label + ' Open step order')
        var openConfig = requireRecord(
            'sys_atf_step_config',
            testSteps.getValue('step_config'),
            options.label + ' Open configuration'
        )
        requireValue(
            openConfig.getValue('name'),
            'Open a Catalog Item (SP)',
            options.label + ' second OOB step'
        )
        requireInput(
            openStepId,
            resolveInputDefinition(openConfig.getUniqueValue(), 'portal_id'),
            SERVICE_PORTAL_ID,
            options.label + ' Portal'
        )
        requireInput(
            openStepId,
            resolveInputDefinition(openConfig.getUniqueValue(), 'page_id'),
            CATALOG_ITEM_PAGE_ID,
            options.label + ' Page'
        )
        requireInput(
            openStepId,
            resolveInputDefinition(openConfig.getUniqueValue(), 'catalog_item'),
            CATALOG_ITEM_ID,
            options.label + ' Catalog Item'
        )

        var results = new GlideRecord('sys_atf_test_result')
        results.addQuery('test', options.testId)
        results.query()
        requireValue(results.getRowCount(), 0, options.label + ' automatic Test execution result count')
    }

    var criteria = new GlideRecord('user_criteria')
    criteria.setLimit(2)
    criteria.query()
    if (!criteria.next()) {
        fail('an Accessible OOB User Criteria fixture was not found')
    }
    var accessibleCriteriaId = criteria.getUniqueValue()
    var accessibleCriteriaDisplay = criteria.getDisplayValue()
    if (!criteria.next()) {
        fail('a distinct Inaccessible OOB User Criteria fixture was not found')
    }
    var inaccessibleCriteriaId = criteria.getUniqueValue()
    var inaccessibleCriteriaDisplay = criteria.getDisplayValue()
    requireDifferent(
        inaccessibleCriteriaId,
        accessibleCriteriaId,
        'distinct User Criteria fixture ids'
    )
    requireNonEmpty(accessibleCriteriaDisplay, 'Accessible User Criteria display')
    requireNonEmpty(inaccessibleCriteriaDisplay, 'Inaccessible User Criteria display')

    var staleSpecification = new GlideRecord('kb_knowledge')
    if (staleSpecification.get(SPECIFICATION_ID)) {
        staleSpecification.deleteRecord()
    }

    var specification = new GlideRecord('kb_knowledge')
    specification.initialize()
    specification.setNewGuidValue(SPECIFICATION_ID)
    specification.setValue('kb_knowledge_base', KB_ID)
    specification.setValue('workflow_state', 'published')
    specification.setValue('short_description', SHORT_DESCRIPTION_SENTINEL)
    specification.setValue('text', ARTICLE_BODY_SENTINEL)
    specification.setValue('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
    specification.setValue('x_gemjp_atf_genera_schema_version', 1)
    specification.setValue('x_gemjp_atf_genera_accessible_criteria', accessibleCriteriaId)
    specification.setValue('x_gemjp_atf_genera_accessible_user', ACCESSIBLE_USER_ID)
    specification.setValue('x_gemjp_atf_genera_inaccessible_criteria', inaccessibleCriteriaId)
    specification.setValue('x_gemjp_atf_genera_inaccessible_user', INACCESSIBLE_USER_ID)
    if (!specification.insert()) {
        fail('bound Specification fixture could not be inserted')
    }
    specification.get(SPECIFICATION_ID)
    var specificationNumber = specification.getValue('number')
    requireNonEmpty(specificationNumber, 'Specification number')

    var catalogItem = requireRecord('sc_cat_item', CATALOG_ITEM_ID, 'Catalog Item fixture')
    var accessibleRepresentativeTestUser = requireRecord(
        'sys_user',
        ACCESSIBLE_USER_ID,
        'Accessible Representative Test User fixture'
    )
    var inaccessibleRepresentativeTestUser = requireRecord(
        'sys_user',
        INACCESSIBLE_USER_ID,
        'Inaccessible Representative Test User fixture'
    )
    var portal = requireRecord('sp_portal', SERVICE_PORTAL_ID, 'Service Portal fixture')
    var page = requireRecord('sp_page', CATALOG_ITEM_PAGE_ID, 'Catalog Item Page fixture')
    var catalogItemDisplay = catalogItem.getDisplayValue()
    var accessibleRepresentativeTestUserDisplay =
        accessibleRepresentativeTestUser.getDisplayValue()
    var inaccessibleRepresentativeTestUserDisplay =
        inaccessibleRepresentativeTestUser.getDisplayValue()
    var portalDisplay = portal.getDisplayValue()
    var pageDisplay = page.getDisplayValue()
    requireNonEmpty(catalogItemDisplay, 'Catalog Item display')
    requireNonEmpty(
        accessibleRepresentativeTestUserDisplay,
        'Accessible Representative Test User display'
    )
    requireNonEmpty(
        inaccessibleRepresentativeTestUserDisplay,
        'Inaccessible Representative Test User display'
    )
    requireNonEmpty(portalDisplay, 'Service Portal display')
    requireNonEmpty(pageDisplay, 'Catalog Item Page display')
    var runStamp = new GlideDateTime().getValue()
    var artifactsBefore = collectRunArtifacts(runStamp)
    requireValue(artifactsBefore.suiteIds.length, 0, 'pre-run matching Suite count')
    requireValue(artifactsBefore.testIds.length, 0, 'pre-run matching Test count')

    var generated = new AtfGenerationService().generatePermissionRunFromBoundSpecification({
        catalogItemId: CATALOG_ITEM_ID,
        specificationId: SPECIFICATION_ID,
        runStamp: runStamp,
        requestedBy: REQUESTED_BY,
    })

    specification.deleteRecord()

    if (!generated || !generated.accessibleTestId || !generated.inaccessibleTestId) {
        fail('generation service did not return both permission Test identifiers')
    }

    var suite = requireRecord('sys_atf_test_suite', generated.suiteId, 'Test Suite')
    requireValue(suite.getValue('active'), '1', 'Test Suite active')
    requireContains(suite.getValue('name'), catalogItemDisplay, 'Suite Catalog Item')
    requireContains(suite.getValue('name'), specificationNumber, 'Suite Specification number')
    requireContains(suite.getValue('name'), 'v1', 'Suite Specification version')
    requireContains(suite.getValue('name'), runStamp, 'Suite run stamp')

    var suiteDescription = suite.getValue('description')
    requireContains(suiteDescription, runStamp, 'Suite description run stamp')
    requireContains(suiteDescription, catalogItemDisplay, 'Suite Catalog Item display')
    requireContains(suiteDescription, CATALOG_ITEM_ID, 'Suite Catalog Item sys_id')
    requireContains(
        suiteDescription,
        specificationNumber + ' v1',
        'Suite Specification number/version'
    )
    requireContains(suiteDescription, SPECIFICATION_ID, 'Suite Specification sys_id')
    requireContains(suiteDescription, REQUESTED_BY, 'Suite requester')
    requireContains(suiteDescription, 'ACCESSIBLE expected access: can open', 'Suite Accessible expectation')
    requireContains(
        suiteDescription,
        'INACCESSIBLE expected access: cannot open',
        'Suite Inaccessible expectation'
    )
    requireContains(
        suiteDescription,
        accessibleCriteriaId,
        'Suite Accessible User Criteria provenance'
    )
    requireContains(
        suiteDescription,
        accessibleCriteriaDisplay,
        'Suite Accessible User Criteria display'
    )
    requireContains(
        suiteDescription,
        inaccessibleCriteriaId,
        'Suite Inaccessible User Criteria provenance'
    )
    requireContains(
        suiteDescription,
        inaccessibleCriteriaDisplay,
        'Suite Inaccessible User Criteria display'
    )
    requireContains(
        suiteDescription,
        accessibleRepresentativeTestUserDisplay,
        'Suite Accessible Representative Test User display'
    )
    requireContains(
        suiteDescription,
        ACCESSIBLE_USER_ID,
        'Suite Accessible Representative Test User provenance'
    )
    requireContains(
        suiteDescription,
        inaccessibleRepresentativeTestUserDisplay,
        'Suite Inaccessible Representative Test User display'
    )
    requireContains(
        suiteDescription,
        INACCESSIBLE_USER_ID,
        'Suite Inaccessible Representative Test User provenance'
    )
    requireContains(suiteDescription, portalDisplay, 'Suite Portal display')
    requireContains(suiteDescription, SERVICE_PORTAL_ID, 'Suite Portal provenance')
    requireContains(suiteDescription, pageDisplay, 'Suite Page display')
    requireContains(suiteDescription, CATALOG_ITEM_PAGE_ID, 'Suite Page provenance')
    requireNotContains(suiteDescription, SHORT_DESCRIPTION_SENTINEL, 'Suite description')
    requireNotContains(suiteDescription, ARTICLE_BODY_SENTINEL, 'Suite description')

    verifyTestGraph({
        label: 'Accessible',
        testId: generated.accessibleTestId,
        namePrefix: 'ACCESSIBLE - ',
        expectation: 'Expected access: can open',
        userId: ACCESSIBLE_USER_ID,
        userDisplay: accessibleRepresentativeTestUserDisplay,
        criteriaId: accessibleCriteriaId,
        criteriaDisplay: accessibleCriteriaDisplay,
        otherCriteriaId: inaccessibleCriteriaId,
        catalogItemDisplay: catalogItemDisplay,
        specificationNumber: specificationNumber,
        portalDisplay: portalDisplay,
        pageDisplay: pageDisplay,
        runStamp: runStamp,
    })
    verifyTestGraph({
        label: 'Inaccessible',
        testId: generated.inaccessibleTestId,
        namePrefix: 'INACCESSIBLE - EXPECTED STEP FAILURE - ',
        requiredDescriptionLabel: 'INACCESSIBLE - EXPECTED STEP FAILURE',
        expectation: 'Expected access: cannot open',
        userId: INACCESSIBLE_USER_ID,
        userDisplay: inaccessibleRepresentativeTestUserDisplay,
        criteriaId: inaccessibleCriteriaId,
        criteriaDisplay: inaccessibleCriteriaDisplay,
        otherCriteriaId: accessibleCriteriaId,
        catalogItemDisplay: catalogItemDisplay,
        specificationNumber: specificationNumber,
        portalDisplay: portalDisplay,
        pageDisplay: pageDisplay,
        runStamp: runStamp,
    })

    var inaccessibleDescription = requireRecord(
        'sys_atf_test',
        generated.inaccessibleTestId,
        'Inaccessible Test'
    ).getValue('description')
    requireContains(inaccessibleDescription, 'Failed/red', 'negative native ATF interpretation')
    requireContains(inaccessibleDescription, 'Passed/green', 'unexpected-access interpretation')
    requireContains(inaccessibleDescription, 'Portal errors', 'negative broad failure evidence')
    requireContains(inaccessibleDescription, 'widget errors', 'negative widget failure evidence')
    requireContains(inaccessibleDescription, 'JavaScript errors', 'negative JavaScript failure evidence')
    requireContains(inaccessibleDescription, 'bad configuration', 'negative configuration failure evidence')
    requireContains(inaccessibleDescription, 'timeouts', 'negative timeout failure evidence')

    var artifactsAfter = collectRunArtifacts(runStamp)
    requireValue(artifactsAfter.suiteIds.length, 1, 'run-scoped Test Suite count')
    requireValue(artifactsAfter.testIds.length, 2, 'run-scoped Test count')
    requireValue(artifactsAfter.stepIds.length, 4, 'run-scoped Test Step count')
    requireValue(artifactsAfter.membershipIds.length, 2, 'run-scoped Suite membership count')
    requireIdIn(artifactsAfter.suiteIds, generated.suiteId, 'returned Test Suite')
    requireIdIn(artifactsAfter.testIds, generated.accessibleTestId, 'returned Accessible Test')
    requireIdIn(artifactsAfter.testIds, generated.inaccessibleTestId, 'returned Inaccessible Test')
    requireIdIn(
        artifactsAfter.stepIds,
        generated.accessibleImpersonateStepId,
        'returned Accessible Impersonate Step'
    )
    requireIdIn(
        artifactsAfter.stepIds,
        generated.accessibleOpenCatalogItemStepId,
        'returned Accessible Open Step'
    )
    requireIdIn(
        artifactsAfter.stepIds,
        generated.inaccessibleImpersonateStepId,
        'returned Inaccessible Impersonate Step'
    )
    requireIdIn(
        artifactsAfter.stepIds,
        generated.inaccessibleOpenCatalogItemStepId,
        'returned Inaccessible Open Step'
    )
    requireIdIn(
        artifactsAfter.membershipIds,
        generated.accessibleMembershipId,
        'returned Accessible membership'
    )
    requireIdIn(
        artifactsAfter.membershipIds,
        generated.inaccessibleMembershipId,
        'returned Inaccessible membership'
    )

    var memberships = new GlideRecord('sys_atf_test_suite_test')
    memberships.addQuery('test_suite', generated.suiteId)
    memberships.orderBy('order')
    memberships.query()
    requireValue(memberships.getRowCount(), 2, 'Suite membership count')
    memberships.next()
    requireValue(memberships.getValue('test'), generated.accessibleTestId, 'first Suite Test')
    requireValue(memberships.getValue('order'), '1', 'Accessible membership order')
    memberships.next()
    requireValue(memberships.getValue('test'), generated.inaccessibleTestId, 'second Suite Test')
    requireValue(memberships.getValue('order'), '2', 'Inaccessible membership order')

    stepResult.setOutputMessage(
        'Created and verified Suite ' +
            generated.suiteId +
            ' with Accessible Test ' +
            generated.accessibleTestId +
            ' and Inaccessible Test ' +
            generated.inaccessibleTestId
    )
    return true
})(outputs, steps, params, stepResult, assertEqual)

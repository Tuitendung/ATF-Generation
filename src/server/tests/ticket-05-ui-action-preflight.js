(function () {
    var APP_SCOPE_ID = '4c6b7718ad6b40709b6243636b59e772'
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var EVENT_NAME = 'x_gemjp_atf_genera.accessible.generate'
    var ACTION_NAME = 'x_gemjp_atf_genera_create_atf'
    var FIXTURE_ITEM_ID = '05fa39021d033110f8779da9137d35b3'
    var created = []

    function fail(message) { throw new Error('Ticket 05 UI preflight failure: ' + message) }
    function expectContains(actual, expected, label) {
        if (String(actual || '').indexOf(expected) === -1) fail(label + ' missing [' + expected + ']')
    }
    function expectEqual(actual, expected, label) {
        if (String(actual || '') !== String(expected || '')) fail(label + ' expected [' + expected + '] but was [' + actual + ']')
    }
    function count(table) { var record = new GlideRecord(table); record.query(); return record.getRowCount() }
    function artifactCounts() {
        return ['sys_atf_test_suite', 'sys_atf_test', 'sys_atf_step', 'sys_variable_value', 'sys_atf_test_suite_test'].map(count).join(',')
    }
    function eventCount() {
        var event = new GlideRecord('sysevent'); event.addQuery('name', EVENT_NAME); event.addQuery('instance', FIXTURE_ITEM_ID); event.query(); return event.getRowCount()
    }
    function createSpecification(version) {
        var record = new GlideRecord('kb_knowledge'); record.initialize()
        record.setValue('kb_knowledge_base', KB_ID); record.setValue('workflow_state', 'published')
        record.setValue('short_description', 'Ticket 05 UI fixture ' + String(version))
        record.setValue('x_gemjp_atf_genera_catalog_item', FIXTURE_ITEM_ID)
        if (version !== null) record.setValue('x_gemjp_atf_genera_schema_version', version)
        var id = record.insert(); if (!id) fail('Specification fixture insert failed')
        created.push({ table: 'kb_knowledge', id: String(id) }); return record
    }
    function evaluate(evaluator, uiAction, item) {
        var redirected = ''; var noPop = false
        gs.flushMessages()
        evaluator.evaluateScript(uiAction, 'script', { current: item, action: {
            setRedirectURL: function (record) { redirected = record.getUniqueValue() },
            setNoPop: function (value) { noPop = value === true },
        }})
        expectEqual(redirected, FIXTURE_ITEM_ID, 'same-form redirect')
        expectEqual(noPop, true, 'same-window redirect')
        return { errors: String(gs.getErrorMessages()), info: String(gs.getInfoMessages()) }
    }
    function assertNoSideEffects(beforeArtifacts, label) {
        expectEqual(eventCount(), 0, label + ' event count')
        expectEqual(artifactCounts(), beforeArtifacts, label + ' ATF artifact counts')
    }

    var item = new GlideRecord('sc_cat_item'); item.initialize(); item.setNewGuidValue(FIXTURE_ITEM_ID)
    item.setValue('name', 'Ticket 05 Preflight Fixture'); item.setValue('active', true)
    if (!item.insert()) fail('Catalog Item fixture insert failed')
    created.push({ table: 'sc_cat_item', id: FIXTURE_ITEM_ID })

    var uiAction = new GlideRecord('sys_ui_action'); uiAction.addQuery('sys_scope', APP_SCOPE_ID); uiAction.addQuery('action_name', ACTION_NAME); uiAction.query()
    if (!uiAction.next()) fail('Create ATF UI Action not found')
    var evaluator = new GlideScopedEvaluator(); var beforeArtifacts = artifactCounts()
    try {
        var originalUser = gs.getUserID()
        try {
            gs.getSession().impersonate('d8f57f140b20220050192f15d6673a98')
            var unauthorized = evaluate(evaluator, uiAction, item)
            expectContains(unauthorized.errors, 'atf_test_admin role is required', 'unauthorized message')
        } finally { gs.getSession().impersonate(originalUser) }
        assertNoSideEffects(beforeArtifacts, 'unauthorized')

        var zeroSpecificationOutcome = evaluate(evaluator, uiAction, item)
        expectContains(zeroSpecificationOutcome.errors, 'No Current Published Specification exists for Ticket 05 Preflight Fixture.', 'zero Specification message')
        assertNoSideEffects(beforeArtifacts, 'zero Specification')

        var firstSpecification = createSpecification(1)
        var secondSpecification = createSpecification(1)
        var multipleSpecificationsOutcome = evaluate(evaluator, uiAction, item)
        expectContains(multipleSpecificationsOutcome.errors, '2 Current Published Specifications', 'multiple Specification count')
        expectContains(multipleSpecificationsOutcome.errors, 'Retire all but one', 'multiple Specification correction')
        assertNoSideEffects(beforeArtifacts, 'multiple Specifications')
        secondSpecification.deleteRecord(); created.pop()

        firstSpecification.setValue('x_gemjp_atf_genera_schema_version', ''); firstSpecification.update()
        var blankVersionOutcome = evaluate(evaluator, uiAction, item)
        expectContains(blankVersionOutcome.errors, 'has blank Schema Version; required version is 1', 'blank Schema Version message')
        expectEqual(blankVersionOutcome.errors.indexOf(firstSpecification.getUniqueValue()), -1, 'blank message sys_id exposure')
        assertNoSideEffects(beforeArtifacts, 'blank Schema Version')

        firstSpecification.setValue('x_gemjp_atf_genera_schema_version', 2); firstSpecification.update()
        var unsupportedVersionOutcome = evaluate(evaluator, uiAction, item)
        expectContains(unsupportedVersionOutcome.errors, 'declares unsupported Schema Version 2; supported version is 1', 'unsupported Schema Version message')
        expectEqual(unsupportedVersionOutcome.errors.indexOf(firstSpecification.getUniqueValue()), -1, 'unsupported message sys_id exposure')
        assertNoSideEffects(beforeArtifacts, 'unsupported Schema Version')

        firstSpecification.setValue('x_gemjp_atf_genera_schema_version', 1); firstSpecification.update()
        var successfulOutcome = evaluate(evaluator, uiAction, item)
        expectContains(successfulOutcome.info, 'ATF Generation was queued. UTC run stamp:', 'successful queued message')
        var event = new GlideRecord('sysevent'); event.addQuery('name', EVENT_NAME); event.addQuery('instance', FIXTURE_ITEM_ID); event.addQuery('parm1', firstSpecification.getUniqueValue()); event.query()
        if (!event.next()) fail('successful exact event mapping was not found')
        expectContains(successfulOutcome.info, event.getValue('parm2'), 'message/event run stamp')
        event.deleteRecord()
    } finally {
        for (var index = created.length - 1; index >= 0; index--) {
            var cleanup = new GlideRecord(created[index].table); if (cleanup.get(created[index].id)) cleanup.deleteRecord()
        }
        gs.flushMessages()
    }
})()

(function () {
    var APP_SCOPE_ID = '4c6b7718ad6b40709b6243636b59e772'
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var CATALOG_ITEM_ID = '04b7e94b4f7b4200086eeed18110c7fd'
    var SPECIFICATION_ID = '7f3a39021d033110f8779da9137d35b3'
    var EVENT_NAME = 'x_gemjp_atf_genera.accessible.generate'
    var ACTION_NAME = 'x_gemjp_atf_genera_create_atf'

    function fail(message) {
        throw new Error('Ticket 03 UI Action integration failure: ' + message)
    }

    function expectEqual(actual, expected, label) {
        if (String(actual || '') !== String(expected || '')) {
            fail(label + ' expected [' + expected + '] but was [' + actual + ']')
        }
    }

    function expectContains(actual, expected, label) {
        if (String(actual || '').indexOf(String(expected)) === -1) {
            fail(label + ' expected to contain [' + expected + ']')
        }
    }

    function expectOne(record, label) {
        record.setLimit(2)
        record.query()
        if (!record.next()) {
            fail(label + ' was not found')
        }
        var id = record.getUniqueValue()
        if (record.next()) {
            fail(label + ' was ambiguous')
        }
        record.get(id)
        return record
    }

    function requireRecord(table, sysId, label) {
        var record = new GlideRecord(table)
        if (!record.get(sysId)) {
            fail(label + ' was not found: ' + sysId)
        }
        return record
    }

    var catalogItem = new GlideRecord('sc_cat_item')
    if (!catalogItem.get(CATALOG_ITEM_ID)) {
        fail('Australia Standard Laptop fixture was not found')
    }

    var existingSpecification = new GlideRecord('kb_knowledge')
    existingSpecification.addQuery('kb_knowledge_base', KB_ID)
    existingSpecification.addQuery('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
    existingSpecification.addQuery('workflow_state', 'published')
    existingSpecification.query()
    if (existingSpecification.next()) {
        fail('Standard Laptop already has a Current Specification; integration fixture is not isolated')
    }

    var specification = new GlideRecord('kb_knowledge')
    specification.initialize()
    specification.setNewGuidValue(SPECIFICATION_ID)
    specification.setValue('kb_knowledge_base', KB_ID)
    specification.setValue('workflow_state', 'published')
    specification.setValue('short_description', 'Ticket 03 UI Action integration fixture')
    specification.setValue('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
    specification.setValue('x_gemjp_atf_genera_schema_version', 1)
    if (!specification.insert()) {
        fail('Current Specification fixture could not be inserted')
    }

    var uiAction = new GlideRecord('sys_ui_action')
    uiAction.addQuery('sys_scope', APP_SCOPE_ID)
    uiAction.addQuery('action_name', ACTION_NAME)
    uiAction = expectOne(uiAction, 'Create ATF UI Action')
    expectEqual(uiAction.getValue('table'), 'sc_cat_item', 'UI Action table')
    expectEqual(uiAction.getValue('active'), '1', 'UI Action active')
    expectEqual(uiAction.getValue('client'), '0', 'UI Action server side')
    expectEqual(uiAction.getValue('form_button'), '1', 'UI Action form button')
    expectEqual(uiAction.getValue('list_button'), '0', 'UI Action list button')
    expectEqual(uiAction.getValue('show_insert'), '0', 'UI Action insert visibility')
    expectEqual(uiAction.getValue('show_update'), '1', 'UI Action update visibility')
    var actionRole = new GlideRecord('sys_ui_action_role')
    actionRole.addQuery('sys_ui_action', uiAction.getUniqueValue())
    actionRole = expectOne(actionRole, 'Create ATF UI Action role mapping')
    var role = requireRecord(
        'sys_user_role',
        actionRole.getValue('sys_user_role'),
        'Create ATF UI Action role'
    )
    expectEqual(role.getValue('name'), 'atf_test_admin', 'UI Action role visibility')
    expectContains(
        uiAction.getValue('condition'),
        "gs.hasRole('atf_test_admin')",
        'UI Action visibility condition'
    )

    var actionScript = uiAction.getValue('script')
    var authorizationIndex = actionScript.indexOf('gs.hasRole(REQUIRED_ROLE)')
    var lookupIndex = actionScript.indexOf("new GlideRecord('kb_knowledge')")
    if (authorizationIndex < 0 || lookupIndex < 0 || authorizationIndex > lookupIndex) {
        fail('server authorization must precede Current Specification lookup')
    }
    expectContains(
        actionScript,
        'gs.eventQueue(EVENT_NAME, current, specificationId, runStamp)',
        'exact event mapping'
    )
    expectContains(
        actionScript,
        "gs.addInfoMessage('ATF Generation was queued. UTC run stamp: ' + runStamp)",
        'queued message'
    )

    var eventRegistration = new GlideRecord('sysevent_register')
    eventRegistration.addQuery('event_name', EVENT_NAME)
    eventRegistration = expectOne(eventRegistration, 'Accessible Generation event registration')
    expectEqual(eventRegistration.getValue('table'), 'sc_cat_item', 'event record table')

    var scriptAction = new GlideRecord('sysevent_script_action')
    scriptAction.addQuery('event_name', EVENT_NAME)
    scriptAction = expectOne(scriptAction, 'Accessible Generation Script Action')
    expectEqual(scriptAction.getValue('active'), '1', 'Script Action active')
    var adapterScript = scriptAction.getValue('script')
    expectContains(
        adapterScript,
        'new AtfGenerationService().generatePermissionRunFromBoundSpecification',
        'Script Action delegation'
    )
    if (adapterScript.indexOf('GlideRecord') !== -1 || adapterScript.indexOf('sys_atf_') !== -1) {
        fail('Script Action must not contain lookup or artifact-assembly rules')
    }

    var unauthorizedRedirectId = ''
    var unauthorizedAction = {
        setRedirectURL: function (record) {
            unauthorizedRedirectId = record.getUniqueValue()
        },
        setNoPop: function () {},
    }
    var evaluator = new GlideScopedEvaluator()
    var originalUserId = gs.getUserID()
    gs.flushMessages()
    try {
        gs.getSession().impersonate('d8f57f140b20220050192f15d6673a98')
        evaluator.evaluateScript(uiAction, 'script', {
            current: catalogItem,
            action: unauthorizedAction,
        })
        if (gs.hasRole('atf_test_admin')) {
            fail('unauthorized fixture unexpectedly has atf_test_admin')
        }
        expectContains(
            String(gs.getErrorMessages()),
            'The atf_test_admin role is required',
            'unauthorized direct invocation message'
        )
    } finally {
        gs.getSession().impersonate(originalUserId)
    }
    expectEqual(unauthorizedRedirectId, CATALOG_ITEM_ID, 'unauthorized same-form redirect')
    var unauthorizedEvent = new GlideRecord('sysevent')
    unauthorizedEvent.addQuery('name', EVENT_NAME)
    unauthorizedEvent.addQuery('instance', CATALOG_ITEM_ID)
    unauthorizedEvent.query()
    expectEqual(unauthorizedEvent.getRowCount(), 0, 'unauthorized queued event count')

    if (!gs.hasRole('atf_test_admin')) {
        fail('this executable UI Action integration test must run as atf_test_admin')
    }

    var redirectedRecordId = ''
    var noPop = false
    var action = {
        setRedirectURL: function (record) {
            redirectedRecordId = record.getUniqueValue()
        },
        setNoPop: function (value) {
            noPop = value === true
        },
    }

    gs.flushMessages()
    evaluator.evaluateScript(uiAction, 'script', {
        current: catalogItem,
        action: action,
    })

    expectEqual(redirectedRecordId, CATALOG_ITEM_ID, 'same-form redirect record')
    expectEqual(noPop, true, 'same-window redirect')
    var infoMessages = String(gs.getInfoMessages())
    expectContains(infoMessages, 'ATF Generation was queued.', 'queued Platform UI message')
    expectContains(infoMessages, 'UTC run stamp:', 'queued UTC run stamp message')

    var queuedEvent = new GlideRecord('sysevent')
    queuedEvent.addQuery('name', EVENT_NAME)
    queuedEvent.addQuery('instance', CATALOG_ITEM_ID)
    queuedEvent.addQuery('parm1', SPECIFICATION_ID)
    queuedEvent = expectOne(queuedEvent, 'queued Accessible Generation event')
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(queuedEvent.getValue('parm2'))) {
        fail('event parm2 was not a UTC GlideDateTime run stamp')
    }
    expectContains(infoMessages, queuedEvent.getValue('parm2'), 'message/event run stamp binding')
    expectEqual(
        queuedEvent.getValue('sys_created_by'),
        gs.getUserName(),
        'event creator audit username'
    )

    // Keep this seam test isolated from the worker seam and from later runs.
    queuedEvent.deleteRecord()
    specification.deleteRecord()
    gs.flushMessages()
})()

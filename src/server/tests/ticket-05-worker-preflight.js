(function () {
    var CATALOG_ITEM_ID = '04b7e94b4f7b4200086eeed18110c7fd'
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var ACCESSIBLE_USER_ID = 'd8f57f140b20220050192f15d6673a98'
    var INACCESSIBLE_USER_ID = '6816f79cc0a8016401c5a33be04be441'
    var PORTAL_ID = '81b75d3147032100ba13a5554ee4902b'
    var PAGE_ID = '9f12251147132100ba13a5554ee490f4'
    var artifactTables = ['sys_atf_test_suite', 'sys_atf_test', 'sys_atf_step', 'sys_variable_value', 'sys_atf_test_suite_test']

    function fail(message) { throw new Error('Ticket 05 worker preflight failure: ' + message) }
    function counts() {
        var result = []
        for (var index = 0; index < artifactTables.length; index++) {
            var record = new GlideRecord(artifactTables[index]); record.query(); result.push(record.getRowCount())
        }
        return result.join(',')
    }
    function expectContains(actual, expected, label) {
        if (String(actual || '').indexOf(expected) === -1) fail(label + ' missing [' + expected + ']')
    }
    function request(specificationId, runStamp) {
        return { catalogItemId: CATALOG_ITEM_ID, specificationId: specificationId, runStamp: runStamp, requestedBy: 'ticket.05' }
    }
    function expectFailure(service, options, expected, before, label) {
        var error = null
        try { service.generatePermissionRunFromBoundSpecification(options) } catch (caught) { error = caught }
        if (!error) fail(label + ' unexpectedly succeeded')
        expectContains(error.message || error, expected, label + ' error')
        if (counts() !== before) fail(label + ' created an ATF artifact before preflight completed')
        var log = new GlideRecord('syslog'); log.addQuery('message', 'CONTAINS', '[ATF-GEN][' + options.runStamp + '] Preflight failed:'); log.query()
        if (!log.next()) fail(label + ' stamped failure summary was not logged')
    }
    function createSpecification(version) {
        var specification = new GlideRecord('kb_knowledge'); specification.initialize()
        specification.setValue('kb_knowledge_base', KB_ID); specification.setValue('workflow_state', 'published')
        specification.setValue('short_description', 'Ticket 05 worker preflight fixture')
        specification.setValue('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
        specification.setValue('x_gemjp_atf_genera_schema_version', version)
        specification.setValue('x_gemjp_atf_genera_accessible_user', ACCESSIBLE_USER_ID)
        specification.setValue('x_gemjp_atf_genera_inaccessible_user', INACCESSIBLE_USER_ID)
        var id = specification.insert(); if (!id) fail('Specification fixture insert failed')
        return specification
    }
    function findOneConfiguration(name) {
        var record = new GlideRecord('sys_atf_step_config'); record.addQuery('name', name); record.addQuery('active', true); record.query()
        if (!record.next()) fail(name + ' configuration not found')
        var id = record.getUniqueValue(); if (record.next()) fail(name + ' configuration already ambiguous')
        record.get(id); return record
    }
    function restore(record, values) {
        if (!record || !record.isValidRecord()) return
        record.setWorkflow(false); record.autoSysFields(false)
        for (var field in values) if (values.hasOwnProperty(field)) record.setValue(field, values[field])
        record.update()
    }
    function exerciseConfiguration(service, specificationId, before, name, zeroStamp, multipleStamp) {
        var configuration = findOneConfiguration(name); var alternate = null; var alternateName = ''
        try {
            configuration.setWorkflow(false); configuration.autoSysFields(false); configuration.setValue('active', false); configuration.update()
            expectFailure(service, request(specificationId, zeroStamp), 'active OOB Step Configuration was not found: ' + name, before, 'zero ' + name + ' match')
            restore(configuration, { active: true })
            alternate = new GlideRecord('sys_atf_step_config'); alternate.addQuery('active', true)
            alternate.addQuery('name', 'NOT IN', 'Impersonate,Open a Catalog Item (SP)'); alternate.setLimit(1); alternate.query()
            if (!alternate.next()) fail('alternate active Step Configuration not found')
            alternateName = alternate.getValue('name'); alternate.setWorkflow(false); alternate.autoSysFields(false)
            alternate.setValue('name', name); alternate.update()
            expectFailure(service, request(specificationId, multipleStamp), 'active OOB Step Configuration was ambiguous: ' + name, before, 'multiple ' + name + ' matches')
        } finally {
            if (alternate && alternateName) restore(alternate, { name: alternateName })
            restore(configuration, { active: true })
        }
    }
    function exerciseInputDefinition(service, specificationId, before, options) {
        var definition = new GlideRecord('sys_atf_variable')
        definition.addQuery('sys_class_name', 'atf_input_variable'); definition.addQuery('model', options.model)
        definition.addQuery('element', options.element); definition.addQuery('active', true); definition.addQuery('mandatory', true); definition.query()
        if (!definition.next()) fail(options.element + ' input definition not found')
        var alternate = null; var originalValues = null
        try {
            definition.setWorkflow(false); definition.autoSysFields(false); definition.setValue('active', false); definition.update()
            expectFailure(service, request(specificationId, options.zeroStamp), 'required OOB input definition was not found: ' + options.element, before, 'zero ' + options.element + ' input match')
            restore(definition, { active: true })
            alternate = new GlideRecord('sys_atf_variable'); alternate.addQuery('sys_class_name', 'atf_input_variable'); alternate.addQuery('active', true)
            alternate.addQuery('model', 'NOT IN', options.requiredModels); alternate.setLimit(1); alternate.query()
            if (!alternate.next()) fail('alternate input definition not found')
            originalValues = { model: alternate.getValue('model'), element: alternate.getValue('element'), mandatory: alternate.getValue('mandatory'), internal_type: alternate.getValue('internal_type'), reference: alternate.getValue('reference') }
            alternate.setWorkflow(false); alternate.autoSysFields(false); alternate.setValue('model', options.model)
            alternate.setValue('element', options.element); alternate.setValue('mandatory', true)
            alternate.setValue('internal_type', 'reference'); alternate.setValue('reference', options.reference); alternate.update()
            expectFailure(service, request(specificationId, options.multipleStamp), 'required OOB input definition was ambiguous: ' + options.element, before, 'multiple ' + options.element + ' input matches')
        } finally {
            if (alternate && originalValues) restore(alternate, originalValues)
            restore(definition, { active: true })
        }
    }

    var before = counts(); var service = new AtfGenerationService(); var specification = null
    try {
        expectFailure(service, request('ffffffffffffffffffffffffffffffff', '2026-08-02 01:00:01'), 'bound Specification does not exist', before, 'missing bound Specification')

        specification = createSpecification(2)
        expectFailure(service, request(specification.getUniqueValue(), '2026-08-02 01:00:02'), 'bound Specification Schema Version must be 1', before, 'worker compatibility')
        specification.setValue('x_gemjp_atf_genera_schema_version', 1); specification.update()

        var specificationId = specification.getUniqueValue()
        exerciseConfiguration(service, specificationId, before, 'Impersonate', '2026-08-02 01:00:03', '2026-08-02 01:00:04')
        exerciseConfiguration(service, specificationId, before, 'Open a Catalog Item (SP)', '2026-08-02 01:00:05', '2026-08-02 01:00:06')
        var impersonate = findOneConfiguration('Impersonate'); var openCatalogItem = findOneConfiguration('Open a Catalog Item (SP)')
        var requiredModels = impersonate.getUniqueValue() + ',' + openCatalogItem.getUniqueValue()
        var inputCases = [
            { model: impersonate.getUniqueValue(), element: 'user', reference: 'sys_user' },
            { model: openCatalogItem.getUniqueValue(), element: 'portal_id', reference: 'sp_portal' },
            { model: openCatalogItem.getUniqueValue(), element: 'page_id', reference: 'sp_page' },
            { model: openCatalogItem.getUniqueValue(), element: 'catalog_item', reference: 'sc_cat_item' },
        ]
        for (var index = 0; index < inputCases.length; index++) {
            inputCases[index].requiredModels = requiredModels
            inputCases[index].zeroStamp = '2026-08-02 01:01:0' + String(index * 2 + 1)
            inputCases[index].multipleStamp = '2026-08-02 01:01:0' + String(index * 2 + 2)
            exerciseInputDefinition(service, specificationId, before, inputCases[index])
        }
    } finally {
        if (specification && specification.isValidRecord()) specification.deleteRecord()
    }

    // These source constants remain instance-bound and plugin availability is
    // represented only by exact-cardinality metadata lookup, never plugin state.
    if (!PORTAL_ID || !PAGE_ID) fail('Portal/Page fixture constants are required')
})()

(function (outputs, steps, params, stepResult, assertEqual) {
    var PROPERTY_PREFIX = 'x_gemjp_atf_genera.prototype.ticket_03.'
    var ACCESSIBLE_V1_USER_ID = 'd8f57f140b20220050192f15d6673a98'

    function fail(classification, message) {
        throw new Error('V2 Ticket 03 [' + classification + '] ' + message)
    }

    function requireExactProperty(suffix, classification) {
        var property = new GlideRecord('sys_properties')
        property.addQuery('name', PROPERTY_PREFIX + suffix)
        property.setLimit(2)
        property.query()

        if (!property.next()) {
            fail(classification, 'missing Behavior Execution Profile property: ' + suffix)
        }

        var value = property.getValue('value')
        if (property.next()) {
            fail(classification, 'ambiguous Behavior Execution Profile property: ' + suffix)
        }
        if (!value) {
            fail(classification, 'empty Behavior Execution Profile property: ' + suffix)
        }

        return value
    }

    function requireExactActiveRecord(table, field, value, classification, label) {
        var record = new GlideRecord(table)
        record.addQuery(field, value)
        if (record.isValidField('active')) {
            record.addQuery('active', true)
        }
        record.setLimit(2)
        record.query()

        if (!record.next()) {
            fail(classification, label + ' was not found or inactive: ' + value)
        }

        var recordId = record.getUniqueValue()
        if (record.next()) {
            fail(classification, label + ' was ambiguous: ' + value)
        }
        return recordId
    }

    function requireStepConfiguration(name) {
        return requireExactActiveRecord('sys_atf_step_config', 'name', name, 'OPEN', 'OOB ATF step ' + name)
    }

    function requireInput(stepConfigurationId, element, expectedType, expectedReference, classification) {
        var input = new GlideRecord('sys_atf_variable')
        input.addQuery('sys_class_name', 'atf_input_variable')
        input.addQuery('model', stepConfigurationId)
        input.addQuery('element', element)
        input.addQuery('active', true)
        input.setLimit(2)
        input.query()

        if (!input.next()) {
            fail(classification, 'missing active input ' + element)
        }
        if (String(input.getValue('internal_type')) !== expectedType) {
            fail(classification, element + ' type expected ' + expectedType + ' but was ' + input.getValue('internal_type'))
        }
        if (expectedReference && String(input.getValue('reference')) !== expectedReference) {
            fail(classification, element + ' reference expected ' + expectedReference + ' but was ' + input.getValue('reference'))
        }
        if (input.next()) {
            fail(classification, 'ambiguous active input ' + element)
        }
    }

    var behaviorExecutionUserId = requireExactProperty('behavior_execution_user', 'USER_RESOLUTION')
    if (behaviorExecutionUserId === ACCESSIBLE_V1_USER_ID) {
        fail('USER_RESOLUTION', 'Behavior Execution User reuses the forbidden version-1 Accessible Representative Test User')
    }
    requireExactActiveRecord('sys_user', 'sys_id', behaviorExecutionUserId, 'USER_RESOLUTION', 'Behavior Execution User')

    var portalId = requireExactProperty('service_portal', 'OPEN')
    var pageId = requireExactProperty('catalog_item_page', 'OPEN')
    var timeoutSeconds = requireExactProperty('readiness_timeout_seconds', 'LOAD_READINESS')
    if (String(parseInt(timeoutSeconds, 10)) !== String(timeoutSeconds) || parseInt(timeoutSeconds, 10) < 1) {
        fail('LOAD_READINESS', 'readiness timeout must be a positive integer: ' + timeoutSeconds)
    }

    requireExactActiveRecord('sp_portal', 'sys_id', portalId, 'OPEN', 'OOB Service Portal')
    var portal = new GlideRecord('sp_portal')
    if (!portal.get(portalId) || String(portal.getValue('url_suffix')) !== 'sp') {
        fail('OPEN', 'configured Portal does not have the OOB sp URL suffix: ' + portalId)
    }
    var page = new GlideRecord('sp_page')
    if (!page.get(pageId) || String(page.getValue('id')) !== 'sc_cat_item') {
        fail('OPEN', 'configured Page is not the OOB sc_cat_item page: ' + pageId)
    }

    var impersonate = requireStepConfiguration('Impersonate')
    requireInput(impersonate, 'user', 'reference', 'sys_user', 'IMPERSONATION')

    var open = requireStepConfiguration('Open a Catalog Item (SP)')
    requireInput(open, 'portal_id', 'reference', 'sp_portal', 'OPEN')
    requireInput(open, 'page_id', 'reference', 'sp_page', 'OPEN')
    requireInput(open, 'catalog_item', 'reference', 'sc_cat_item', 'OPEN')

    var readiness = requireStepConfiguration('Variable State Validation (SP)')
    requireInput(readiness, 'catalog_item', 'reference', 'sc_cat_item', 'LOAD_READINESS')
    requireInput(readiness, 'visible', 'slushbucket', '', 'LOAD_READINESS')
    requireInput(readiness, 'read_only', 'slushbucket', '', 'LOAD_READINESS')

    var valueAssertion = requireStepConfiguration('Validate Variable Values (SP)')
    requireInput(valueAssertion, 'catalog_item', 'reference', 'sc_cat_item', 'ASSERTION')
    requireInput(valueAssertion, 'catalog_conditions', 'variable_conditions', '', 'ASSERTION')

    var assignment = requireStepConfiguration('Set Variable Values (SP)')
    requireInput(assignment, 'catalog_item', 'reference', 'sc_cat_item', 'ASSERTION')
    requireInput(assignment, 'variable_values', 'variable_template_value', '', 'ASSERTION')

    stepResult.setOutputMessage(
        'V2 Ticket 03 profile preflight passed for Behavior Execution User ' +
            behaviorExecutionUserId +
            ', Portal ' +
            portalId +
            ', Page ' +
            pageId +
            ', timeout ' +
            timeoutSeconds +
            ' seconds.'
    )
    return true
})(outputs, steps, params, stepResult, assertEqual)

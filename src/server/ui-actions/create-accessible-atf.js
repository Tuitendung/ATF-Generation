(function executeCreateAtf() {
    var REQUIRED_ROLE = 'atf_test_admin'
    var SPECIFICATION_KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var EVENT_NAME = 'x_gemjp_atf_genera.accessible.generate'

    function returnToCatalogItem() {
        action.setRedirectURL(current)
        action.setNoPop(true)
    }

    if (!gs.hasRole(REQUIRED_ROLE)) {
        gs.addErrorMessage('The atf_test_admin role is required to create ATF artifacts.')
        returnToCatalogItem()
        return
    }

    var specification = new GlideRecord('kb_knowledge')
    specification.addQuery('kb_knowledge_base', SPECIFICATION_KB_ID)
    specification.addQuery(
        'x_gemjp_atf_genera_catalog_item',
        current.getUniqueValue()
    )
    specification.addQuery('workflow_state', 'published')
    specification.query()

    var specificationCount = specification.getRowCount()
    if (specificationCount === 0) {
        gs.addErrorMessage(
            'No Current Published Specification exists for ' + current.getDisplayValue() + '.'
        )
        returnToCatalogItem()
        return
    }

    if (specificationCount > 1) {
        gs.addErrorMessage(
            specificationCount +
                ' Current Published Specifications exist for ' +
                current.getDisplayValue() +
                '. Retire all but one before creating ATF artifacts.'
        )
        returnToCatalogItem()
        return
    }
    specification.next()
    var specificationId = specification.getUniqueValue()

    var schemaVersion = String(
        specification.getValue('x_gemjp_atf_genera_schema_version') || ''
    )
    if (!schemaVersion) {
        gs.addErrorMessage(
            'Specification ' +
                specification.getValue('number') +
                ' has blank Schema Version; required version is 1.'
        )
        returnToCatalogItem()
        return
    }
    if (schemaVersion !== '1') {
        gs.addErrorMessage(
            'Specification ' +
                specification.getValue('number') +
                ' declares unsupported Schema Version ' +
                schemaVersion +
                '; supported version is 1.'
        )
        returnToCatalogItem()
        return
    }

    var runStamp = new GlideDateTime().getValue()
    gs.eventQueue(EVENT_NAME, current, specificationId, runStamp)
    gs.addInfoMessage('ATF Generation was queued. UTC run stamp: ' + runStamp)
    returnToCatalogItem()
})()

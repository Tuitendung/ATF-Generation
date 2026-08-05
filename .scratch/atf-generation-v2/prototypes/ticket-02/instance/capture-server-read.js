(function () {
    // THROWAWAY BACKGROUND SCRIPT. Replace every placeholder from the instance
    // runbook. This script is read-only and creates no metadata or article.
    var CONFIG = {
        phase: 'REPLACE_WITH_LIFECYCLE_PHASE',
        articleSysId: 'REPLACE_WITH_32_CHARACTER_SYS_ID',
        fields: [
            'REPLACE_WITH_VARIABLE_DESIGN_COLUMN',
            'REPLACE_WITH_BUSINESS_LOGIC_COLUMN',
            'REPLACE_WITH_VARIABLE_TEST_DATA_COLUMN',
        ],
    }

    function fail(message) {
        throw new Error('Ticket 02 evidence capture failed: ' + message)
    }

    function lineEvidence(value) {
        var text = String(value || '')
        var crlfCount = (text.match(/\r\n/g) || []).length
        var withoutCrlf = text.replace(/\r\n/g, '')
        var lfCount = (withoutCrlf.match(/\n/g) || []).length
        var crCount = (withoutCrlf.match(/\r/g) || []).length
        var lines = text.split(/\r\n|\n|\r/)
        var retained = []
        for (var index = 0; index < lines.length; index++) {
            retained.push({ physical_line: index + 1, text: lines[index] })
        }
        return {
            char_length: text.length,
            value_base64: GlideStringUtil.base64Encode(text),
            crlf_count: crlfCount,
            lf_count: lfCount,
            lone_cr_count: crCount,
            physical_line_count: lines.length,
            physical_lines: retained,
        }
    }

    if (!/^[0-9a-f]{32}$/.test(CONFIG.articleSysId)) fail('articleSysId placeholder was not replaced')

    var article = new GlideRecord('kb_knowledge')
    if (!article.get(CONFIG.articleSysId)) fail('exact article sys_id was not found')

    var output = {
        phase: CONFIG.phase,
        captured_at_utc: new GlideDateTime().getValue(),
        article: {
            sys_id: article.getUniqueValue(),
            number: article.getValue('number'),
            workflow_state: article.getValue('workflow_state'),
            version: article.getValue('version'),
            kb_knowledge_base: article.getValue('kb_knowledge_base'),
        },
        dictionary: {},
        fields: {},
    }

    for (var fieldIndex = 0; fieldIndex < CONFIG.fields.length; fieldIndex++) {
        var field = CONFIG.fields[fieldIndex]
        if (field.indexOf('REPLACE_WITH_') === 0) fail('field placeholder was not replaced')
        if (!article.isValidField(field)) fail(field + ' is not a valid kb_knowledge field')

        var dictionary = new GlideRecord('sys_dictionary')
        dictionary.addQuery('name', 'kb_knowledge')
        dictionary.addQuery('element', field)
        dictionary.setLimit(2)
        dictionary.query()
        if (!dictionary.next()) fail('dictionary row missing for ' + field)
        var dictionarySysId = dictionary.getUniqueValue()
        if (dictionary.next()) fail('dictionary row is ambiguous for ' + field)
        dictionary.get(dictionarySysId)

        output.dictionary[field] = {
            sys_id: dictionary.getUniqueValue(),
            internal_type: dictionary.getValue('internal_type'),
            max_length: dictionary.getValue('max_length'),
        }
        output.fields[field] = lineEvidence(article.getValue(field))
    }

    gs.info('TICKET02_EVIDENCE ' + JSON.stringify(output))
})()


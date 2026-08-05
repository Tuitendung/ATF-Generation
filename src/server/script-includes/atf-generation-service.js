var AtfGenerationService = Class.create()
AtfGenerationService.prototype = {
    initialize: function (generationIntegrationSeam) {
        // Package-private integration seam. Production callers supply none;
        // executable acceptance coverage may fail a named insertion stage and
        // observe diagnostic order without exposing tables, values, or helpers.
        this._generationIntegrationSeam = generationIntegrationSeam || null
    },

    _writeDiagnostic: function (level, message) {
        if (level === 'error') {
            gs.error(message)
        } else {
            gs.info(message)
        }
        if (
            this._generationIntegrationSeam &&
            typeof this._generationIntegrationSeam.observeDiagnostic === 'function'
        ) {
            this._generationIntegrationSeam.observeDiagnostic(message)
        }
    },

    generatePermissionRunFromBoundSpecification: function (request) {
        request = request || {}
        var catalogItemId = String(request.catalogItemId || '')
        var specificationId = String(request.specificationId || '')
        var runStamp = String(request.runStamp || '')
        var requestedBy = String(request.requestedBy || '')

        var startMessage =
            '[ATF-GEN][' + (runStamp || 'missing-run-stamp') + '] Generation started'
        this._writeDiagnostic('info', startMessage)

        function failBoundPreflight(message) {
            var error = new Error('ATF generation failed: ' + message)
            gs.error(
                '[ATF-GEN][' +
                    (runStamp || 'missing-run-stamp') +
                    '] Preflight failed: ' +
                    error.message
            )
            throw error
        }

        if (!/^[0-9a-f]{32}$/.test(catalogItemId)) {
            failBoundPreflight('Catalog Item must be a 32-character sys_id')
        }
        if (!/^[0-9a-f]{32}$/.test(specificationId)) {
            failBoundPreflight('bound Specification must be a 32-character sys_id')
        }
        if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(runStamp)) {
            failBoundPreflight('run stamp must be a UTC GlideDateTime value')
        }

        // The asynchronous worker deliberately reads only the record bound at
        // click time. It never repeats the Current Specification lookup.
        var specification = new GlideRecord('kb_knowledge')
        if (!specification.get(specificationId)) {
            failBoundPreflight('bound Specification does not exist: ' + specificationId)
        }

        var schemaVersion = String(
            specification.getValue('x_gemjp_atf_genera_schema_version') || ''
        )
        if (schemaVersion !== '1') {
            failBoundPreflight('bound Specification Schema Version must be 1')
        }

        var boundCatalogItemId = String(
            specification.getValue('x_gemjp_atf_genera_catalog_item') || ''
        )
        if (boundCatalogItemId !== catalogItemId) {
            failBoundPreflight(
                'bound Specification Catalog Item does not match event context'
            )
        }

        var representativeTestUserId = String(
            specification.getValue('x_gemjp_atf_genera_accessible_user') || ''
        )
        var inaccessibleRepresentativeTestUserId = String(
            specification.getValue('x_gemjp_atf_genera_inaccessible_user') || ''
        )
        return this.generatePermissionRun({
            catalogItemId: catalogItemId,
            representativeTestUserId: representativeTestUserId,
            inaccessibleRepresentativeTestUserId: inaccessibleRepresentativeTestUserId,
            accessibleUserCriteriaId: String(
                specification.getValue('x_gemjp_atf_genera_accessible_criteria') || ''
            ),
            accessibleUserCriteriaDisplay: String(
                specification.getDisplayValue('x_gemjp_atf_genera_accessible_criteria') || ''
            ),
            inaccessibleUserCriteriaId: String(
                specification.getValue('x_gemjp_atf_genera_inaccessible_criteria') || ''
            ),
            inaccessibleUserCriteriaDisplay: String(
                specification.getDisplayValue('x_gemjp_atf_genera_inaccessible_criteria') || ''
            ),
            accessibleRepresentativeTestUserDisplay: String(
                specification.getDisplayValue('x_gemjp_atf_genera_accessible_user') || ''
            ),
            inaccessibleRepresentativeTestUserDisplay: String(
                specification.getDisplayValue('x_gemjp_atf_genera_inaccessible_user') || ''
            ),
            specificationId: specificationId,
            specificationNumber: String(
                specification.getValue('number') || specification.getDisplayValue() || specificationId
            ),
            schemaVersion: schemaVersion,
            // Verified Australia OOB Service Portal (/sp). Replace manually
            // when the executable integration target changes instance.
            portalId: '81b75d3147032100ba13a5554ee4902b',
            // Verified Australia OOB sc_cat_item Page. Replace manually when
            // the executable integration target changes instance.
            pageId: '9f12251147132100ba13a5554ee490f4',
            runStamp: runStamp,
            requestedBy: requestedBy,
            generationStartLogged: true,
        })
    },

    generateAccessibleFromBoundSpecification: function (request) {
        return this.generatePermissionRunFromBoundSpecification(request)
    },

    generateAccessible: function (request) {
        return this.generatePermissionRun(request)
    },

    generatePermissionRun: function (request) {
        request = request || {}
        var preflightComplete = false
        var preflightRunStamp = String(request.runStamp || 'missing-run-stamp')
        var logPrefix = '[ATF-GEN][' + preflightRunStamp + '] '
        var generationStage = 'preflight'
        var createdArtifacts = []
        var generationIntegrationSeam = this._generationIntegrationSeam
        var generationService = this

        function writeInfo(message) {
            generationService._writeDiagnostic('info', logPrefix + message)
        }

        function writeError(message) {
            generationService._writeDiagnostic('error', logPrefix + message)
        }

        if (!request.generationStartLogged) {
            writeInfo('Generation started')
        }

        function conciseErrorSummary(error) {
            var summary = String(
                error && error.message ? error.message : error || 'Unknown generation error'
            )
            return summary.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').substring(0, 500)
        }

        function executeInsert(stage, insertOperation) {
            generationStage = stage
            if (
                generationIntegrationSeam &&
                typeof generationIntegrationSeam.executeInsert === 'function'
            ) {
                return generationIntegrationSeam.executeInsert(stage, insertOperation)
            }
            return insertOperation()
        }

        function recordCreated(artifactType, sysId) {
            var artifact = {
                type: artifactType,
                id: String(sysId),
            }
            createdArtifacts.push(artifact)
            writeInfo('Created ' + artifact.type + ': ' + artifact.id)
        }

        function logPostPreflightFailure(error) {
            writeError(
                'Generation failed at ' +
                    generationStage +
                    ': ' +
                    conciseErrorSummary(error)
            )
            for (var index = 0; index < createdArtifacts.length; index++) {
                writeError(
                    'Partial artifact ' +
                        createdArtifacts[index].type +
                        ': ' +
                        createdArtifacts[index].id
                )
            }
        }

        function fail(message) {
            var error = new Error('ATF generation failed: ' + message)
            if (!preflightComplete) {
                gs.error(
                    '[ATF-GEN][' +
                        preflightRunStamp +
                        '] Preflight failed: ' +
                        error.message
                )
            }
            throw error
        }

        function requireId(value, label) {
            var id = String(value || '')
            if (!/^[0-9a-f]{32}$/.test(id)) {
                fail(label + ' must be a 32-character sys_id')
            }
            return id
        }

        function requireRecord(table, sysId, label, requireActive) {
            var record = new GlideRecord(table)
            if (!record.get(sysId)) {
                fail(label + ' does not exist in ' + table + ': ' + sysId)
            }
            if (requireActive && record.getValue('active') !== '1') {
                fail(label + ' is not active: ' + sysId)
            }
            return record
        }

        function resolveStepConfiguration(name) {
            var configuration = new GlideRecord('sys_atf_step_config')
            configuration.addQuery('name', name)
            configuration.addQuery('active', true)
            configuration.setLimit(2)
            configuration.query()

            if (!configuration.next()) {
                fail('active OOB Step Configuration was not found: ' + name)
            }

            var configurationId = configuration.getUniqueValue()
            if (configuration.next()) {
                fail('active OOB Step Configuration was ambiguous: ' + name)
            }

            return configurationId
        }

        function resolveInputDefinition(stepConfigurationId, element, expectedReferenceTable) {
            var definition = new GlideRecord('sys_atf_variable')
            definition.addQuery('sys_class_name', 'atf_input_variable')
            definition.addQuery('model', stepConfigurationId)
            definition.addQuery('element', element)
            definition.addQuery('active', true)
            definition.addQuery('mandatory', true)
            definition.setLimit(2)
            definition.query()

            if (!definition.next()) {
                fail('required OOB input definition was not found: ' + element)
            }

            var resolved = {
                id: definition.getUniqueValue(),
                element: definition.getValue('element'),
                order: definition.getValue('order'),
            }

            if (definition.next()) {
                fail('required OOB input definition was ambiguous: ' + element)
            }
            definition.get(resolved.id)

            if (definition.getValue('internal_type') !== 'reference') {
                fail('OOB input definition is not a reference: ' + element)
            }
            if (definition.getValue('reference') !== expectedReferenceTable) {
                fail(
                    'OOB input definition ' +
                        element +
                        ' references ' +
                        definition.getValue('reference') +
                        ', expected ' +
                        expectedReferenceTable
                )
            }

            return resolved
        }

        function insertRecord(table, values, label) {
            var record = new GlideRecord(table)
            record.initialize()
            for (var field in values) {
                if (values.hasOwnProperty(field)) {
                    record.setValue(field, values[field])
                }
            }
            var insertedId = executeInsert(label, function () {
                return record.insert()
            })
            if (!insertedId) {
                fail(label + ' insert returned no sys_id')
            }
            insertedId = String(insertedId)
            recordCreated(label, insertedId)
            return insertedId
        }

        function insertProtectedRecord(table, values, label) {
            // Core Create Record is a verified active Global action on this
            // instance (sys_hub_action_type_snapshot
            // 2de05916c31332002841b63b12d3aee1). Running it in the foreground
            // is the supported synchronous boundary for OOB tables whose
            // Application Access denies direct scoped create.
            var encodedValues = []
            for (var field in values) {
                if (values.hasOwnProperty(field)) {
                    encodedValues.push(field + '=' + String(values[field]).replace(/\^/g, '^^'))
                }
            }

            var result = executeInsert(label, function () {
                return sn_fd.FlowAPI.getRunner()
                    .action('global.create_record')
                    .inForeground()
                    .withInputs({
                        table_name: table,
                        // SDK TemplateValue is serialized to this encoded-query
                        // string shape before the same Core action receives it.
                        values: encodedValues.join('^'),
                    })
                    .run()
            })
            var outputs = result.getOutputs()
            var created = outputs && outputs.record
            var insertedId = ''
            if (created && typeof created.getUniqueValue === 'function') {
                insertedId = created.getUniqueValue()
            } else if (created && created.sys_id) {
                insertedId = String(created.sys_id)
            } else if (created) {
                insertedId = String(created)
            }

            if (!insertedId) {
                fail(label + ' Core Create Record action returned no sys_id')
            }
            insertedId = String(insertedId)
            recordCreated(label, insertedId)
            return insertedId
        }

        function insertStep(testId, configurationId, order, inputs, label) {
            var step = new GlideRecord('sys_atf_step')
            step.initialize()
            step.setValue('test', testId)
            step.setValue('step_config', configurationId)
            step.setValue('active', true)
            step.setValue('order', order)

            for (var index = 0; index < inputs.length; index++) {
                var input = inputs[index]
                // This is the OOB GlideVar persistence seam used by
                // global.AddTestTemplateAjax. It creates sys_variable_value
                // records without direct scoped writes to that protected table.
                // The definition was already verified against this exact Step
                // Configuration during preflight; getVariablesRecord() is a
                // fenced Global-only validation helper and is not needed here.
                step.inputs[input.definition.element] = input.value
            }

            var stepId = executeInsert(label, function () {
                return step.insert()
            })
            if (!stepId) {
                fail(label + ' insert returned no sys_id')
            }
            stepId = String(stepId)
            recordCreated(label, stepId)

            // GlideVar materializes both assigned required inputs and any OOB
            // optional defaults as sys_variable_value artifacts. Query them
            // only after the Step insert so every created sys_id is stamped.
            var persistedInputs = new GlideRecord('sys_variable_value')
            persistedInputs.addQuery('document', 'sys_atf_step')
            persistedInputs.addQuery('document_key', stepId)
            persistedInputs.orderBy('sys_id')
            persistedInputs.query()
            while (persistedInputs.next()) {
                recordCreated('Step Input Value', persistedInputs.getUniqueValue())
            }
            return stepId
        }

        function assembleTest(options) {
            var testId = insertRecord(
                'sys_atf_test',
                {
                    name: options.name,
                    description: options.description,
                    active: true,
                    fail_on_server_error: false,
                    enable_parameterized_testing: false,
                },
                options.label + ' Test'
            )

            var impersonateStepId = insertStep(
                testId,
                options.impersonateConfigurationId,
                1,
                [{ definition: options.userDefinition, value: options.representativeTestUserId }],
                options.label + ' Impersonate Test Step'
            )

            var openCatalogItemStepId = insertStep(
                testId,
                options.openCatalogItemConfigurationId,
                2,
                [
                    { definition: options.portalDefinition, value: options.portalId },
                    { definition: options.pageDefinition, value: options.pageId },
                    { definition: options.catalogItemDefinition, value: options.catalogItemId },
                ],
                options.label + ' Open a Catalog Item (SP) Test Step'
            )

            // A Suite membership is the completion marker for one generated
            // Test. It is inserted only after the Test, both ordered OOB Steps,
            // and all Step Input Values have been persisted.
            var membershipId = insertProtectedRecord(
                'sys_atf_test_suite_test',
                {
                    test_suite: options.suiteId,
                    test: testId,
                    order: options.membershipOrder,
                    abort_on_failure: false,
                },
                options.label + ' Test Suite membership'
            )

            return {
                testId: testId,
                impersonateStepId: impersonateStepId,
                openCatalogItemStepId: openCatalogItemStepId,
                membershipId: membershipId,
            }
        }

        var catalogItemId = requireId(request.catalogItemId, 'Catalog Item')
        var representativeTestUserId = requireId(
            request.representativeTestUserId,
            'Representative Test User'
        )
        var inaccessibleRepresentativeTestUserId = String(
            request.inaccessibleRepresentativeTestUserId || ''
        )
        if (inaccessibleRepresentativeTestUserId) {
            inaccessibleRepresentativeTestUserId = requireId(
                inaccessibleRepresentativeTestUserId,
                'Inaccessible Representative Test User'
            )
        }
        var portalId = requireId(request.portalId, 'Portal')
        var pageId = requireId(request.pageId, 'Page')

        // Validate every explicit source reference before creating any artifact.
        var catalogItem = requireRecord('sc_cat_item', catalogItemId, 'Catalog Item', true)
        var representativeTestUser = requireRecord(
            'sys_user',
            representativeTestUserId,
            'Representative Test User',
            true
        )
        var inaccessibleRepresentativeTestUser = null
        if (inaccessibleRepresentativeTestUserId) {
            inaccessibleRepresentativeTestUser = requireRecord(
                'sys_user',
                inaccessibleRepresentativeTestUserId,
                'Inaccessible Representative Test User',
                true
            )
        }
        var portal = requireRecord('sp_portal', portalId, 'Portal', false)
        var page = requireRecord('sp_page', pageId, 'Page', false)

        // Resolve OOB metadata by its real owning records. No OOB Step
        // Configuration or Input Definition sys_id is hardcoded here.
        var impersonateConfigurationId = resolveStepConfiguration('Impersonate')
        var openCatalogItemConfigurationId = resolveStepConfiguration('Open a Catalog Item (SP)')
        var userDefinition = resolveInputDefinition(impersonateConfigurationId, 'user', 'sys_user')
        var portalDefinition = resolveInputDefinition(openCatalogItemConfigurationId, 'portal_id', 'sp_portal')
        var pageDefinition = resolveInputDefinition(openCatalogItemConfigurationId, 'page_id', 'sp_page')
        var catalogItemDefinition = resolveInputDefinition(
            openCatalogItemConfigurationId,
            'catalog_item',
            'sc_cat_item'
        )
        preflightComplete = true
        generationStage = 'preparing artifact provenance'

        try {
        var generatedAt = String(request.runStamp || new GlideDateTime().getValue())
        var catalogItemName = catalogItem.getDisplayValue() || catalogItem.getValue('name') || catalogItemId
        var specificationId = String(request.specificationId || '')
        var specificationNumber = String(request.specificationNumber || '')
        var schemaVersion = String(request.schemaVersion || '')
        var requestedBy = String(request.requestedBy || '')
        var hasCompletePermissionDesign = Boolean(inaccessibleRepresentativeTestUserId)
        var specificationLabel = specificationNumber
            ? specificationNumber + ' v' + schemaVersion
            : ''
        var portalDisplay = portal.getDisplayValue() || portalId
        var pageDisplay = page.getDisplayValue() || pageId
        var surfaceProvenance =
            'Service Portal surface: Portal ' +
            portalDisplay +
            ' (' +
            portalId +
            '), Page ' +
            pageDisplay +
            ' (' +
            pageId +
            ')'
        var commonProvenance =
            'Run stamp: ' +
            generatedAt +
            '; Catalog Item: ' +
            catalogItemName +
            ' (' +
            catalogItemId +
            ')' +
            (specificationId
                ? '; Bound Specification: ' +
                  specificationLabel +
                  ' (' +
                  specificationId +
                  ')'
                : '') +
            (requestedBy ? '; Requested by: ' + requestedBy : '') +
            '; ' +
            surfaceProvenance
        var suiteName = hasCompletePermissionDesign
            ? 'ATF Generation - ' +
              catalogItemName +
              ' - ' +
              specificationLabel +
              ' - ' +
              generatedAt
            : 'ATF Generation Seam - ' + catalogItemName + ' - ' + generatedAt
        var accessibleCriteriaId = String(request.accessibleUserCriteriaId || '')
        var accessibleCriteriaDisplay = String(request.accessibleUserCriteriaDisplay || '')
        var inaccessibleCriteriaId = String(request.inaccessibleUserCriteriaId || '')
        var inaccessibleCriteriaDisplay = String(
            request.inaccessibleUserCriteriaDisplay || ''
        )
        var accessibleUserDisplay = String(
            request.accessibleRepresentativeTestUserDisplay ||
                representativeTestUser.getDisplayValue() ||
                representativeTestUserId
        )
        var inaccessibleUserDisplay = inaccessibleRepresentativeTestUser
            ? String(
                  request.inaccessibleRepresentativeTestUserDisplay ||
                      inaccessibleRepresentativeTestUser.getDisplayValue() ||
                      inaccessibleRepresentativeTestUserId
              )
            : ''
        var accessibleDesignProvenance =
            'User Criteria: ' +
            accessibleCriteriaDisplay +
            ' (' +
            accessibleCriteriaId +
            ') [provenance only; not evaluated]; Representative Test User: ' +
            accessibleUserDisplay +
            ' (' +
            representativeTestUserId +
            ')'
        var inaccessibleDesignProvenance =
            'User Criteria: ' +
            inaccessibleCriteriaDisplay +
            ' (' +
            inaccessibleCriteriaId +
            ') [provenance only; not evaluated]; Representative Test User: ' +
            inaccessibleUserDisplay +
            ' (' +
            inaccessibleRepresentativeTestUserId +
            ')'
        var suiteDescription = hasCompletePermissionDesign
            ? commonProvenance +
              '; ACCESSIBLE expected access: can open; ' +
              accessibleDesignProvenance +
              '; INACCESSIBLE expected access: cannot open (EXPECTED STEP FAILURE); ' +
              inaccessibleDesignProvenance +
              '. Contains two manually executed permission Tests; automatic execution is disabled.'
            : 'Ticket 01 minimal OOB ATF graph. Contains one manually executed Accessible Test.'
        var accessibleTestDescription = hasCompletePermissionDesign
            ? commonProvenance +
              '; Expected access: can open; ' +
              accessibleDesignProvenance +
              '. Native ATF interpretation: a successful open is Passed/expectation satisfied; a failed open is Failed/expectation violated. Run manually.'
            : 'Ticket 01 Accessible Test for Catalog Item ' +
              catalogItemId +
              ' and Representative Test User ' +
              representativeTestUserId +
              '. Run manually.'
        var suiteId = insertProtectedRecord(
            'sys_atf_test_suite',
            {
                name: suiteName,
                description: suiteDescription,
                active: true,
            },
            'Test Suite'
        )

        var accessible = assembleTest({
            suiteId: suiteId,
            name: 'ACCESSIBLE - ' + catalogItemName + ' - ' + generatedAt,
            description: accessibleTestDescription,
            label: 'Accessible',
            representativeTestUserId: representativeTestUserId,
            membershipOrder: 1,
            impersonateConfigurationId: impersonateConfigurationId,
            openCatalogItemConfigurationId: openCatalogItemConfigurationId,
            userDefinition: userDefinition,
            portalDefinition: portalDefinition,
            pageDefinition: pageDefinition,
            catalogItemDefinition: catalogItemDefinition,
            portalId: portalId,
            pageId: pageId,
            catalogItemId: catalogItemId,
        })

        if (!hasCompletePermissionDesign) {
            writeInfo(
                'Generation completed: Test Suite ' +
                    suiteId +
                    ' contains Accessible Test ' +
                    accessible.testId
            )
            return {
                suiteId: suiteId,
                testId: accessible.testId,
                impersonateStepId: accessible.impersonateStepId,
                openCatalogItemStepId: accessible.openCatalogItemStepId,
                membershipId: accessible.membershipId,
            }
        }

        var inaccessible = assembleTest({
            suiteId: suiteId,
            name:
                'INACCESSIBLE - EXPECTED STEP FAILURE - ' +
                catalogItemName +
                ' - ' +
                generatedAt,
            description:
                commonProvenance +
                '; INACCESSIBLE - EXPECTED STEP FAILURE; Expected access: cannot open; ' +
                inaccessibleDesignProvenance +
                '. Native ATF status is retained: Failed/red is manually treated as expected inaccessible evidence; Passed/green is manually treated as unexpected access. Portal errors, widget errors, JavaScript errors, bad configuration, and timeouts also count as inaccessible evidence in this POC. Run manually.',
            label: 'Inaccessible',
            representativeTestUserId: inaccessibleRepresentativeTestUserId,
            membershipOrder: 2,
            impersonateConfigurationId: impersonateConfigurationId,
            openCatalogItemConfigurationId: openCatalogItemConfigurationId,
            userDefinition: userDefinition,
            portalDefinition: portalDefinition,
            pageDefinition: pageDefinition,
            catalogItemDefinition: catalogItemDefinition,
            portalId: portalId,
            pageId: pageId,
            catalogItemId: catalogItemId,
        })

        writeInfo(
            'Generation completed: Test Suite ' +
                suiteId +
                ' contains Accessible Test ' +
                accessible.testId +
                ' and Inaccessible Test ' +
                inaccessible.testId
        )

        return {
            suiteId: suiteId,
            // Ticket 01/03 compatibility aliases remain bound to the
            // Accessible graph while Ticket 04 exposes both outcomes.
            testId: accessible.testId,
            impersonateStepId: accessible.impersonateStepId,
            openCatalogItemStepId: accessible.openCatalogItemStepId,
            membershipId: accessible.membershipId,
            accessibleTestId: accessible.testId,
            accessibleImpersonateStepId: accessible.impersonateStepId,
            accessibleOpenCatalogItemStepId: accessible.openCatalogItemStepId,
            accessibleMembershipId: accessible.membershipId,
            inaccessibleTestId: inaccessible.testId,
            inaccessibleImpersonateStepId: inaccessible.impersonateStepId,
            inaccessibleOpenCatalogItemStepId: inaccessible.openCatalogItemStepId,
            inaccessibleMembershipId: inaccessible.membershipId,
        }
        } catch (error) {
            logPostPreflightFailure(error)
            throw error
        }
    },

    type: 'AtfGenerationService',
}

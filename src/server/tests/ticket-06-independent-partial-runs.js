(function (outputs, steps, params, stepResult, assertEqual) {
    var KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
    var CATALOG_ITEM_ID = '04b7e94b4f7b4200086eeed18110c7fd'
    var ACCESSIBLE_USER_ID = 'd8f57f140b20220050192f15d6673a98'
    var INACCESSIBLE_USER_ID = '6816f79cc0a8016401c5a33be04be441'
    // Verified Australia OOB Portal/Page fixtures. Replace both manually when
    // this executable integration test targets a different instance.
    var SERVICE_PORTAL_ID = '81b75d3147032100ba13a5554ee4902b'
    var CATALOG_ITEM_PAGE_ID = '9f12251147132100ba13a5554ee490f4'
    var specificationId = ''
    var REQUESTED_BY = 'ticket06.integration'
    var SPECIFICATION_LOG_SENTINEL = 'TICKET06_BOUND_SPECIFICATION_FIELDS_MUST_NOT_BE_LOGGED'

    function fail(message) {
        throw new Error('Ticket 06 generation-service integration failure: ' + message)
    }

    function requireValue(actual, expected, label) {
        if (String(actual || '') !== String(expected || '')) {
            fail(label + ' expected [' + expected + '] but was [' + actual + ']')
        }
    }

    function requireDifferent(actual, unexpected, label) {
        if (String(actual || '') === String(unexpected || '')) {
            fail(label + ' must be distinct')
        }
    }

    function collectIds(record) {
        var ids = []
        while (record.next()) {
            ids.push(String(record.getUniqueValue()))
        }
        ids.sort()
        return ids
    }

    function collectRelatedIds(table, field, parentIds, additionalQuery) {
        if (!parentIds.length) {
            return []
        }
        var record = new GlideRecord(table)
        record.addQuery(field, 'IN', parentIds.join(','))
        if (additionalQuery) {
            additionalQuery(record)
        }
        record.query()
        return collectIds(record)
    }

    function collectPersistedGraph(suiteIds, testIds) {
        var stepIds = collectRelatedIds('sys_atf_step', 'test', testIds)
        return {
            suiteIds: suiteIds.slice(0).sort(),
            testIds: testIds.slice(0).sort(),
            stepIds: stepIds,
            inputIds: collectRelatedIds(
                'sys_variable_value',
                'document_key',
                stepIds,
                function (record) {
                    record.addQuery('document', 'sys_atf_step')
                }
            ),
            membershipIds: collectRelatedIds(
                'sys_atf_test_suite_test',
                'test_suite',
                suiteIds
            ),
        }
    }

    function graphFromCreatedDiagnostics(observed, runStamp) {
        var prefix = '[ATF-GEN][' + runStamp + '] Created '
        var graph = {
            suiteIds: [],
            testIds: [],
            stepIds: [],
            inputIds: [],
            membershipIds: [],
        }
        for (var index = 0; index < observed.length; index++) {
            var diagnostic = String(observed[index])
            if (diagnostic.indexOf(prefix) !== 0) {
                continue
            }
            var created = diagnostic.substring(prefix.length)
            var separator = created.lastIndexOf(': ')
            if (separator === -1) {
                fail('created-artifact diagnostic has no type/sys_id separator: ' + diagnostic)
            }
            var artifactType = created.substring(0, separator)
            var artifactId = created.substring(separator + 2)
            if (!/^[0-9a-f]{32}$/.test(artifactId)) {
                fail('created-artifact diagnostic has an invalid sys_id: ' + diagnostic)
            }
            if (artifactType === 'Test Suite') {
                graph.suiteIds.push(artifactId)
            } else if (artifactType === 'Accessible Test' || artifactType === 'Inaccessible Test') {
                graph.testIds.push(artifactId)
            } else if (/ Test Step$/.test(artifactType)) {
                graph.stepIds.push(artifactId)
            } else if (artifactType === 'Step Input Value') {
                graph.inputIds.push(artifactId)
            } else if (/ Test Suite membership$/.test(artifactType)) {
                graph.membershipIds.push(artifactId)
            } else {
                fail('created-artifact diagnostic has an unexpected artifact type: ' + artifactType)
            }
        }
        graph.suiteIds.sort()
        graph.testIds.sort()
        graph.stepIds.sort()
        graph.inputIds.sort()
        graph.membershipIds.sort()
        return graph
    }

    function graphFromObservedInsertions(observed) {
        var graph = {
            suiteIds: [],
            testIds: [],
            stepIds: [],
            inputIds: [],
            membershipIds: [],
        }
        for (var index = 0; index < observed.length; index++) {
            var insertion = observed[index]
            if (insertion.stage === 'Test Suite') {
                graph.suiteIds.push(insertion.id)
            } else if (insertion.stage === 'Accessible Test' || insertion.stage === 'Inaccessible Test') {
                graph.testIds.push(insertion.id)
            } else if (/ Test Step$/.test(insertion.stage)) {
                graph.stepIds.push(insertion.id)
            } else if (/ Test Suite membership$/.test(insertion.stage)) {
                graph.membershipIds.push(insertion.id)
            } else {
                fail('insertion observer received an unexpected stage: ' + insertion.stage)
            }
        }
        graph.suiteIds.sort()
        graph.testIds.sort()
        graph.stepIds.sort()
        graph.membershipIds.sort()
        return graph
    }

    function requireSameGraph(actual, expected, label) {
        var fields = ['suiteIds', 'testIds', 'stepIds', 'inputIds', 'membershipIds']
        for (var fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
            var field = fields[fieldIndex]
            requireValue(actual[field].join(','), expected[field].join(','), label + ' ' + field)
        }
    }

    function requireInsertionGraphMatchesPersisted(observed, persisted, label) {
        var fields = ['suiteIds', 'testIds', 'stepIds', 'membershipIds']
        for (var fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
            var field = fields[fieldIndex]
            requireValue(observed[field].join(','), persisted[field].join(','), label + ' ' + field)
        }
    }

    function requireGraphCounts(graph, suites, tests, testSteps, inputs, memberships, label) {
        requireValue(graph.suiteIds.length, suites, label + ' Suite count')
        requireValue(graph.testIds.length, tests, label + ' Test count')
        requireValue(graph.stepIds.length, testSteps, label + ' Test Step count')
        requireValue(graph.inputIds.length, inputs, label + ' Step Input Value count')
        requireValue(graph.membershipIds.length, memberships, label + ' membership count')
    }

    function requireRecord(table, sysId, label) {
        var record = new GlideRecord(table)
        if (!record.get(sysId)) {
            fail(label + ' was not found: ' + sysId)
        }
        return record
    }

    function createdArtifactMessages(graph, testLabels) {
        var messages = ['Created Test Suite: ' + graph.suiteIds[0]]
        var orderedTestIds = []
        for (var testId in testLabels) {
            if (testLabels.hasOwnProperty(testId) && testLabels[testId] === 'Accessible') {
                orderedTestIds.unshift(testId)
            } else if (testLabels.hasOwnProperty(testId)) {
                orderedTestIds.push(testId)
            }
        }

        for (var testIndex = 0; testIndex < orderedTestIds.length; testIndex++) {
            var testId = orderedTestIds[testIndex]
            var outcome = testLabels[testId]
            messages.push('Created ' + outcome + ' Test: ' + testId)

            var testSteps = new GlideRecord('sys_atf_step')
            testSteps.addQuery('sys_id', 'IN', graph.stepIds.join(','))
            testSteps.addQuery('test', testId)
            testSteps.orderBy('order')
            testSteps.query()
            while (testSteps.next()) {
                var configuration = requireRecord(
                    'sys_atf_step_config',
                    testSteps.getValue('step_config'),
                    'generated Step Configuration'
                )
                messages.push(
                    'Created ' +
                        outcome +
                        ' ' +
                        configuration.getValue('name') +
                        ' Test Step: ' +
                        testSteps.getUniqueValue()
                )

                var inputs = new GlideRecord('sys_variable_value')
                inputs.addQuery('sys_id', 'IN', graph.inputIds.join(','))
                inputs.addQuery('document', 'sys_atf_step')
                inputs.addQuery('document_key', testSteps.getUniqueValue())
                inputs.orderBy('sys_id')
                inputs.query()
                while (inputs.next()) {
                    messages.push('Created Step Input Value: ' + inputs.getUniqueValue())
                }
            }

            if (graph.membershipIds.length) {
                var memberships = new GlideRecord('sys_atf_test_suite_test')
                memberships.addQuery('sys_id', 'IN', graph.membershipIds.join(','))
                memberships.addQuery('test', testId)
                memberships.query()
                while (memberships.next()) {
                    messages.push(
                        'Created ' +
                            outcome +
                            ' Test Suite membership: ' +
                            memberships.getUniqueValue()
                    )
                }
            }
        }
        return messages
    }

    function partialArtifactMessages(createdMessages) {
        var messages = []
        for (var index = 0; index < createdMessages.length; index++) {
            messages.push(createdMessages[index].replace(/^Created /, 'Partial artifact '))
        }
        return messages
    }

    function collectStampedLogs(runStamp, startedAt) {
        var prefix = '[ATF-GEN][' + runStamp + '] '
        var logs = new GlideRecord('syslog')
        logs.addQuery('message', 'STARTSWITH', prefix)
        logs.addQuery('sys_created_on', '>=', startedAt)
        logs.query()
        var messages = []
        while (logs.next()) {
            messages.push(String(logs.getValue('message')).substring(prefix.length))
        }
        return messages
    }

    function requireExactMessages(actual, expected, label) {
        requireValue(actual.length, expected.length, label + ' message count')
        for (var index = 0; index < expected.length; index++) {
            requireValue(actual[index], expected[index], label + ' message ' + index)
            if (/\n|\r|\bat\s+[^ ]+\s*\(/.test(actual[index])) {
                fail(label + ' contains a JavaScript stack trace: ' + actual[index])
            }
            if (actual[index].indexOf(SPECIFICATION_LOG_SENTINEL) !== -1) {
                fail(label + ' dumped bound Specification fields')
            }
        }
    }

    function requireExactPersistedMessages(actual, expected, label) {
        actual.sort()
        expected.sort()
        requireExactMessages(actual, expected, label)
    }

    function requireObservedMessages(observed, runStamp, expected, label) {
        var prefix = '[ATF-GEN][' + runStamp + '] '
        var messages = []
        for (var index = 0; index < observed.length; index++) {
            if (String(observed[index]).indexOf(prefix) !== 0) {
                fail(label + ' received an unstamped diagnostic: ' + observed[index])
            }
            messages.push(String(observed[index]).substring(prefix.length))
        }
        requireExactMessages(messages, expected, label)
    }

    function newRunStamp(baseStamp, seconds) {
        var stamp = new GlideDateTime(baseStamp)
        stamp.addSeconds(seconds)
        return stamp.getValue()
    }

    function runRequest(runStamp, requestedBy) {
        return {
            catalogItemId: CATALOG_ITEM_ID,
            specificationId: specificationId,
            runStamp: runStamp,
            requestedBy: requestedBy,
        }
    }

    function integrationSeam(failingStage, summary, observedDiagnostics, observedInsertions) {
        function insertedId(result) {
            var directId = String(result || '')
            if (/^[0-9a-f]{32}$/.test(directId)) {
                return directId
            }
            if (result && typeof result.getOutputs === 'function') {
                var outputs = result.getOutputs()
                var created = outputs && outputs.record
                if (created && typeof created.getUniqueValue === 'function') {
                    return String(created.getUniqueValue())
                }
                if (created && created.sys_id) {
                    return String(created.sys_id)
                }
                if (created && /^[0-9a-f]{32}$/.test(String(created))) {
                    return String(created)
                }
            }
            return ''
        }

        return {
            executeInsert: function (stage, insertOperation) {
                if (stage === failingStage) {
                    throw new Error(summary)
                }
                var result = insertOperation()
                var id = insertedId(result)
                if (!id) {
                    fail('insertion observer could not resolve a sys_id for stage ' + stage)
                }
                observedInsertions.push({ stage: stage, id: id })
                return result
            },
            observeDiagnostic: function (message) {
                observedDiagnostics.push(String(message))
            },
        }
    }

    function expectFailure(service, request, expectedSummary, label) {
        var caught = null
        try {
            service.generatePermissionRunFromBoundSpecification(request)
        } catch (error) {
            caught = error
        }
        if (!caught) {
            fail(label + ' unexpectedly succeeded')
        }
        if (String(caught.message || caught).indexOf(expectedSummary) === -1) {
            fail(label + ' did not preserve the concise error summary')
        }
    }

    function requireMembershipPointsTo(membershipId, testId, label) {
        var membership = requireRecord('sys_atf_test_suite_test', membershipId, label)
        requireValue(membership.getValue('test'), testId, label + ' Test')
    }

    function requireIdIn(ids, expectedId, label) {
        if (ids.indexOf(String(expectedId)) === -1) {
            fail(label + ' was not present: ' + expectedId)
        }
    }

    function requireTestGraph(testId, options) {
        var test = requireRecord('sys_atf_test', testId, options.label + ' Test')
        requireValue(test.getValue('active'), '1', options.label + ' Test active')
        requireValue(test.getValue('fail_on_server_error'), '0', options.label + ' server errors')
        requireValue(
            test.getValue('enable_parameterized_testing'),
            '0',
            options.label + ' automatic execution'
        )
        var expectedNamePrefix = options.label === 'Accessible'
            ? 'ACCESSIBLE - '
            : 'INACCESSIBLE - EXPECTED STEP FAILURE - '
        requireValue(
            String(test.getValue('name')).indexOf(expectedNamePrefix),
            0,
            options.label + ' display-name outcome label'
        )

        var steps = new GlideRecord('sys_atf_step')
        steps.addQuery('test', testId)
        steps.orderBy('order')
        steps.query()
        requireValue(steps.getRowCount(), options.complete ? 2 : 1, options.label + ' step count')

        var expectedSteps = [
            {
                order: '1',
                configuration: 'Impersonate',
                inputs: { user: options.userId },
                inputCount: 1,
            },
        ]
        if (options.complete) {
            expectedSteps.push({
                order: '2',
                configuration: 'Open a Catalog Item (SP)',
                inputs: {
                    portal_id: SERVICE_PORTAL_ID,
                    page_id: CATALOG_ITEM_PAGE_ID,
                    catalog_item: CATALOG_ITEM_ID,
                    query_params: '',
                },
                inputCount: 4,
            })
        }

        for (var stepIndex = 0; stepIndex < expectedSteps.length; stepIndex++) {
            if (!steps.next()) {
                fail(options.label + ' expected Test Step was not found at index ' + stepIndex)
            }
            var expectedStep = expectedSteps[stepIndex]
            requireValue(steps.getValue('test'), testId, options.label + ' Step Test reference')
            requireValue(steps.getValue('active'), '1', options.label + ' Step active')
            requireValue(steps.getValue('order'), expectedStep.order, options.label + ' Step order')
            var configuration = requireRecord(
                'sys_atf_step_config',
                steps.getValue('step_config'),
                options.label + ' Step Configuration'
            )
            requireValue(
                configuration.getValue('name'),
                expectedStep.configuration,
                options.label + ' Step Configuration name'
            )

            var inputs = new GlideRecord('sys_variable_value')
            inputs.addQuery('document', 'sys_atf_step')
            inputs.addQuery('document_key', steps.getUniqueValue())
            inputs.query()
            requireValue(
                inputs.getRowCount(),
                expectedStep.inputCount,
                options.label + ' ' + expectedStep.configuration + ' input count'
            )
            var seenInputs = {}
            while (inputs.next()) {
                var definition = requireRecord(
                    'sys_atf_variable',
                    inputs.getValue('variable'),
                    options.label + ' Step Input Definition'
                )
                var element = String(definition.getValue('element'))
                if (!expectedStep.inputs.hasOwnProperty(element)) {
                    fail(options.label + ' unexpected Step Input Definition: ' + element)
                }
                var actualValue = inputs.getValue('value')
                if (actualValue === null) {
                    actualValue = ''
                }
                requireValue(
                    actualValue,
                    expectedStep.inputs[element],
                    options.label + ' ' + element + ' input value'
                )
                if (seenInputs[element]) {
                    fail(options.label + ' duplicated Step Input Definition: ' + element)
                }
                seenInputs[element] = true
            }
            for (var expectedElement in expectedStep.inputs) {
                if (
                    expectedStep.inputs.hasOwnProperty(expectedElement) &&
                    !seenInputs[expectedElement]
                ) {
                    fail(options.label + ' missing Step Input Definition: ' + expectedElement)
                }
            }
        }
    }

    function requireSuiteGraph(graph, testLabels) {
        var suite = requireRecord('sys_atf_test_suite', graph.suiteIds[0], 'partial Test Suite')
        requireValue(suite.getValue('active'), '1', 'partial Test Suite active')
        for (var membershipIndex = 0; membershipIndex < graph.membershipIds.length; membershipIndex++) {
            var membership = requireRecord(
                'sys_atf_test_suite_test',
                graph.membershipIds[membershipIndex],
                'partial Suite membership'
            )
            requireValue(
                membership.getValue('test_suite'),
                graph.suiteIds[0],
                'partial membership Suite reference'
            )
            requireValue(
                membership.getValue('order'),
                testLabels[membership.getValue('test')] === 'Accessible' ? '1' : '2',
                'partial membership order'
            )
        }
    }

    var criteria = new GlideRecord('user_criteria')
    criteria.setLimit(2)
    criteria.query()
    if (!criteria.next()) {
        fail('an Accessible User Criteria fixture was not found')
    }
    var accessibleCriteriaId = criteria.getUniqueValue()
    if (!criteria.next()) {
        fail('an Inaccessible User Criteria fixture was not found')
    }
    var inaccessibleCriteriaId = criteria.getUniqueValue()

    var specification = new GlideRecord('kb_knowledge')
    specification.initialize()
    specification.setValue('kb_knowledge_base', KB_ID)
    specification.setValue('workflow_state', 'published')
    specification.setValue('short_description', SPECIFICATION_LOG_SENTINEL)
    specification.setValue('text', SPECIFICATION_LOG_SENTINEL)
    specification.setValue('x_gemjp_atf_genera_catalog_item', CATALOG_ITEM_ID)
    specification.setValue('x_gemjp_atf_genera_schema_version', 1)
    specification.setValue('x_gemjp_atf_genera_accessible_criteria', accessibleCriteriaId)
    specification.setValue('x_gemjp_atf_genera_accessible_user', ACCESSIBLE_USER_ID)
    specification.setValue('x_gemjp_atf_genera_inaccessible_criteria', inaccessibleCriteriaId)
    specification.setValue('x_gemjp_atf_genera_inaccessible_user', INACCESSIBLE_USER_ID)
    specificationId = String(specification.insert() || '')
    if (!specificationId) {
        fail('bound Specification fixture could not be inserted')
    }

    var startedAt = new GlideDateTime().getValue()
    var successfulStamp = startedAt
    var accessibleFailureStamp = newRunStamp(startedAt, 1)
    var inaccessibleFailureStamp = newRunStamp(startedAt, 2)
    var firstRequestedBy = REQUESTED_BY + '.success.one'
    var secondRequestedBy = REQUESTED_BY + '.success.two'
    var accessibleFailureRequestedBy = REQUESTED_BY + '.accessible.failure'
    var inaccessibleFailureRequestedBy = REQUESTED_BY + '.inaccessible.failure'

    try {
        var firstDiagnostics = []
        var firstInsertions = []
        var first = new AtfGenerationService(
            integrationSeam('', '', firstDiagnostics, firstInsertions)
        ).generatePermissionRunFromBoundSpecification(runRequest(successfulStamp, firstRequestedBy))
        var firstObservedGraph = graphFromObservedInsertions(firstInsertions)
        var firstGraph = collectPersistedGraph(
            firstObservedGraph.suiteIds,
            firstObservedGraph.testIds
        )

        var secondDiagnostics = []
        var secondInsertions = []
        var second = new AtfGenerationService(
            integrationSeam('', '', secondDiagnostics, secondInsertions)
        ).generatePermissionRunFromBoundSpecification(runRequest(successfulStamp, secondRequestedBy))
        var secondObservedGraph = graphFromObservedInsertions(secondInsertions)
        var secondGraph = collectPersistedGraph(
            secondObservedGraph.suiteIds,
            secondObservedGraph.testIds
        )

        requireDifferent(first.suiteId, second.suiteId, 'same-second Suite sys_ids')
        requireDifferent(first.accessibleTestId, second.accessibleTestId, 'same-second Accessible Test sys_ids')
        requireDifferent(first.inaccessibleTestId, second.inaccessibleTestId, 'same-second Inaccessible Test sys_ids')
        requireValue(
            requireRecord('sys_atf_test_suite', first.suiteId, 'first Suite').getValue('name'),
            requireRecord('sys_atf_test_suite', second.suiteId, 'second Suite').getValue('name'),
            'same-second Suite display-name collision'
        )
        requireValue(
            requireRecord('sys_atf_test', first.accessibleTestId, 'first Accessible Test').getValue('name'),
            requireRecord('sys_atf_test', second.accessibleTestId, 'second Accessible Test').getValue('name'),
            'same-second Accessible display-name collision'
        )
        requireValue(
            requireRecord('sys_atf_test', first.inaccessibleTestId, 'first Inaccessible Test').getValue('name'),
            requireRecord('sys_atf_test', second.inaccessibleTestId, 'second Inaccessible Test').getValue('name'),
            'same-second Inaccessible display-name collision'
        )

        requireGraphCounts(firstGraph, 1, 2, 4, 10, 2, 'first independent run')
        requireGraphCounts(secondGraph, 1, 2, 4, 10, 2, 'second independent run')
        requireIdIn(firstGraph.suiteIds, first.suiteId, 'first returned Suite')
        requireIdIn(firstGraph.testIds, first.accessibleTestId, 'first returned Accessible Test')
        requireIdIn(firstGraph.testIds, first.inaccessibleTestId, 'first returned Inaccessible Test')
        requireIdIn(secondGraph.suiteIds, second.suiteId, 'second returned Suite')
        requireIdIn(secondGraph.testIds, second.accessibleTestId, 'second returned Accessible Test')
        requireIdIn(secondGraph.testIds, second.inaccessibleTestId, 'second returned Inaccessible Test')
        requireInsertionGraphMatchesPersisted(
            firstObservedGraph,
            firstGraph,
            'first successful insertion/persisted graph'
        )
        requireInsertionGraphMatchesPersisted(
            secondObservedGraph,
            secondGraph,
            'second successful insertion/persisted graph'
        )
        requireSameGraph(
            graphFromCreatedDiagnostics(firstDiagnostics, successfulStamp),
            firstGraph,
            'first successful diagnostic/persisted graph'
        )
        requireSameGraph(
            graphFromCreatedDiagnostics(secondDiagnostics, successfulStamp),
            secondGraph,
            'second successful diagnostic/persisted graph'
        )

        var firstTestLabels = {}
        firstTestLabels[first.accessibleTestId] = 'Accessible'
        firstTestLabels[first.inaccessibleTestId] = 'Inaccessible'
        var secondTestLabels = {}
        secondTestLabels[second.accessibleTestId] = 'Accessible'
        secondTestLabels[second.inaccessibleTestId] = 'Inaccessible'

        var firstSuccessfulMessages = ['Generation started']
            .concat(createdArtifactMessages(firstGraph, firstTestLabels))
            .concat([
                'Generation completed: Test Suite ' + first.suiteId +
                    ' contains Accessible Test ' + first.accessibleTestId +
                    ' and Inaccessible Test ' + first.inaccessibleTestId,
            ])
        var secondSuccessfulMessages = ['Generation started']
            .concat(createdArtifactMessages(secondGraph, secondTestLabels))
            .concat([
                'Generation completed: Test Suite ' + second.suiteId +
                    ' contains Accessible Test ' + second.accessibleTestId +
                    ' and Inaccessible Test ' + second.inaccessibleTestId,
            ])
        requireObservedMessages(
            firstDiagnostics,
            successfulStamp,
            firstSuccessfulMessages,
            'first successful run ordered logs'
        )
        requireObservedMessages(
            secondDiagnostics,
            successfulStamp,
            secondSuccessfulMessages,
            'second successful run ordered logs'
        )
        requireExactPersistedMessages(
            collectStampedLogs(successfulStamp, startedAt),
            firstSuccessfulMessages.concat(secondSuccessfulMessages),
            'two successful same-second persisted logs'
        )

        var accessibleFailureSummary = 'Injected Ticket 06 Accessible assembly failure'
        var accessibleFailureDiagnostics = []
        var accessibleFailureInsertions = []
        expectFailure(
            new AtfGenerationService(
                integrationSeam(
                    'Accessible Open a Catalog Item (SP) Test Step',
                    accessibleFailureSummary,
                    accessibleFailureDiagnostics,
                    accessibleFailureInsertions
                )
            ),
            runRequest(accessibleFailureStamp, accessibleFailureRequestedBy),
            accessibleFailureSummary,
            'Accessible assembly failure'
        )
        var accessibleDiagnosticGraph = graphFromCreatedDiagnostics(
            accessibleFailureDiagnostics,
            accessibleFailureStamp
        )
        var accessibleObservedGraph = graphFromObservedInsertions(
            accessibleFailureInsertions
        )
        var accessibleFailureGraph = collectPersistedGraph(
            accessibleObservedGraph.suiteIds,
            accessibleObservedGraph.testIds
        )
        requireInsertionGraphMatchesPersisted(
            accessibleObservedGraph,
            accessibleFailureGraph,
            'Accessible failure insertion/persisted graph'
        )
        requireSameGraph(
            accessibleFailureGraph,
            accessibleDiagnosticGraph,
            'Accessible failure diagnostic/persisted graph'
        )
        requireGraphCounts(accessibleFailureGraph, 1, 1, 1, 1, 0, 'Accessible failure partial graph')
        var accessibleFailureTestId = accessibleFailureGraph.testIds[0]
        var accessibleFailureLabels = {}
        accessibleFailureLabels[accessibleFailureTestId] = 'Accessible'
        requireSuiteGraph(accessibleFailureGraph, accessibleFailureLabels)
        requireTestGraph(accessibleFailureTestId, {
            label: 'Accessible',
            userId: ACCESSIBLE_USER_ID,
            complete: false,
        })
        var accessibleCreated = createdArtifactMessages(
            accessibleFailureGraph,
            accessibleFailureLabels
        )
        var accessibleFailureMessages = ['Generation started']
            .concat(accessibleCreated)
            .concat([
                'Generation failed at Accessible Open a Catalog Item (SP) Test Step: ' +
                    accessibleFailureSummary,
            ])
            .concat(partialArtifactMessages(accessibleCreated))
        requireObservedMessages(
            accessibleFailureDiagnostics,
            accessibleFailureStamp,
            accessibleFailureMessages,
            'Accessible failure ordered logs'
        )
        requireExactPersistedMessages(
            collectStampedLogs(accessibleFailureStamp, startedAt),
            accessibleFailureMessages,
            'Accessible failure persisted logs'
        )

        var inaccessibleFailureSummary = 'Injected Ticket 06 Inaccessible assembly failure'
        var inaccessibleFailureDiagnostics = []
        var inaccessibleFailureInsertions = []
        expectFailure(
            new AtfGenerationService(
                integrationSeam(
                    'Inaccessible Open a Catalog Item (SP) Test Step',
                    inaccessibleFailureSummary,
                    inaccessibleFailureDiagnostics,
                    inaccessibleFailureInsertions
                )
            ),
            runRequest(inaccessibleFailureStamp, inaccessibleFailureRequestedBy),
            inaccessibleFailureSummary,
            'Inaccessible assembly failure'
        )
        var inaccessibleDiagnosticGraph = graphFromCreatedDiagnostics(
            inaccessibleFailureDiagnostics,
            inaccessibleFailureStamp
        )
        var inaccessibleObservedGraph = graphFromObservedInsertions(
            inaccessibleFailureInsertions
        )
        var inaccessibleFailureGraph = collectPersistedGraph(
            inaccessibleObservedGraph.suiteIds,
            inaccessibleObservedGraph.testIds
        )
        requireInsertionGraphMatchesPersisted(
            inaccessibleObservedGraph,
            inaccessibleFailureGraph,
            'Inaccessible failure insertion/persisted graph'
        )
        requireSameGraph(
            inaccessibleFailureGraph,
            inaccessibleDiagnosticGraph,
            'Inaccessible failure diagnostic/persisted graph'
        )
        requireGraphCounts(inaccessibleFailureGraph, 1, 2, 3, 6, 1, 'Inaccessible failure partial graph')
        var retainedMembership = requireRecord(
            'sys_atf_test_suite_test',
            inaccessibleFailureGraph.membershipIds[0],
            'Inaccessible failure retained membership'
        )
        var accessibleTestId = String(retainedMembership.getValue('test'))
        requireIdIn(
            inaccessibleFailureGraph.testIds,
            accessibleTestId,
            'Inaccessible failure completed Accessible Test'
        )
        var inaccessibleTestId = ''
        for (var testIndex = 0; testIndex < inaccessibleFailureGraph.testIds.length; testIndex++) {
            if (inaccessibleFailureGraph.testIds[testIndex] !== accessibleTestId) {
                inaccessibleTestId = inaccessibleFailureGraph.testIds[testIndex]
            }
        }
        if (!inaccessibleTestId) {
            fail('Inaccessible failure did not retain a distinct partial Inaccessible Test')
        }
        requireMembershipPointsTo(
            inaccessibleFailureGraph.membershipIds[0],
            accessibleTestId,
            'Inaccessible failure retained membership'
        )
        var inaccessibleFailureLabels = {}
        inaccessibleFailureLabels[accessibleTestId] = 'Accessible'
        inaccessibleFailureLabels[inaccessibleTestId] = 'Inaccessible'
        requireSuiteGraph(inaccessibleFailureGraph, inaccessibleFailureLabels)
        requireTestGraph(accessibleTestId, {
            label: 'Accessible',
            userId: ACCESSIBLE_USER_ID,
            complete: true,
        })
        requireTestGraph(inaccessibleTestId, {
            label: 'Inaccessible',
            userId: INACCESSIBLE_USER_ID,
            complete: false,
        })
        var inaccessibleCreated = createdArtifactMessages(
            inaccessibleFailureGraph,
            inaccessibleFailureLabels
        )
        var inaccessibleFailureMessages = ['Generation started']
            .concat(inaccessibleCreated)
            .concat([
                'Generation failed at Inaccessible Open a Catalog Item (SP) Test Step: ' +
                    inaccessibleFailureSummary,
            ])
            .concat(partialArtifactMessages(inaccessibleCreated))
        requireObservedMessages(
            inaccessibleFailureDiagnostics,
            inaccessibleFailureStamp,
            inaccessibleFailureMessages,
            'Inaccessible failure ordered logs'
        )
        requireExactPersistedMessages(
            collectStampedLogs(inaccessibleFailureStamp, startedAt),
            inaccessibleFailureMessages,
            'Inaccessible failure persisted logs'
        )

        var forbiddenTables = new GlideRecord('sys_db_object')
        forbiddenTables.addQuery(
            'name',
            'IN',
            'x_gemjp_atf_genera_generation_run,x_gemjp_atf_genera_generation_error'
        )
        forbiddenTables.query()
        requireValue(forbiddenTables.getRowCount(), 0, 'persistent Generation Run/Error table count')
    } finally {
        if (specification.isValidRecord()) {
            specification.deleteRecord()
        }
    }

    stepResult.setOutputMessage(
        'Verified two independent same-second runs and exact Accessible/Inaccessible partial graphs with stamped logs.'
    )
    return true
})(outputs, steps, params, stepResult, assertEqual)

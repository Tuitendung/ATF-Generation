/*
 * THROWAWAY PROTOTYPE ONLY — Ticket 01 Runtime AI Feasibility Gate.
 *
 * This file deliberately has no production generator, parser, ATF writer, or
 * table persistence. The target-instance caller must supply a verified
 * Now Assist invocation adapter; this prototype does not guess that API.
 */
(function (root, factory) {
    var exported = factory()
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = exported
    } else {
        root.Ticket01RuntimeAiFeasibilityHarness = exported
    }
})(this, function () {
    'use strict'

    var RESULT = {
        AGREED: 'AI_INTERPRETATION_AGREED',
        INCONSISTENT: 'AI_INTERPRETATION_INCONSISTENT',
        TECHNICAL_FAILURE: 'AI_INTERPRETATION_TECHNICAL_FAILURE',
        DESIGN_INVALID: 'DESIGN_INVALID',
    }

    var TECHNICAL_FAILURES = {
        timeout: true,
        transport: true,
        unavailable_service: true,
        rate_limit: true,
        malformed_response: true,
        truncated_response: true,
        response_schema: true,
    }

    function fail(message) {
        throw new Error('Ticket 01 harness: ' + message)
    }

    function isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value)
    }

    function canonicalize(value) {
        var keys
        var result
        var index

        if (Array.isArray(value)) {
            result = []
            for (index = 0; index < value.length; index += 1) {
                result.push(canonicalize(value[index]))
            }
            return result
        }
        if (!isObject(value)) {
            return value
        }

        result = {}
        keys = Object.keys(value).sort()
        for (index = 0; index < keys.length; index += 1) {
            result[keys[index]] = canonicalize(value[keys[index]])
        }
        return result
    }

    function canonicalString(value) {
        return JSON.stringify(canonicalize(value))
    }

    function requireKeys(value, required, allowed, path) {
        var keys
        var index

        if (!isObject(value)) {
            fail(path + ' must be an object')
        }
        for (index = 0; index < required.length; index += 1) {
            if (!Object.prototype.hasOwnProperty.call(value, required[index])) {
                fail(path + ' is missing ' + required[index])
            }
        }
        keys = Object.keys(value)
        for (index = 0; index < keys.length; index += 1) {
            if (allowed.indexOf(keys[index]) === -1) {
                fail(path + ' has unsupported property ' + keys[index])
            }
        }
    }

    function requireString(value, path) {
        if (typeof value !== 'string' || value.length === 0) {
            fail(path + ' must be a non-empty string')
        }
    }

    function requireLine(value, path) {
        if (typeof value !== 'number' || value < 1 || Math.floor(value) !== value) {
            fail(path + ' must be a positive physical line')
        }
    }

    function validateCondition(condition, path) {
        requireKeys(condition, ['kind', 'sourceLine'], ['kind', 'sourceLine', 'operator', 'operands', 'variableKey', 'value'], path)
        requireString(condition.kind, path + '.kind')
        requireLine(condition.sourceLine, path + '.sourceLine')
        if (condition.kind === 'all' || condition.kind === 'any') {
            requireString(condition.operator, path + '.operator')
            if ((condition.kind === 'all' && condition.operator !== 'AND') || (condition.kind === 'any' && condition.operator !== 'OR')) {
                fail(path + ' has a mismatched boolean operator')
            }
            if (!Array.isArray(condition.operands) || condition.operands.length < 2) {
                fail(path + '.operands must contain at least two ordered conditions')
            }
            condition.operands.forEach(function (operand, index) {
                validateCondition(operand, path + '.operands[' + index + ']')
            })
            return
        }
        if (condition.kind !== 'comparison') {
            fail(path + '.kind is outside the prototype schema')
        }
        requireString(condition.operator, path + '.operator')
        requireString(condition.variableKey, path + '.variableKey')
        if (!Object.prototype.hasOwnProperty.call(condition, 'value')) {
            fail(path + ' is missing value')
        }
    }

    function validateEffect(effect, path) {
        requireKeys(effect, ['property', 'sourceLine', 'value'], ['property', 'sourceLine', 'value', 'messageScope', 'messageType'], path)
        requireString(effect.property, path + '.property')
        requireLine(effect.sourceLine, path + '.sourceLine')
        if (['VALUE', 'VISIBLE', 'MANDATORY', 'READ_ONLY', 'MESSAGE'].indexOf(effect.property) === -1) {
            fail(path + '.property is outside the capability catalog')
        }
        if (effect.property === 'MESSAGE') {
            if (['FIELD', 'FORM'].indexOf(effect.messageScope) === -1) {
                fail(path + '.messageScope is invalid')
            }
            if (['INFO', 'WARNING', 'ERROR'].indexOf(effect.messageType) === -1) {
                fail(path + '.messageType is invalid')
            }
        } else if (Object.prototype.hasOwnProperty.call(effect, 'messageScope') || Object.prototype.hasOwnProperty.call(effect, 'messageType')) {
            fail(path + ' has message metadata on a non-message effect')
        }
    }

    function validateContract(contract) {
        requireKeys(contract, ['schemaVersion', 'behaviorId', 'target', 'trigger', 'outcomes'], ['schemaVersion', 'behaviorId', 'target', 'trigger', 'outcomes'], 'contract')
        if (contract.schemaVersion !== 'ticket-01-v1') {
            fail('contract.schemaVersion is unsupported')
        }
        requireString(contract.behaviorId, 'contract.behaviorId')
        requireString(contract.target, 'contract.target')
        requireKeys(contract.trigger, ['kind', 'sourceLine'], ['kind', 'sourceLine', 'variableKey'], 'contract.trigger')
        if (['FORM_LOAD', 'VARIABLE_CHANGE'].indexOf(contract.trigger.kind) === -1) {
            fail('contract.trigger.kind is invalid')
        }
        requireLine(contract.trigger.sourceLine, 'contract.trigger.sourceLine')
        if (contract.trigger.kind === 'VARIABLE_CHANGE') {
            requireString(contract.trigger.variableKey, 'contract.trigger.variableKey')
        } else if (Object.prototype.hasOwnProperty.call(contract.trigger, 'variableKey')) {
            fail('FORM_LOAD trigger cannot contain variableKey')
        }
        if (!Array.isArray(contract.outcomes) || contract.outcomes.length === 0) {
            fail('contract.outcomes must be a non-empty ordered array')
        }
        contract.outcomes.forEach(function (outcome, outcomeIndex) {
            var path = 'contract.outcomes[' + outcomeIndex + ']'
            requireKeys(outcome, ['outcomeId', 'sourceLine', 'effects'], ['outcomeId', 'sourceLine', 'condition', 'effects'], path)
            requireString(outcome.outcomeId, path + '.outcomeId')
            requireLine(outcome.sourceLine, path + '.sourceLine')
            if (Object.prototype.hasOwnProperty.call(outcome, 'condition')) {
                validateCondition(outcome.condition, path + '.condition')
            }
            if (!Array.isArray(outcome.effects) || outcome.effects.length === 0) {
                fail(path + '.effects must be a non-empty ordered array')
            }
            outcome.effects.forEach(function (effect, effectIndex) {
                validateEffect(effect, path + '.effects[' + effectIndex + ']')
            })
        })
        return contract
    }

    function validateSkillResponse(rawResponse) {
        var response = rawResponse
        if (typeof response === 'string') {
            try {
                response = JSON.parse(response)
            } catch (error) {
                fail('response is malformed JSON')
            }
        }
        requireKeys(response, ['status'], ['status', 'contract', 'rejection'], 'response')
        if (response.status === 'accepted') {
            if (Object.prototype.hasOwnProperty.call(response, 'rejection')) {
                fail('accepted response contains rejection')
            }
            return { status: 'accepted', contract: validateContract(response.contract) }
        }
        if (response.status === 'rejected') {
            if (Object.prototype.hasOwnProperty.call(response, 'contract')) {
                fail('rejected response contains contract')
            }
            requireKeys(response.rejection, ['code', 'sourceLines'], ['code', 'sourceLines'], 'response.rejection')
            requireString(response.rejection.code, 'response.rejection.code')
            if (!Array.isArray(response.rejection.sourceLines) || response.rejection.sourceLines.length === 0) {
                fail('response.rejection.sourceLines must be non-empty')
            }
            response.rejection.sourceLines.forEach(function (line, index) {
                requireLine(line, 'response.rejection.sourceLines[' + index + ']')
            })
            return response
        }
        fail('response.status must be accepted or rejected')
    }

    function inputEnvelope(fixture, contracts) {
        return {
            variableDesign: fixture.variableDesign,
            businessLogicBlock: fixture.businessLogicBlock,
            capabilityCatalog: contracts.capabilityCatalog,
            outputSchema: contracts.outputSchema,
        }
    }

    function technicalKind(error) {
        var kind = error && error.technicalKind
        if (TECHNICAL_FAILURES[kind]) {
            return kind
        }
        return 'transport'
    }

    function callWithRetry(skill, input, dependencies, evidence) {
        var inputCanonical = canonicalString(input)
        var attempt
        var rawResponse
        var response
        var failureKind

        for (attempt = 1; attempt <= 2; attempt += 1) {
            try {
                rawResponse = dependencies.invokeSkill(skill, input)
                response = validateSkillResponse(rawResponse)
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: dependencies.sha256(inputCanonical),
                    responseHash: dependencies.sha256(canonicalString(response)),
                    state: 'schema_valid',
                })
                return { response: response, attempts: attempt }
            } catch (error) {
                failureKind = error && String(error.message).indexOf('Ticket 01 harness:') === 0 ? 'response_schema' : technicalKind(error)
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: dependencies.sha256(inputCanonical),
                    state: 'technical_failure',
                    technicalKind: failureKind,
                })
            }
        }
        return { technicalFailure: failureKind, attempts: 2 }
    }

    function differencePaths(left, right, path, differences, sha256) {
        var leftKeys
        var rightKeys
        var keys
        var index
        var nextPath

        if (canonicalString(left) === canonicalString(right)) {
            return
        }
        if (Array.isArray(left) && Array.isArray(right)) {
            if (left.length !== right.length) {
                differences.push({ path: path + '.length', leftHash: sha256(String(left.length)), rightHash: sha256(String(right.length)) })
            }
            for (index = 0; index < Math.min(left.length, right.length); index += 1) {
                differencePaths(left[index], right[index], path + '[' + index + ']', differences, sha256)
            }
            return
        }
        if (isObject(left) && isObject(right)) {
            leftKeys = Object.keys(left)
            rightKeys = Object.keys(right)
            keys = leftKeys.concat(rightKeys).filter(function (key, position, all) { return all.indexOf(key) === position }).sort()
            for (index = 0; index < keys.length; index += 1) {
                nextPath = path ? path + '.' + keys[index] : keys[index]
                if (!Object.prototype.hasOwnProperty.call(left, keys[index]) || !Object.prototype.hasOwnProperty.call(right, keys[index])) {
                    differences.push({ path: nextPath, leftHash: sha256(canonicalString(left[keys[index]])), rightHash: sha256(canonicalString(right[keys[index]])) })
                } else {
                    differencePaths(left[keys[index]], right[keys[index]], nextPath, differences, sha256)
                }
            }
            return
        }
        differences.push({
            path: path,
            leftType: left === null ? 'null' : typeof left,
            rightType: right === null ? 'null' : typeof right,
            leftHash: sha256(canonicalString(left)),
            rightHash: sha256(canonicalString(right)),
        })
    }

    function compareResponses(extractor, verifier, fixture, dependencies) {
        var extractorCanonical = canonicalString(extractor)
        var verifierCanonical = canonicalString(verifier)
        var differences = []

        if (extractorCanonical !== verifierCanonical) {
            differencePaths(extractor, verifier, '', differences, dependencies.sha256)
            return { result: RESULT.INCONSISTENT, differences: differences }
        }
        if (fixture.expectedStatus === 'accepted') {
            if (extractor.status !== 'accepted' || canonicalString(extractor.contract) !== canonicalString(fixture.expectedContract)) {
                differencePaths(extractor.status === 'accepted' ? extractor.contract : extractor, fixture.expectedContract, '', differences, dependencies.sha256)
                return { result: RESULT.INCONSISTENT, differences: differences }
            }
            return { result: RESULT.AGREED }
        }
        if (extractor.status !== 'rejected' || extractor.rejection.code !== fixture.expectedRejectionCode) {
            differencePaths(extractor, { status: 'rejected', rejection: { code: fixture.expectedRejectionCode } }, '', differences, dependencies.sha256)
            return { result: RESULT.INCONSISTENT, differences: differences }
        }
        return { result: RESULT.DESIGN_INVALID }
    }

    function runFixture(fixture, contracts, dependencies, runNumber) {
        var evidence = {
            fixtureId: fixture.id,
            run: runNumber,
            promptVersions: contracts.promptVersions,
            outputSchemaVersion: contracts.outputSchemaVersion,
            sourceLocations: fixture.sourceLocations,
            attempts: [],
            artifactCountBefore: dependencies.countAtfArtifacts(),
        }
        var input = inputEnvelope(fixture, contracts)
        var extractor = callWithRetry(contracts.extractorSkill, input, dependencies, evidence)
        var verifier
        var comparison

        evidence.inputHash = dependencies.sha256(canonicalString(input))
        if (extractor.technicalFailure) {
            evidence.result = RESULT.TECHNICAL_FAILURE
            evidence.technicalKind = extractor.technicalFailure
        } else {
            verifier = callWithRetry(contracts.verifierSkill, input, dependencies, evidence)
            if (verifier.technicalFailure) {
                evidence.result = RESULT.TECHNICAL_FAILURE
                evidence.technicalKind = verifier.technicalFailure
            } else {
                comparison = compareResponses(extractor.response, verifier.response, fixture, dependencies)
                evidence.result = comparison.result
                if (comparison.differences) {
                    evidence.differences = comparison.differences
                }
                evidence.extractorCanonicalHash = dependencies.sha256(canonicalString(extractor.response.status === 'accepted' ? extractor.response.contract : extractor.response))
                evidence.verifierCanonicalHash = dependencies.sha256(canonicalString(verifier.response.status === 'accepted' ? verifier.response.contract : verifier.response))
                if (fixture.expectedStatus === 'accepted') {
                    evidence.expectedCanonicalHash = dependencies.sha256(canonicalString(fixture.expectedContract))
                }
            }
        }
        evidence.agreementState = evidence.result === RESULT.AGREED ? 'agreed' : evidence.result === RESULT.DESIGN_INVALID ? 'agreed_rejection' : 'blocked'
        evidence.artifactCountAfter = dependencies.countAtfArtifacts()
        evidence.zeroArtifacts = evidence.artifactCountBefore === evidence.artifactCountAfter
        return evidence
    }

    function runCorpus(fixtures, contracts, dependencies) {
        var evidence = []
        var fixtureIndex
        var run
        if (!dependencies || typeof dependencies.invokeSkill !== 'function' || typeof dependencies.sha256 !== 'function' || typeof dependencies.countAtfArtifacts !== 'function') {
            fail('verified invokeSkill, sha256, and countAtfArtifacts dependencies are required')
        }
        for (fixtureIndex = 0; fixtureIndex < fixtures.length; fixtureIndex += 1) {
            for (run = 1; run <= 10; run += 1) {
                evidence.push(runFixture(fixtures[fixtureIndex], contracts, dependencies, run))
            }
        }
        return evidence
    }

    return {
        RESULT: RESULT,
        canonicalize: canonicalize,
        canonicalString: canonicalString,
        validateSkillResponse: validateSkillResponse,
        differencePaths: differencePaths,
        runFixture: runFixture,
        runCorpus: runCorpus,
    }
})

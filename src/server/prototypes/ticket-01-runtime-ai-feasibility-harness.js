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
        INPUT_INTEGRITY_FAILURE: 'PROTOTYPE_INPUT_INTEGRITY_FAILURE',
        ARTIFACT_BOUNDARY_VIOLATION: 'PROTOTYPE_ARTIFACT_BOUNDARY_VIOLATION',
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

    var REJECTION_CODES = [
        'BEHAVIOR_ANCHOR_INVALID',
        'TARGET_UNKNOWN',
        'TARGET_UNSUPPORTED',
        'TRIGGER_INVALID',
        'TRIGGER_MULTIPLE',
        'TRIGGER_UNKNOWN',
        'TRIGGER_UNSUPPORTED',
        'OUTCOME_ID_INVALID',
        'OUTCOME_ID_DUPLICATE',
        'BRANCH_ORDER_INVALID',
        'TERMINAL_OTHERWISE_MISSING',
        'BRANCH_NESTING_FORBIDDEN',
        'INSTRUCTION_LANGUAGE_UNSUPPORTED',
        'TECHNICAL_IDENTIFIER_REQUIRED',
        'CONDITION_INVALID',
        'CONDITION_REFERENCE_UNKNOWN',
        'CONDITION_TYPE_MISMATCH',
        'BOOLEAN_PARENTHESES_REQUIRED',
        'EFFECT_INVALID',
        'EFFECT_PROPERTY_UNSUPPORTED',
        'EFFECT_TARGET_UNSUPPORTED',
        'EFFECT_VALUE_INVALID',
        'EFFECT_VALUE_TYPE_MISMATCH',
        'EFFECT_DUPLICATE',
        'EFFECT_SET_ASYMMETRIC',
        'MESSAGE_TYPE_INVALID',
        'BEHAVIOR_MESSAGE_TYPE_MULTIPLE',
        'QUOTED_LITERAL_CHANGED',
        'FEATURE_DEPENDENCY_UNSUPPORTED',
        'FEATURE_SCENARIO_UNSUPPORTED',
        'FEATURE_MRVS_BEHAVIOR_UNSUPPORTED',
        'FEATURE_PRESENTATION_UNSUPPORTED',
    ]

    var COMPARISON_OPERATORS = [
        'EQUALS',
        'NOT_EQUALS',
        'GREATER_THAN',
        'GREATER_THAN_OR_EQUALS',
        'LESS_THAN',
        'LESS_THAN_OR_EQUALS',
        'CONTAINS',
        'NOT_CONTAINS',
        'STARTS_WITH',
        'ENDS_WITH',
    ]

    var ORDERING_OPERATORS = [
        'EQUALS',
        'NOT_EQUALS',
        'GREATER_THAN',
        'GREATER_THAN_OR_EQUALS',
        'LESS_THAN',
        'LESS_THAN_OR_EQUALS',
    ]

    var VALUE_SEMANTIC_TYPES = [
        'text',
        'integer',
        'decimal',
        'boolean',
        'choice',
        'reference',
        'reference_set',
        'date',
        'date_time',
    ]

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

    function requireEnum(value, allowed, path) {
        if (allowed.indexOf(value) === -1) {
            fail(path + ' is outside the closed schema')
        }
    }

    function requireDesignKey(value, path) {
        requireString(value, path)
        if (!/^[a-z][a-z0-9_]{0,63}$/.test(value)) {
            fail(path + ' must be a bounded lowercase Design Key')
        }
    }

    function requireScalarValue(value, path) {
        if (typeof value === 'number') {
            if (!isFinite(value)) {
                fail(path + ' must be a finite JSON scalar')
            }
            return
        }
        if (typeof value !== 'string' && typeof value !== 'boolean') {
            fail(path + ' must be a string, number, or boolean')
        }
    }

    function requireInteger(value, minimum, path) {
        if (typeof value !== 'number' || Math.floor(value) !== value || value < minimum) {
            fail(path + ' must be an integer greater than or equal to ' + minimum)
        }
    }

    function requireCanonicalExactNumber(value, integerOnly, path) {
        var unsigned
        var parts
        var digitCount

        if (typeof value !== 'string') {
            fail(path + ' must be a canonical exact-number string')
        }
        if (integerOnly) {
            if (!/^(?:0|-?[1-9][0-9]{0,14})$/.test(value)) {
                fail(path + ' must be a canonical signed integer with at most 15 digits')
            }
            return
        }
        if (!/^(?:0|-?[1-9][0-9]*|-?(?:0|[1-9][0-9]*)\.[0-9]*[1-9])$/.test(value)) {
            fail(path + ' must be a canonical signed decimal without exponent or trailing zeroes')
        }
        unsigned = value.charAt(0) === '-' ? value.slice(1) : value
        parts = unsigned.split('.')
        digitCount = parts[0].length + (parts[1] ? parts[1].length : 0)
        if (digitCount > 15 || (parts[1] && parts[1].length > 6)) {
            fail(path + ' exceeds the 15-digit or 6-fractional-digit exact-decimal bound')
        }
    }

    function requireIsoDate(value, path) {
        var match
        var year
        var month
        var day
        var daysInMonth

        requireString(value, path)
        match = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.exec(value)
        if (!match) {
            fail(path + ' must be an ISO date YYYY-MM-DD')
        }
        year = Number(match[1])
        month = Number(match[2])
        day = Number(match[3])
        daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (day > daysInMonth[month - 1]) {
            fail(path + ' must be a real calendar date')
        }
    }

    function requireIsoDateTime(value, path) {
        var match

        requireString(value, path)
        match = /^(\d{4}-\d{2}-\d{2})T([01]\d|2[0-3]):[0-5]\d:[0-5]\dZ$/.exec(value)
        if (!match) {
            fail(path + ' must be an ISO UTC date-time YYYY-MM-DDTHH:mm:ssZ')
        }
        requireIsoDate(match[1], path)
    }

    function validateTypedValueExpression(expression, path, allowDivision) {
        var leftType
        var rightType
        var operandType

        if (!isObject(expression)) {
            fail(path + ' must be a discriminated Typed Value Expression')
        }

        if (expression.kind === 'literal') {
            requireKeys(expression, ['kind', 'semanticType', 'value'], ['kind', 'semanticType', 'value'], path)
            requireEnum(expression.semanticType, ['text', 'integer', 'decimal', 'boolean', 'choice', 'date', 'date_time'], path + '.semanticType')
            if (expression.semanticType === 'integer') {
                requireCanonicalExactNumber(expression.value, true, path + '.value')
            } else if (expression.semanticType === 'decimal') {
                requireCanonicalExactNumber(expression.value, false, path + '.value')
            } else if (expression.semanticType === 'boolean') {
                if (typeof expression.value !== 'boolean') {
                    fail(path + '.value must be boolean for a boolean literal')
                }
            } else if (expression.semanticType === 'date') {
                requireIsoDate(expression.value, path + '.value')
            } else if (expression.semanticType === 'date_time') {
                requireIsoDateTime(expression.value, path + '.value')
            } else {
                requireString(expression.value, path + '.value')
            }
            return expression.semanticType
        }

        if (expression.kind === 'directive') {
            requireKeys(expression, ['kind', 'directive'], ['kind', 'directive'], path)
            requireEnum(expression.directive, ['BASELINE', 'KEEP', 'EMPTY'], path + '.directive')
            return null
        }

        if (expression.kind === 'variable') {
            requireKeys(expression, ['kind', 'semanticType', 'variableKey'], ['kind', 'semanticType', 'variableKey'], path)
            requireEnum(expression.semanticType, VALUE_SEMANTIC_TYPES, path + '.semanticType')
            requireDesignKey(expression.variableKey, path + '.variableKey')
            return expression.semanticType
        }

        if (expression.kind === 'arithmetic') {
            requireKeys(expression, ['kind', 'semanticType', 'operator', 'left', 'right'], ['kind', 'semanticType', 'operator', 'left', 'right'], path)
            requireEnum(expression.semanticType, ['integer', 'decimal'], path + '.semanticType')
            requireEnum(expression.operator, ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'], path + '.operator')
            if (expression.operator === 'DIVIDE' && !allowDivision) {
                fail(path + '.operator DIVIDE requires an enclosing ROUND expression')
            }
            leftType = validateTypedValueExpression(expression.left, path + '.left', allowDivision)
            rightType = validateTypedValueExpression(expression.right, path + '.right', allowDivision)
            if (['integer', 'decimal'].indexOf(leftType) === -1 || ['integer', 'decimal'].indexOf(rightType) === -1) {
                fail(path + ' arithmetic operands must be typed integer or decimal expressions')
            }
            return expression.semanticType
        }

        if (expression.kind === 'round') {
            requireKeys(expression, ['kind', 'semanticType', 'operand', 'scale', 'mode'], ['kind', 'semanticType', 'operand', 'scale', 'mode'], path)
            requireEnum(expression.semanticType, ['integer', 'decimal'], path + '.semanticType')
            requireInteger(expression.scale, 0, path + '.scale')
            if (expression.scale > 6) {
                fail(path + '.scale must be at most 6')
            }
            if (expression.mode !== 'HALF_AWAY_FROM_ZERO') {
                fail(path + '.mode must be HALF_AWAY_FROM_ZERO')
            }
            operandType = validateTypedValueExpression(expression.operand, path + '.operand', true)
            if (['integer', 'decimal'].indexOf(operandType) === -1) {
                fail(path + '.operand must be a typed integer or decimal expression')
            }
            return expression.semanticType
        }

        if (expression.kind === 'concat') {
            requireKeys(expression, ['kind', 'semanticType', 'operands'], ['kind', 'semanticType', 'operands'], path)
            if (expression.semanticType !== 'text') {
                fail(path + '.semanticType must be text for CONCAT')
            }
            if (!Array.isArray(expression.operands) || expression.operands.length < 2) {
                fail(path + '.operands must contain at least two ordered text expressions')
            }
            expression.operands.forEach(function (operand, index) {
                if (validateTypedValueExpression(operand, path + '.operands[' + index + ']', false) !== 'text') {
                    fail(path + '.operands[' + index + '] must be a typed text expression')
                }
            })
            return 'text'
        }

        fail(path + '.kind is outside the closed Typed Value Expression schema')
    }

    function validateCondition(condition, path) {
        if (condition.kind === 'all' || condition.kind === 'any') {
            requireKeys(condition, ['kind', 'operator', 'sourceLine', 'operands'], ['kind', 'operator', 'sourceLine', 'operands'], path)
            if ((condition.kind === 'all' && condition.operator !== 'AND') || (condition.kind === 'any' && condition.operator !== 'OR')) {
                fail(path + ' has a mismatched boolean operator')
            }
            requireLine(condition.sourceLine, path + '.sourceLine')
            if (!Array.isArray(condition.operands) || condition.operands.length < 2) {
                fail(path + '.operands must contain at least two ordered conditions')
            }
            condition.operands.forEach(function (operand, index) {
                validateCondition(operand, path + '.operands[' + index + ']')
            })
            return
        }

        if (condition.kind === 'comparison') {
            requireKeys(condition, ['kind', 'operator', 'variableKey', 'value', 'sourceLine'], ['kind', 'operator', 'variableKey', 'value', 'sourceLine'], path)
            requireEnum(condition.operator, COMPARISON_OPERATORS, path + '.operator')
            requireDesignKey(condition.variableKey, path + '.variableKey')
            requireScalarValue(condition.value, path + '.value')
            requireLine(condition.sourceLine, path + '.sourceLine')
            return
        }

        if (condition.kind === 'emptiness') {
            requireKeys(condition, ['kind', 'operator', 'variableKey', 'sourceLine'], ['kind', 'operator', 'variableKey', 'sourceLine'], path)
            requireEnum(condition.operator, ['IS_EMPTY', 'IS_NOT_EMPTY'], path + '.operator')
            requireDesignKey(condition.variableKey, path + '.variableKey')
            requireLine(condition.sourceLine, path + '.sourceLine')
            return
        }

        if (condition.kind === 'membership') {
            requireKeys(condition, ['kind', 'operator', 'variableKey', 'values', 'sourceLine'], ['kind', 'operator', 'variableKey', 'values', 'sourceLine'], path)
            requireEnum(condition.operator, ['IN', 'NOT_IN'], path + '.operator')
            requireDesignKey(condition.variableKey, path + '.variableKey')
            if (!Array.isArray(condition.values) || condition.values.length === 0) {
                fail(path + '.values must be a non-empty array')
            }
            condition.values.forEach(function (value, index) {
                requireScalarValue(value, path + '.values[' + index + ']')
            })
            requireLine(condition.sourceLine, path + '.sourceLine')
            return
        }

        if (condition.kind === 'range') {
            requireKeys(condition, ['kind', 'operator', 'variableKey', 'lower', 'upper', 'sourceLine'], ['kind', 'operator', 'variableKey', 'lower', 'upper', 'sourceLine'], path)
            if (condition.operator !== 'BETWEEN') {
                fail(path + '.operator must be BETWEEN')
            }
            requireDesignKey(condition.variableKey, path + '.variableKey')
            requireScalarValue(condition.lower, path + '.lower')
            requireScalarValue(condition.upper, path + '.upper')
            requireLine(condition.sourceLine, path + '.sourceLine')
            return
        }

        if (condition.kind === 'transition') {
            requireKeys(condition, ['kind', 'operator', 'variableKey', 'from', 'to', 'sourceLine'], ['kind', 'operator', 'variableKey', 'from', 'to', 'sourceLine'], path)
            if (condition.operator !== 'TRANSITIONS_FROM_TO') {
                fail(path + '.operator must be TRANSITIONS_FROM_TO')
            }
            requireDesignKey(condition.variableKey, path + '.variableKey')
            requireScalarValue(condition.from, path + '.from')
            requireScalarValue(condition.to, path + '.to')
            requireLine(condition.sourceLine, path + '.sourceLine')
            return
        }

        if (condition.kind === 'row_count') {
            requireKeys(condition, ['kind', 'operator', 'mrvsKey', 'value', 'sourceLine'], ['kind', 'operator', 'mrvsKey', 'value', 'sourceLine'], path)
            requireEnum(condition.operator, ORDERING_OPERATORS, path + '.operator')
            requireDesignKey(condition.mrvsKey, path + '.mrvsKey')
            requireInteger(condition.value, 0, path + '.value')
            requireLine(condition.sourceLine, path + '.sourceLine')
            return
        }

        fail(path + '.kind is outside the closed condition schema')
    }

    function validateEffect(effect, path) {
        if (effect.property === 'MESSAGE') {
            requireKeys(effect, ['property', 'value', 'messageScope', 'messageType', 'sourceLine'], ['property', 'value', 'messageScope', 'messageType', 'sourceLine'], path)
            requireString(effect.value, path + '.value')
            requireEnum(effect.messageScope, ['FIELD', 'FORM'], path + '.messageScope')
            requireEnum(effect.messageType, ['INFO', 'WARNING', 'ERROR'], path + '.messageType')
            requireLine(effect.sourceLine, path + '.sourceLine')
            return
        }

        if (effect.property === 'VALUE') {
            requireKeys(effect, ['property', 'value', 'sourceLine'], ['property', 'value', 'sourceLine'], path)
            validateTypedValueExpression(effect.value, path + '.value')
            requireLine(effect.sourceLine, path + '.sourceLine')
            return
        }

        if (['VISIBLE', 'MANDATORY', 'READ_ONLY'].indexOf(effect.property) >= 0) {
            requireKeys(effect, ['property', 'value', 'sourceLine'], ['property', 'value', 'sourceLine'], path)
            if (typeof effect.value !== 'boolean' && effect.value !== 'BASELINE' && effect.value !== 'KEEP') {
                fail(path + '.value must be boolean, BASELINE, or KEEP')
            }
            requireLine(effect.sourceLine, path + '.sourceLine')
            return
        }

        fail(path + '.property is outside the capability catalog')
    }

    function validateContract(contract) {
        requireKeys(contract, ['schemaVersion', 'behaviorId', 'target', 'trigger', 'outcomes'], ['schemaVersion', 'behaviorId', 'target', 'trigger', 'outcomes'], 'contract')
        if (contract.schemaVersion !== 'ticket-01-v2') {
            fail('contract.schemaVersion is unsupported')
        }
        requireDesignKey(contract.behaviorId, 'contract.behaviorId')
        if (contract.target !== 'CATALOG_FORM') {
            requireDesignKey(contract.target, 'contract.target')
        }
        if (contract.trigger.kind === 'VARIABLE_CHANGE') {
            requireKeys(contract.trigger, ['kind', 'variableKey', 'sourceLine'], ['kind', 'variableKey', 'sourceLine'], 'contract.trigger')
            requireDesignKey(contract.trigger.variableKey, 'contract.trigger.variableKey')
            requireLine(contract.trigger.sourceLine, 'contract.trigger.sourceLine')
        } else if (contract.trigger.kind === 'FORM_LOAD') {
            requireKeys(contract.trigger, ['kind', 'sourceLine'], ['kind', 'sourceLine'], 'contract.trigger')
            requireLine(contract.trigger.sourceLine, 'contract.trigger.sourceLine')
        } else {
            fail('contract.trigger.kind is invalid')
        }
        if (!Array.isArray(contract.outcomes) || contract.outcomes.length === 0) {
            fail('contract.outcomes must be a non-empty ordered array')
        }
        contract.outcomes.forEach(function (outcome, outcomeIndex) {
            var path = 'contract.outcomes[' + outcomeIndex + ']'
            requireKeys(outcome, ['outcomeId', 'sourceLine', 'effects'], ['outcomeId', 'sourceLine', 'condition', 'effects'], path)
            requireDesignKey(outcome.outcomeId, path + '.outcomeId')
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
            requireEnum(response.rejection.code, REJECTION_CODES, 'response.rejection.code')
            if (!Array.isArray(response.rejection.sourceLines) || response.rejection.sourceLines.length === 0) {
                fail('response.rejection.sourceLines must be non-empty')
            }
            response.rejection.sourceLines.forEach(function (line, index) {
                requireLine(line, 'response.rejection.sourceLines[' + index + ']')
                if (response.rejection.sourceLines.indexOf(line) !== index) {
                    fail('response.rejection.sourceLines must be unique')
                }
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

    function callWithRetry(skill, inputCanonical, expectedInputHash, dependencies, evidence) {
        var attempt
        var attemptInput
        var actualInputHash
        var postInvocationInputHash
        var rawResponse
        var response
        var failureKind
        var invocationError

        for (attempt = 1; attempt <= 2; attempt += 1) {
            attemptInput = JSON.parse(inputCanonical)
            actualInputHash = dependencies.sha256(canonicalString(attemptInput))
            if (actualInputHash !== expectedInputHash) {
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: actualInputHash,
                    expectedInputHash: expectedInputHash,
                    state: 'input_integrity_failure',
                })
                return { inputIntegrityFailure: true, attempts: attempt }
            }

            invocationError = null
            try {
                rawResponse = dependencies.invokeSkill(skill, attemptInput)
            } catch (error) {
                invocationError = error
            }

            try {
                postInvocationInputHash = dependencies.sha256(canonicalString(attemptInput))
            } catch (error) {
                postInvocationInputHash = dependencies.sha256('[unserializable invocation input]')
            }
            if (postInvocationInputHash !== expectedInputHash) {
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: actualInputHash,
                    postInvocationInputHash: postInvocationInputHash,
                    expectedInputHash: expectedInputHash,
                    state: 'input_integrity_failure',
                })
                return { inputIntegrityFailure: true, attempts: attempt }
            }

            if (invocationError) {
                failureKind = technicalKind(invocationError)
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: actualInputHash,
                    postInvocationInputHash: postInvocationInputHash,
                    state: 'technical_failure',
                    technicalKind: failureKind,
                })
                continue
            }

            try {
                response = validateSkillResponse(rawResponse)
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: actualInputHash,
                    postInvocationInputHash: postInvocationInputHash,
                    responseHash: dependencies.sha256(canonicalString(response)),
                    state: 'schema_valid',
                })
                return { response: response, attempts: attempt }
            } catch (error) {
                failureKind = 'response_schema'
                evidence.attempts.push({
                    skill: skill,
                    attempt: attempt,
                    inputHash: actualInputHash,
                    postInvocationInputHash: postInvocationInputHash,
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
        var expectedRejection
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
        expectedRejection = {
            status: 'rejected',
            rejection: {
                code: fixture.expectedRejectionCode,
                sourceLines: fixture.sourceLocations,
            },
        }
        if (canonicalString(extractor) !== canonicalString(expectedRejection)) {
            differencePaths(extractor, expectedRejection, '', differences, dependencies.sha256)
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
        var inputCanonical = canonicalString(inputEnvelope(fixture, contracts))
        var expectedInputHash = dependencies.sha256(inputCanonical)
        var extractor
        var verifier
        var comparison

        evidence.inputHash = expectedInputHash
        extractor = callWithRetry(contracts.extractorSkill, inputCanonical, expectedInputHash, dependencies, evidence)
        if (extractor.inputIntegrityFailure) {
            evidence.result = RESULT.INPUT_INTEGRITY_FAILURE
        } else if (extractor.technicalFailure) {
            evidence.result = RESULT.TECHNICAL_FAILURE
            evidence.technicalKind = extractor.technicalFailure
        } else {
            verifier = callWithRetry(contracts.verifierSkill, inputCanonical, expectedInputHash, dependencies, evidence)
            if (verifier.inputIntegrityFailure) {
                evidence.result = RESULT.INPUT_INTEGRITY_FAILURE
            } else if (verifier.technicalFailure) {
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
                } else {
                    evidence.expectedCanonicalHash = dependencies.sha256(canonicalString({
                        status: 'rejected',
                        rejection: {
                            code: fixture.expectedRejectionCode,
                            sourceLines: fixture.sourceLocations,
                        },
                    }))
                }
            }
        }
        evidence.artifactCountAfter = dependencies.countAtfArtifacts()
        evidence.zeroArtifacts = evidence.artifactCountBefore === evidence.artifactCountAfter
        if (!evidence.zeroArtifacts) {
            evidence.result = RESULT.ARTIFACT_BOUNDARY_VIOLATION
        }
        evidence.agreementState = evidence.result === RESULT.AGREED ? 'agreed' : evidence.result === RESULT.DESIGN_INVALID ? 'agreed_rejection' : 'blocked'
        return evidence
    }

    function addGateFailure(failures, code, fixtureId, run) {
        failures.push({
            code: code,
            fixtureId: fixtureId,
            run: run,
        })
    }

    function evaluateCorpusEvidence(fixtures, evidence, expectedRunsPerFixture) {
        var failures = []
        var expectedFixtureIds = {}
        var fixtureIndex
        var evidenceIndex
        var run
        var fixture
        var entry
        var matches
        var expectedResult
        var attemptIndex

        if (!Array.isArray(evidence)) {
            fail('corpus evidence must be an array')
        }
        if (typeof expectedRunsPerFixture !== 'number' || expectedRunsPerFixture < 1 || Math.floor(expectedRunsPerFixture) !== expectedRunsPerFixture) {
            fail('expectedRunsPerFixture must be a positive integer')
        }

        for (fixtureIndex = 0; fixtureIndex < fixtures.length; fixtureIndex += 1) {
            expectedFixtureIds[fixtures[fixtureIndex].id] = true
        }

        for (evidenceIndex = 0; evidenceIndex < evidence.length; evidenceIndex += 1) {
            entry = evidence[evidenceIndex]
            if (!entry || !expectedFixtureIds[entry.fixtureId] || typeof entry.run !== 'number' || entry.run < 1 || entry.run > expectedRunsPerFixture) {
                addGateFailure(failures, 'RUN_UNEXPECTED', entry && entry.fixtureId ? entry.fixtureId : 'unknown', entry && entry.run ? entry.run : 0)
            }
        }

        for (fixtureIndex = 0; fixtureIndex < fixtures.length; fixtureIndex += 1) {
            fixture = fixtures[fixtureIndex]
            for (run = 1; run <= expectedRunsPerFixture; run += 1) {
                matches = []
                for (evidenceIndex = 0; evidenceIndex < evidence.length; evidenceIndex += 1) {
                    if (evidence[evidenceIndex].fixtureId === fixture.id && evidence[evidenceIndex].run === run) {
                        matches.push(evidence[evidenceIndex])
                    }
                }

                if (matches.length === 0) {
                    addGateFailure(failures, 'RUN_MISSING', fixture.id, run)
                    continue
                }
                if (matches.length > 1) {
                    addGateFailure(failures, 'RUN_DUPLICATE', fixture.id, run)
                    continue
                }

                entry = matches[0]
                expectedResult = fixture.expectedStatus === 'accepted' ? RESULT.AGREED : RESULT.DESIGN_INVALID
                if (entry.result !== expectedResult) {
                    addGateFailure(failures, 'FIXTURE_RESULT_MISMATCH', fixture.id, run)
                }
                if (entry.zeroArtifacts !== true) {
                    addGateFailure(failures, 'ARTIFACT_BOUNDARY_VIOLATION', fixture.id, run)
                }
                if (typeof entry.inputHash !== 'string' || entry.inputHash.length === 0 || !Array.isArray(entry.attempts) || entry.attempts.length < 2) {
                    addGateFailure(failures, 'ATTEMPT_EVIDENCE_INCOMPLETE', fixture.id, run)
                } else {
                    for (attemptIndex = 0; attemptIndex < entry.attempts.length; attemptIndex += 1) {
                        if (entry.attempts[attemptIndex].inputHash !== entry.inputHash || entry.attempts[attemptIndex].postInvocationInputHash !== entry.inputHash) {
                            addGateFailure(failures, 'INPUT_HASH_MISMATCH', fixture.id, run)
                            break
                        }
                    }
                }
                if (
                    typeof entry.expectedCanonicalHash !== 'string' ||
                    entry.extractorCanonicalHash !== entry.expectedCanonicalHash ||
                    entry.verifierCanonicalHash !== entry.expectedCanonicalHash
                ) {
                    addGateFailure(failures, 'EXPECTED_CANONICAL_HASH_MISMATCH', fixture.id, run)
                }
            }
        }

        return {
            verdict: failures.length === 0 ? 'PASS' : 'FAIL',
            expectedRunsPerFixture: expectedRunsPerFixture,
            failures: failures,
            evidence: evidence,
        }
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
        return evaluateCorpusEvidence(fixtures, evidence, 10)
    }

    return {
        RESULT: RESULT,
        canonicalize: canonicalize,
        canonicalString: canonicalString,
        validateSkillResponse: validateSkillResponse,
        differencePaths: differencePaths,
        runFixture: runFixture,
        runCorpus: runCorpus,
        evaluateCorpusEvidence: evaluateCorpusEvidence,
    }
})

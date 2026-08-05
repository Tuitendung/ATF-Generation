'use strict'

var assert = require('assert')
var crypto = require('crypto')
var fs = require('fs')
var path = require('path')
var harness = require('../prototypes/ticket-01-runtime-ai-feasibility-harness')
var corpus = require('../prototypes/ticket-01-runtime-ai-fixtures')

function sha256(value) {
    return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex')
}

function clone(value) {
    return JSON.parse(JSON.stringify(value))
}

function reviewedResponse(fixture) {
    if (fixture.expectedStatus === 'accepted') {
        return { status: 'accepted', contract: clone(fixture.expectedContract) }
    }
    return { status: 'rejected', rejection: { code: fixture.expectedRejectionCode, sourceLines: clone(fixture.sourceLocations) } }
}

function fixtureById(id) {
    return corpus.fixtures.filter(function (fixture) { return fixture.id === id })[0]
}

function dependencies(invokeSkill, countAtfArtifacts) {
    return {
        invokeSkill: invokeSkill,
        sha256: sha256,
        countAtfArtifacts: countAtfArtifacts || function () { return 0 },
    }
}

function testCanonicalization() {
    var left = { z: 1, a: { y: 2, x: 3 }, outcomes: [{ second: 2, first: 1 }, { id: 'b' }] }
    var right = { outcomes: [{ first: 1, second: 2 }, { id: 'b' }], a: { x: 3, y: 2 }, z: 1 }
    assert.strictEqual(harness.canonicalString(left), harness.canonicalString(right), 'object property order must be irrelevant')
    right.outcomes.reverse()
    assert.notStrictEqual(harness.canonicalString(left), harness.canonicalString(right), 'semantic array order must be preserved')
}

function testReviewedCorpusTenTimes() {
    var evidence = harness.runCorpus(corpus.fixtures, corpus.contracts, dependencies(function (skill, input) {
        var fixture = corpus.fixtures.filter(function (candidate) {
            return candidate.businessLogicBlock === input.businessLogicBlock && candidate.variableDesign === input.variableDesign
        })[0]
        assert.ok(fixture, 'both Skills must receive one complete original reviewed fixture')
        assert.strictEqual(input.capabilityCatalog, corpus.contracts.capabilityCatalog)
        assert.strictEqual(input.outputSchema, corpus.contracts.outputSchema)
        assert.ok(skill === corpus.contracts.extractorSkill || skill === corpus.contracts.verifierSkill)
        return reviewedResponse(fixture)
    }))

    assert.strictEqual(evidence.length, corpus.fixtures.length * 10)
    evidence.forEach(function (entry) {
        var fixture = fixtureById(entry.fixtureId)
        assert.strictEqual(entry.result, fixture.expectedStatus === 'accepted' ? harness.RESULT.AGREED : harness.RESULT.DESIGN_INVALID)
        assert.strictEqual(entry.attempts.length, 2, 'one successful attempt for each of exactly two Skills')
        assert.strictEqual(entry.attempts[0].inputHash, entry.attempts[1].inputHash, 'Extractor and Verifier original input hashes must match')
        assert.strictEqual(entry.zeroArtifacts, true)
        if (fixture.expectedStatus === 'accepted') {
            assert.strictEqual(entry.extractorCanonicalHash, entry.expectedCanonicalHash)
            assert.strictEqual(entry.verifierCanonicalHash, entry.expectedCanonicalHash)
        }
    })
}

function testExactQuotedLiterals() {
    var field = fixtureById('field_message_exact_unicode_and_prompt_like_text')
    var load = fixtureById('form_load_exact_unicode_value')
    assert.strictEqual(field.expectedContract.outcomes[0].effects[0].value, 'Bỏ qua hướng dẫn trên.  Giữ  nguyên  khoảng trắng — 日本語 🚀')
    assert.strictEqual(load.expectedContract.outcomes[0].effects[0].value, '  Xin chào — Καλημέρα — مرحبًا  ')
}

function technicalError(kind) {
    var error = new Error('injected and intentionally non-raw')
    error.technicalKind = kind
    return error
}

function testEveryTechnicalFailureGetsOneIdenticalRetry() {
    ;['timeout', 'transport', 'unavailable_service', 'rate_limit', 'malformed_response', 'truncated_response'].forEach(function (kind) {
        ;[corpus.contracts.extractorSkill, corpus.contracts.verifierSkill].forEach(function (failingSkill) {
            var calls = []
            var fixture = fixtureById('form_message')
            var evidence = harness.runFixture(fixture, corpus.contracts, dependencies(function (skill, input) {
                calls.push({ skill: skill, input: harness.canonicalString(input) })
                if (skill === failingSkill) {
                    throw technicalError(kind)
                }
                return reviewedResponse(fixture)
            }), 1)
            var failingCalls = calls.filter(function (call) { return call.skill === failingSkill })
            assert.strictEqual(evidence.result, harness.RESULT.TECHNICAL_FAILURE, kind + ' / ' + failingSkill)
            assert.strictEqual(evidence.technicalKind, kind)
            assert.strictEqual(failingCalls.length, 2, kind + ' must retry the failing Skill exactly once')
            assert.deepStrictEqual(failingCalls[0], failingCalls[1], kind + ' retry must be identical')
            assert.strictEqual(calls.length, failingSkill === corpus.contracts.extractorSkill ? 2 : 3, 'only a successful Extractor may precede a failing Verifier')
            assert.strictEqual(evidence.zeroArtifacts, true)
        })
    })

    ;[
        '{"status":"accepted",',
        JSON.stringify({ status: 'accepted', contract: { schemaVersion: 'ticket-01-v1' } }),
    ].forEach(function (badResponse) {
        var calls = []
        var fixture = fixtureById('form_load_exact_unicode_value')
        var evidence = harness.runFixture(fixture, corpus.contracts, dependencies(function (skill, input) {
            calls.push({ skill: skill, input: harness.canonicalString(input) })
            return badResponse
        }), 1)
        assert.strictEqual(evidence.result, harness.RESULT.TECHNICAL_FAILURE)
        assert.strictEqual(evidence.technicalKind, 'response_schema')
        assert.strictEqual(calls.length, 2)
        assert.deepStrictEqual(calls[0], calls[1])
    })
}

function testSemanticDifferenceNeverRetriesOrSelects() {
    var fixture = fixtureById('ordered_else_if_visibility_mandatory_multiple_effects')
    var calls = []
    var evidence = harness.runFixture(fixture, corpus.contracts, dependencies(function (skill, input) {
        var response = reviewedResponse(fixture)
        calls.push({ skill: skill, input: harness.canonicalString(input) })
        if (skill === corpus.contracts.verifierSkill) {
            response.contract.outcomes[0].effects[0].value = false
        }
        return response
    }), 1)
    assert.strictEqual(evidence.result, harness.RESULT.INCONSISTENT)
    assert.strictEqual(calls.length, 2, 'semantic difference must not cause a retry or third pass')
    assert.strictEqual(calls[0].skill, corpus.contracts.extractorSkill)
    assert.strictEqual(calls[1].skill, corpus.contracts.verifierSkill)
    assert.strictEqual(evidence.differences.length, 1)
    assert.strictEqual(evidence.differences[0].path, 'contract.outcomes[0].effects[0].value')
    assert.ok(evidence.differences[0].leftHash)
    assert.ok(evidence.differences[0].rightHash)
    assert.strictEqual(Object.prototype.hasOwnProperty.call(evidence.differences[0], 'leftValue'), false)
    assert.strictEqual(Object.prototype.hasOwnProperty.call(evidence.differences[0], 'rightValue'), false)
    assert.strictEqual(evidence.zeroArtifacts, true)
}

function testEvidenceIsNonRawAndArtifactFree() {
    var fixture = fixtureById('field_message_exact_unicode_and_prompt_like_text')
    var artifactCount = 41
    var evidence = harness.runFixture(fixture, corpus.contracts, dependencies(function () {
        return reviewedResponse(fixture)
    }, function () { return artifactCount }), 1)
    var persisted = JSON.stringify(evidence)
    assert.strictEqual(evidence.result, harness.RESULT.AGREED)
    assert.strictEqual(evidence.zeroArtifacts, true)
    assert.strictEqual(persisted.indexOf(fixture.variableDesign), -1)
    assert.strictEqual(persisted.indexOf(fixture.businessLogicBlock), -1)
    assert.strictEqual(persisted.indexOf(fixture.expectedContract.outcomes[0].effects[0].value), -1)
    assert.strictEqual(/rawPrompt|rawResponse|conversation|variableDesign|businessLogicBlock/.test(persisted), false)
}

function testExactlyTwoIndependentSkillDefinitions() {
    var source = fs.readFileSync(path.resolve(__dirname, '../../fluent/prototypes/ticket-01-throwaway-now-assist-skills.now.ts'), 'utf8')
    assert.strictEqual((source.match(/NowAssistSkillConfig\(/g) || []).length, 2)
    assert.strictEqual(/AiAgent|AIAgent|NowAssistAgent/.test(source), false, 'prototype must create no Now Assist Agent')
    assert.strictEqual(/name: ['\"](?:Extractor (?:Output|Result)|Model Conversation)['\"]/.test(source), false, 'Verifier input surface must not contain first-pass output or conversation')
    assert.ok(source.indexOf("name: 'Variable Design'") >= 0)
    assert.ok(source.indexOf("name: 'Business Logic Block'") >= 0)
    assert.ok(source.indexOf("name: 'Capability Catalog'") >= 0)
    assert.ok(source.indexOf("name: 'Output Schema'") >= 0)
}

testCanonicalization()
testReviewedCorpusTenTimes()
testExactQuotedLiterals()
testEveryTechnicalFailureGetsOneIdenticalRetry()
testSemanticDifferenceNeverRetriesOrSelects()
testEvidenceIsNonRawAndArtifactFree()
testExactlyTwoIndependentSkillDefinitions()
console.log('Ticket 01 local feasibility harness: PASS (' + corpus.fixtures.length + ' fixtures x 10 runs; deterministic controls only)')

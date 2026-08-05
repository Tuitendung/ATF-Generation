import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['ticket_05_fail_fast_acceptance'],
        name: 'Ticket 05 - generation boundaries fail fast without ATF artifacts',
        description:
            'Exercises UI Action authorization, Specification cardinality and compatibility, bound-worker compatibility, and exact-cardinality OOB metadata preflight through the public seams. Run only on an isolated demo instance because the worker step temporarily changes and restores OOB ATF metadata.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_05_ui_action_preflight_boundaries'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-05-ui-action-preflight.js'),
        })
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_05_worker_preflight_boundaries'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-05-worker-preflight.js'),
        })
    }
)

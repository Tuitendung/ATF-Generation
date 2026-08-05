import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['ticket_06_independent_partial_runs_acceptance'],
        name: 'Ticket 06 - independent and partial Generation Runs are diagnosable',
        description:
            'Exercises two successful same-second bound Generation Runs plus induced Accessible and Inaccessible assembly failures through the public generation-service seam. Asserts exact append-only persisted graphs and the complete stamped logging contract without executing generated Tests.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_06_independent_partial_runs_graph_and_logs'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-06-independent-partial-runs.js'),
        })
    }
)

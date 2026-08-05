import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['ticket_04_permission_generation_acceptance'],
        name: 'Ticket 04 - bound run creates complete Accessible and Inaccessible graphs',
        description:
            'Integration coverage at the generation-service seam for one stamped Suite, two complete permission Tests, four ordered OOB steps, exact structured Specification inputs, two memberships, native ATF status, and no automatic execution.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_04_permission_generation_graph'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-04-permission-generation.js'),
        })
    }
)

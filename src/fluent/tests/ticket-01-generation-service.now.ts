import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['ticket_01_generation_service_integration'],
        name: 'Ticket 01 - generation service creates the minimal Accessible Test graph',
        description:
            'Executable integration coverage for the Ticket 01 generation-service seam. Run manually; it does not execute the generated Accessible Test.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_01_generation_service_integration_script'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-01-generation-service.js'),
        })
    }
)

import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['v2_ticket_03_profile_preflight'],
        name: '[ATF Gen v2 prototype] Ticket 03 - Behavior Execution Profile preflight',
        description:
            'Throwaway target-release preflight. Resolves the profile properties and exactly one active Behavior Execution User without reading Permission Design, rejects the v1 Accessible user, and verifies the OOB ATF metadata seams before the two manually executable form Tests are run.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['v2_ticket_03_profile_preflight_script'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/prototypes/v2-ticket-03-profile-preflight.js'),
        })
    }
)

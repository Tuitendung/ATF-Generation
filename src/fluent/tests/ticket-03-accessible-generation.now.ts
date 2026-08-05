import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'
import { CREATE_ATF_ACTION_ID } from '../accessible-atf-generation.now'

Test(
    {
        $id: Now.ID['ticket_03_create_atf_action_acceptance'],
        name: 'Ticket 03 - Create ATF queues one bound Accessible Generation Run',
        description:
            'Integration coverage at the Platform UI Action seam for role visibility, same-form submission, queued feedback, and the exact scoped event contract. Run on Australia with the fixed Ticket 03 fixture prepared by the first server step.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_03_create_atf_action_metadata_contract'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-03-create-atf-action.js'),
        })

        atf.server.impersonate({
            $id: Now.ID['ticket_03_impersonate_unauthorized_user'],
            user: 'd8f57f140b20220050192f15d6673a98',
        })

        atf.form.openExistingRecord({
            $id: Now.ID['ticket_03_open_catalog_item_as_unauthorized_user'],
            table: 'sc_cat_item',
            recordId: '04b7e94b4f7b4200086eeed18110c7fd',
            formUI: 'standard_ui',
        })

        atf.form.uiActionVisibility({
            $id: Now.ID['ticket_03_create_atf_hidden_without_role'],
            table: 'sc_cat_item',
            notVisible: [CREATE_ATF_ACTION_ID],
            formUI: 'standard_ui',
        })

    }
)

Test(
    {
        $id: Now.ID['ticket_03_accessible_worker_acceptance'],
        name: 'Ticket 03 - bound worker creates one complete Accessible Test graph',
        description:
            'Integration coverage at the generation-service seam for exact bound Specification reread, Schema Version 1, exact Representative Test User, and the persisted non-executed Accessible graph. Script Action System context remains Australia runtime acceptance.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_03_accessible_worker_graph'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-03-accessible-generation.js'),
        })
    }
)

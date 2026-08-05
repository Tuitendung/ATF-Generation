import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['v2_ticket_03_fresh_form_a'],
        name: '[ATF Gen v2 prototype] Ticket 03 - fresh form A and post-open negative control',
        description:
            'Manually executable throwaway evidence. Impersonates the configured Behavior Execution User first, opens the fixture through OOB Service Portal sc_cat_item, proves the baseline-selected load effect, dirties two controls after open, and proves the load effect is not reselected. Contains no submit, order, cart, or request-creation step.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.impersonate({
            $id: Now.ID['v2_ticket_03_fresh_form_a_impersonate'],
            user: '6816f79cc0a8016401c5a33be04be441',
        })

        atf.catalog_SP.openCatalogItem({
            $id: Now.ID['v2_ticket_03_fresh_form_a_open'],
            catalogItem: '03000000000000000000000000000001',
            portal: '81b75d3147032100ba13a5554ee4902b',
            page: '9f12251147132100ba13a5554ee490f4',
            queryParameters: {},
        })

        atf.catalog_SP.variableStateValidation({
            $id: Now.ID['v2_ticket_03_fresh_form_a_readiness'],
            catalogItem: '03000000000000000000000000000001',
            visible: [
                '401fc4946f864c32a93cb390f4d84669',
                'ff4bed6b9ba54127bf72f341343f9262',
                'b934181959524e6b92fc718b75d64427',
            ],
            readOnly: ['ff4bed6b9ba54127bf72f341343f9262'],
            timeout: { seconds: 15 },
        })

        atf.catalog_SP.validateVariableValue({
            $id: Now.ID['v2_ticket_03_fresh_form_a_assert_baseline'],
            catalogItem: '03000000000000000000000000000001',
            variableValues:
                'IO:401fc4946f864c32a93cb390f4d84669=baseline^IO:ff4bed6b9ba54127bf72f341343f9262=baseline-loaded^IO:b934181959524e6b92fc718b75d64427=clean^EQ',
        })

        atf.catalog_SP.setVariableValue({
            $id: Now.ID['v2_ticket_03_fresh_form_a_post_open_assignment'],
            catalogItem: '03000000000000000000000000000001',
            variableValues:
                'IO:401fc4946f864c32a93cb390f4d84669=post_open^IO:b934181959524e6b92fc718b75d64427=dirty-a^EQ',
        })

        atf.catalog_SP.validateVariableValue({
            $id: Now.ID['v2_ticket_03_fresh_form_a_assert_post_open'],
            catalogItem: '03000000000000000000000000000001',
            variableValues:
                'IO:401fc4946f864c32a93cb390f4d84669=post_open^IO:ff4bed6b9ba54127bf72f341343f9262=baseline-loaded^IO:b934181959524e6b92fc718b75d64427=dirty-a^EQ',
        })
    }
)

Test(
    {
        $id: Now.ID['v2_ticket_03_fresh_form_b'],
        name: '[ATF Gen v2 prototype] Ticket 03 - fresh form B after independent execution',
        description:
            'Manually executable throwaway evidence. Run independently and after form A. Its first post-open observations must be baseline/clean/baseline-loaded, proving no browser or variable residue. Contains no submit, order, cart, or request-creation step.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.impersonate({
            $id: Now.ID['v2_ticket_03_fresh_form_b_impersonate'],
            user: '6816f79cc0a8016401c5a33be04be441',
        })

        atf.catalog_SP.openCatalogItem({
            $id: Now.ID['v2_ticket_03_fresh_form_b_open'],
            catalogItem: '03000000000000000000000000000001',
            portal: '81b75d3147032100ba13a5554ee4902b',
            page: '9f12251147132100ba13a5554ee490f4',
            queryParameters: {},
        })

        atf.catalog_SP.variableStateValidation({
            $id: Now.ID['v2_ticket_03_fresh_form_b_readiness'],
            catalogItem: '03000000000000000000000000000001',
            visible: [
                '401fc4946f864c32a93cb390f4d84669',
                'ff4bed6b9ba54127bf72f341343f9262',
                'b934181959524e6b92fc718b75d64427',
            ],
            readOnly: ['ff4bed6b9ba54127bf72f341343f9262'],
            timeout: { seconds: 15 },
        })

        atf.catalog_SP.validateVariableValue({
            $id: Now.ID['v2_ticket_03_fresh_form_b_assert_baseline'],
            catalogItem: '03000000000000000000000000000001',
            variableValues:
                'IO:401fc4946f864c32a93cb390f4d84669=baseline^IO:ff4bed6b9ba54127bf72f341343f9262=baseline-loaded^IO:b934181959524e6b92fc718b75d64427=clean^EQ',
        })

        atf.catalog_SP.setVariableValue({
            $id: Now.ID['v2_ticket_03_fresh_form_b_post_open_assignment'],
            catalogItem: '03000000000000000000000000000001',
            variableValues: 'IO:b934181959524e6b92fc718b75d64427=dirty-b^EQ',
        })
    }
)

import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'
import {
    catalogTestSpecificationCreateModule,
    catalogTestSpecificationsModule,
} from '../catalog-test-specifications.now'

Test(
    {
        $id: Now.ID['ticket_02_catalog_test_specifications_acceptance'],
        name: 'Ticket 02 - Catalog Test Specification metadata and authoring form match v1 contract',
        description:
            'Checks the deployed metadata contract, dedicated list, direct Create New module, and dedicated authoring form. Test Designer access and Draft, Publish, Retire, and moved-record behavior remain explicit Australia-instance acceptance.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ticket_02_catalog_test_specifications_acceptance_script'],
            jasmineVersion: '3.1',
            script: Now.include('../../server/tests/ticket-02-catalog-test-specifications.js'),
        })

        atf.applicationNavigator.navigateToModule({
            $id: Now.ID['ticket_02_navigate_to_catalog_test_specifications'],
            module: catalogTestSpecificationsModule,
        })

        atf.applicationNavigator.navigateToModule({
            $id: Now.ID['ticket_02_navigate_to_create_catalog_test_specification'],
            module: catalogTestSpecificationCreateModule,
        })

        atf.form.fieldStateValidation({
            $id: Now.ID['ticket_02_validate_catalog_test_specification_field_states'],
            table: 'kb_knowledge',
            visible: [
                'number',
                'kb_knowledge_base',
                'workflow_state',
                'short_description',
                'x_gemjp_atf_genera_catalog_item',
                'x_gemjp_atf_genera_schema_version',
                'x_gemjp_atf_genera_accessible_criteria',
                'x_gemjp_atf_genera_accessible_user',
                'x_gemjp_atf_genera_inaccessible_criteria',
                'x_gemjp_atf_genera_inaccessible_user',
                'text',
            ],
            notReadOnly: [
                'kb_knowledge_base',
                'x_gemjp_atf_genera_catalog_item',
                'x_gemjp_atf_genera_schema_version',
                'x_gemjp_atf_genera_accessible_criteria',
                'x_gemjp_atf_genera_accessible_user',
                'x_gemjp_atf_genera_inaccessible_criteria',
                'x_gemjp_atf_genera_inaccessible_user',
            ],
            notMandatory: [
                'x_gemjp_atf_genera_catalog_item',
                'x_gemjp_atf_genera_schema_version',
                'x_gemjp_atf_genera_accessible_criteria',
                'x_gemjp_atf_genera_accessible_user',
                'x_gemjp_atf_genera_inaccessible_criteria',
                'x_gemjp_atf_genera_inaccessible_user',
            ],
        })

        atf.form.fieldValueValidation({
            $id: Now.ID['ticket_02_validate_catalog_test_specification_defaults'],
            table: 'kb_knowledge',
            conditions: 'x_gemjp_atf_genera_schema_version=1',
        })
    }
)

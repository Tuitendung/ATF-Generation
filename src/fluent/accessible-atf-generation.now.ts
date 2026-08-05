import '@servicenow/sdk/global'
import { Record, ScriptAction, UiAction } from '@servicenow/sdk/core'

export const ACCESSIBLE_GENERATION_EVENT_NAME =
    'x_gemjp_atf_genera.accessible.generate'
export const CREATE_ATF_ACTION_ID = 'c13a39021d033110f8779da9137d35b3'

export const createAtfAction = UiAction({
    $id: CREATE_ATF_ACTION_ID,
    table: 'sc_cat_item',
    name: 'Create ATF',
    actionName: 'x_gemjp_atf_genera_create_atf',
    active: true,
    showInsert: false,
    showUpdate: true,
    roles: ['atf_test_admin'],
    condition: "gs.hasRole('atf_test_admin')",
    client: {
        isClient: false,
        isUi11Compatible: true,
        isUi16Compatible: true,
    },
    form: {
        showButton: true,
        showContextMenu: false,
        showLink: false,
        style: 'primary',
    },
    list: {
        showBannerButton: false,
        showButton: false,
        showContextMenu: false,
        showLink: false,
        showListChoice: false,
        showSaveWithFormButton: false,
        style: 'unstyled',
    },
    script: Now.include('../server/ui-actions/create-accessible-atf.js'),
    hint: 'Queue one Accessible and one Inaccessible Permission Test from the Current Specification',
    order: 100,
})

export const accessibleGenerationEvent = Record({
    $id: Now.ID['accessible_generation_event'],
    table: 'sysevent_register',
    data: {
        suffix: 'accessible.generate',
        event_name: ACCESSIBLE_GENERATION_EVENT_NAME,
        description: 'Queues one two-outcome Permission Test Generation Run.',
        table: 'sc_cat_item',
        fired_by: 'Create ATF UI Action on sc_cat_item',
        priority: 100,
    },
})

ScriptAction({
    $id: Now.ID['accessible_generation_script_action'],
    name: 'Generate Permission Test Pair',
    active: true,
    description:
        'System-context event adapter that delegates the bound Generation Run to AtfGenerationService.',
    eventName: ACCESSIBLE_GENERATION_EVENT_NAME,
    order: 100,
    script: `new AtfGenerationService().generatePermissionRunFromBoundSpecification({
    catalogItemId: current.getUniqueValue(),
    specificationId: String(event.parm1 || ''),
    runStamp: String(event.parm2 || ''),
    requestedBy: String(event.sys_created_by || ''),
})`,
})

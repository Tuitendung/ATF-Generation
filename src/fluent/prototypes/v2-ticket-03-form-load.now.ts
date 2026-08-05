import '@servicenow/sdk/global'
import {
    CatalogClientScript,
    CatalogItem,
    Property,
    SelectBoxVariable,
    SingleLineTextVariable,
} from '@servicenow/sdk/core'

export const V2_TICKET_03_BEHAVIOR_EXECUTION_USER_ID = '6816f79cc0a8016401c5a33be04be441'
export const V2_TICKET_03_ACCESSIBLE_V1_USER_ID = 'd8f57f140b20220050192f15d6673a98'
export const V2_TICKET_03_SERVICE_PORTAL_ID = '81b75d3147032100ba13a5554ee4902b'
export const V2_TICKET_03_CATALOG_ITEM_PAGE_ID = '9f12251147132100ba13a5554ee490f4'
export const V2_TICKET_03_READINESS_TIMEOUT_SECONDS = 15
export const V2_TICKET_03_FIXTURE_CATALOG_ITEM_ID = '03000000000000000000000000000001'

Property({
    $id: Now.ID['v2_ticket_03_behavior_execution_user'],
    name: 'x_gemjp_atf_genera.prototype.ticket_03.behavior_execution_user',
    type: 'string',
    value: V2_TICKET_03_BEHAVIOR_EXECUTION_USER_ID,
    description:
        'Throwaway Ticket 03 Behavior Execution User sys_id. Resolve by exact sys_id and require exactly one active sys_user; never read Permission Design.',
    isPrivate: true,
})

Property({
    $id: Now.ID['v2_ticket_03_service_portal'],
    name: 'x_gemjp_atf_genera.prototype.ticket_03.service_portal',
    type: 'string',
    value: V2_TICKET_03_SERVICE_PORTAL_ID,
    description: 'Throwaway Ticket 03 OOB Service Portal record binding. Revalidate on the target release.',
    isPrivate: true,
})

Property({
    $id: Now.ID['v2_ticket_03_catalog_item_page'],
    name: 'x_gemjp_atf_genera.prototype.ticket_03.catalog_item_page',
    type: 'string',
    value: V2_TICKET_03_CATALOG_ITEM_PAGE_ID,
    description: 'Throwaway Ticket 03 OOB sc_cat_item page binding. Revalidate on the target release.',
    isPrivate: true,
})

Property({
    $id: Now.ID['v2_ticket_03_readiness_timeout'],
    name: 'x_gemjp_atf_genera.prototype.ticket_03.readiness_timeout_seconds',
    type: 'integer',
    value: V2_TICKET_03_READINESS_TIMEOUT_SECONDS,
    description: 'Throwaway Ticket 03 bounded load-readiness timeout in seconds.',
    isPrivate: true,
})

export const v2Ticket03FormLoadFixture = CatalogItem({
    $id: V2_TICKET_03_FIXTURE_CATALOG_ITEM_ID,
    name: '[ATF Gen v2 prototype] Ticket 03 form-load fixture',
    shortDescription: 'Throwaway fixture for Behavior Execution Profile and genuine form-load evidence.',
    description:
        'Prototype-only Catalog Item. Open and inspect it in OOB Service Portal; never submit, order, or add it to a cart.',
    active: true,
    hideAddToCart: true,
    hideAddToWishList: true,
    hideAttachment: true,
    hideDeliveryTime: true,
    hideQuantitySelector: true,
    hideSaveAsDraft: true,
    noCart: true,
    noOrder: true,
    noOrderNow: true,
    noProceedCheckout: true,
    noQuantity: true,
    noSearch: true,
    visibleStandalone: true,
    variables: {
        load_driver: SelectBoxVariable({
            question: 'Load driver',
            order: 100,
            defaultValue: 'baseline',
            includeNone: false,
            choices: {
                baseline: { label: 'Baseline', sequence: 100 },
                post_open: { label: 'Post-open negative control', sequence: 200 },
            },
        }),
        load_result: SingleLineTextVariable({
            question: 'Load result',
            order: 200,
            defaultValue: 'not-loaded',
        }),
        residue_marker: SingleLineTextVariable({
            question: 'Residue marker',
            order: 300,
            defaultValue: 'clean',
        }),
    },
})

CatalogClientScript({
    $id: Now.ID['v2_ticket_03_form_load_script'],
    name: '[ATF Gen v2 prototype] Ticket 03 baseline form load',
    type: 'onLoad',
    catalogItem: v2Ticket03FormLoadFixture,
    uiType: 'mobileOrServicePortal',
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
    appliesOnCatalogTasks: false,
    appliesOnTargetRecord: false,
    script: `function onLoad() {
    var loadDriverAtOpen = g_form.getValue('load_driver');

    if (loadDriverAtOpen === 'baseline') {
        g_form.setValue('load_result', 'baseline-loaded');
    } else {
        g_form.setValue('load_result', 'pre-open-context-loaded');
    }

    g_form.setReadOnly('load_result', true);
}`,
})

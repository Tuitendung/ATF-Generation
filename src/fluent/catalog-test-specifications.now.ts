import '@servicenow/sdk/global'
import {
    ApplicationMenu,
    Form,
    IntegerColumn,
    List,
    Record,
    ReferenceColumn,
    Table,
} from '@servicenow/sdk/core'

// This application-owned identity is intentionally used directly by the
// authoring module. It is not selected through configuration or title lookup.
export const CATALOG_TEST_SPECIFICATIONS_KB_ID = 'ad51c081c2bb45cbbf74bc83396cbb05'
export const CATALOG_TEST_SPECIFICATIONS_VIEW_NAME = 'catalog_test_specification'
export const CATALOG_TEST_SPECIFICATION_CREATE_URL =
    'kb_knowledge.do?sys_id=-1&sysparm_view=catalog_test_specification&sysparm_query=kb_knowledge_base%3Dad51c081c2bb45cbbf74bc83396cbb05'

export const kb_knowledge = Table({
    augments: 'kb_knowledge',
    schema: {
        x_gemjp_atf_genera_catalog_item: ReferenceColumn({
            label: 'Catalog Item',
            referenceTable: 'sc_cat_item',
            mandatory: false,
        }),
        x_gemjp_atf_genera_schema_version: IntegerColumn({
            label: 'Schema Version',
            default: 1,
            mandatory: false,
        }),
        x_gemjp_atf_genera_accessible_criteria: ReferenceColumn({
            label: 'Accessible User Criteria',
            referenceTable: 'user_criteria',
            mandatory: false,
        }),
        x_gemjp_atf_genera_accessible_user: ReferenceColumn({
            label: 'Accessible Representative Test User',
            referenceTable: 'sys_user',
            mandatory: false,
        }),
        x_gemjp_atf_genera_inaccessible_criteria: ReferenceColumn({
            label: 'Inaccessible User Criteria',
            referenceTable: 'user_criteria',
            mandatory: false,
        }),
        x_gemjp_atf_genera_inaccessible_user: ReferenceColumn({
            label: 'Inaccessible Representative Test User',
            referenceTable: 'sys_user',
            mandatory: false,
        }),
    },
})

export const catalogTestSpecificationsKnowledgeBase = Record({
    $id: CATALOG_TEST_SPECIFICATIONS_KB_ID,
    table: 'kb_knowledge_base',
    data: {
        title: 'Catalog Test Specifications',
        description: 'Application-owned Knowledge Base for structured Catalog Test Specifications.',
        active: true,
        application: '4c6b7718ad6b40709b6243636b59e772',
        // Australia uses the active OOB System Administrator as the metadata
        // owner. The manager-only Test Designer remains a separate manual grant.
        owner: '6816f79cc0a8016401c5a33be04be441',
        // Australia configures new Knowledge Bases with the active, published
        // OOB Flow Designer lifecycle paths. Leave the legacy workflow fields
        // unset so one lifecycle mechanism remains authoritative.
        kb_publish_flow: '2222030614f75210f8779da9137d35b3',
        kb_retire_flow: 'ea32fac859c02210f877a8ba01addda2',
    },
})

export const catalogTestSpecificationView = Record({
    $id: Now.ID['catalog_test_specification_view'],
    table: 'sys_ui_view',
    data: {
        name: CATALOG_TEST_SPECIFICATIONS_VIEW_NAME,
        title: 'Catalog Test Specification',
    },
})

export const catalogTestSpecificationForm = Form({
    table: 'kb_knowledge',
    view: catalogTestSpecificationView,
    sections: [
        {
            caption: 'Specification Identity',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'kb_knowledge_base', type: 'table_field' },
                        { field: 'workflow_state', type: 'table_field' },
                        { field: 'short_description', type: 'table_field' },
                        {
                            field: 'x_gemjp_atf_genera_catalog_item' as any,
                            type: 'table_field',
                        },
                        {
                            field: 'x_gemjp_atf_genera_schema_version' as any,
                            type: 'table_field',
                        },
                    ],
                },
            ],
        },
        {
            caption: 'Permission Design',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            field: 'x_gemjp_atf_genera_accessible_criteria' as any,
                            type: 'table_field',
                        },
                        {
                            field: 'x_gemjp_atf_genera_accessible_user' as any,
                            type: 'table_field',
                        },
                        {
                            field: 'x_gemjp_atf_genera_inaccessible_criteria' as any,
                            type: 'table_field',
                        },
                        {
                            field: 'x_gemjp_atf_genera_inaccessible_user' as any,
                            type: 'table_field',
                        },
                    ],
                },
            ],
        },
        {
            caption: 'Human Notes',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ field: 'text', type: 'table_field' }],
                },
            ],
        },
    ],
    // SDK 4.8.1 does not merge same-build Table augments into Form's static
    // kb_knowledge schema. Keep the type escape on only those six augmented
    // field literals so the table, view, layout, and OOB fields remain checked.
})

export const catalogTestSpecificationList = List({
    table: 'kb_knowledge',
    view: catalogTestSpecificationView,
    columns: [
        'number',
        'short_description',
        'x_gemjp_atf_genera_catalog_item',
        'workflow_state',
        'x_gemjp_atf_genera_schema_version',
        'sys_updated_on',
        'sys_updated_by',
    ],
})

export const atfGenerationApplicationMenu = ApplicationMenu({
    $id: Now.ID['atf_generation_application_menu'],
    title: 'ATF Generation',
    description: 'Author Catalog Test Specifications and generate ATF artifacts.',
    active: true,
    order: 100,
})

export const catalogTestSpecificationsModule = Record({
    $id: Now.ID['catalog_test_specifications_module'],
    table: 'sys_app_module',
    data: {
        title: 'Catalog Test Specifications',
        application: atfGenerationApplicationMenu,
        link_type: 'LIST',
        name: 'kb_knowledge',
        filter: `kb_knowledge_base=${CATALOG_TEST_SPECIFICATIONS_KB_ID}^ORDERBYDESCsys_updated_on`,
        view_name: CATALOG_TEST_SPECIFICATIONS_VIEW_NAME,
        hint: 'Author and publish Catalog Test Specifications',
        active: true,
        order: 100,
    },
})

// Australia routes the OOB Knowledge list New action through the generic
// Knowledge Center wizard. Keep creation as a separate application module so
// the Test Designer enters the proven Platform form URL without a list UI
// Action or view-specific action mapping.
export const catalogTestSpecificationCreateModule = Record({
    $id: Now.ID['catalog_test_specification_create_module'],
    table: 'sys_app_module',
    data: {
        title: 'Create New',
        application: atfGenerationApplicationMenu,
        link_type: 'DIRECT',
        query: CATALOG_TEST_SPECIFICATION_CREATE_URL,
        hint: 'Create a Catalog Test Specification',
        active: true,
        order: 200,
    },
})

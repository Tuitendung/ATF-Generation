import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '03000000000000000000000000000001': {
                        table: 'sc_cat_item'
                        id: '03000000000000000000000000000001'
                    }
                    accessible_generation_event: {
                        table: 'sysevent_register'
                        id: 'b83626596d574139bef84b29ae5430d1'
                    }
                    accessible_generation_script_action: {
                        table: 'sysevent_script_action'
                        id: '65ab31b27e83496582584ed925829747'
                    }
                    ad51c081c2bb45cbbf74bc83396cbb05: {
                        table: 'kb_knowledge_base'
                        id: 'ad51c081c2bb45cbbf74bc83396cbb05'
                    }
                    atf_generation_application_menu: {
                        table: 'sys_app_application'
                        id: 'd5dbd8b8f3634a62a944642a61171bb1'
                    }
                    AtfGenerationService: {
                        table: 'sys_script_include'
                        id: '5ba5185757964dcfb9bd90feab049180'
                    }
                    AtfGenerationVerificationAjax: {
                        table: 'sys_script_include'
                        id: '6a15bcbc930e4fe5a950730563d52af7'
                        deleted: true
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'b8147690f87b4bdcb954961074944b5d'
                    }
                    c13a39021d033110f8779da9137d35b3: {
                        table: 'sys_ui_action'
                        id: 'c13a39021d033110f8779da9137d35b3'
                    }
                    catalog_test_specification_create_module: {
                        table: 'sys_app_module'
                        id: 'a3954dd711bf49dfa790602ca37941c1'
                    }
                    catalog_test_specification_new_action: {
                        table: 'sys_ui_action'
                        id: 'd17420ae269f42eb869abcc69bf16842'
                        deleted: true
                    }
                    catalog_test_specifications_module: {
                        table: 'sys_app_module'
                        id: '006cf4f11b6946d09137d3bf0930409e'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '9e71a8d7ad284d34ab0bf40c07672414'
                    }
                    'src_server_prototypes_ticket-01-runtime-ai-feasibility-harness_js': {
                        table: 'sys_module'
                        id: '9c2fd23cd88b43708030a4659d604df2'
                    }
                    'src_server_prototypes_ticket-01-runtime-ai-fixtures_js': {
                        table: 'sys_module'
                        id: 'e28f3cd8c3634c7ca29a54b39ad0923f'
                    }
                    'src_server_prototypes_v2-ticket-03-profile-preflight_js': {
                        table: 'sys_module'
                        id: '3d724edb4dec4b58bc242e2f52a17057'
                    }
                    'src_server_script-includes_atf-generation-service_js': {
                        table: 'sys_module'
                        id: 'a80937a3ff9446f09578b9be1a8a2308'
                    }
                    'src_server_tests_ticket-01-generation-service_js': {
                        table: 'sys_module'
                        id: '7aab7faee3d34425834f73e1b9b1e9ec'
                    }
                    'src_server_tests_ticket-01-verification-ajax_js': {
                        table: 'sys_module'
                        id: 'b1101168527543219b102085caea0f4d'
                        deleted: true
                    }
                    'src_server_tests_ticket-02-catalog-test-specifications_js': {
                        table: 'sys_module'
                        id: '74d55fe9edd14facbf9ccc0d4aae6a07'
                    }
                    'src_server_tests_ticket-03-accessible-generation_js': {
                        table: 'sys_module'
                        id: '9bbdd7546f944926a66d312c7453e853'
                    }
                    'src_server_tests_ticket-03-create-atf-action_js': {
                        table: 'sys_module'
                        id: '655261a48ed945548957b28fc63aa8ee'
                    }
                    'src_server_tests_ticket-04-permission-generation_js': {
                        table: 'sys_module'
                        id: '8036a2bda8784332a5b1e18746b05fb2'
                    }
                    'src_server_tests_ticket-05-ui-action-preflight_js': {
                        table: 'sys_module'
                        id: '70d63a59ab524353bfd0a9f20ccc1bcc'
                    }
                    'src_server_tests_ticket-05-worker-preflight_js': {
                        table: 'sys_module'
                        id: '01280ab2a2a14970bf1bb9f02d3df7cb'
                    }
                    'src_server_tests_ticket-06-independent-partial-runs_js': {
                        table: 'sys_module'
                        id: '9b8b40b285fa4ae2a8112a6d8be18fc3'
                    }
                    'src_server_ui-actions_create-accessible-atf_js': {
                        table: 'sys_module'
                        id: 'f19217cfada247a9984da458e8fe587e'
                    }
                    ticket_01_empty_seed_suite: {
                        table: 'sys_atf_test_suite'
                        id: '39f31d1d40c543d2b559b4db6192c6c3'
                        deleted: true
                    }
                    ticket_01_extractor_business_logic_block_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '2eb4d3f687294857bf7ab37c23c65d36'
                    }
                    ticket_01_extractor_capability_catalog_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'e9421fc8257c48e1920db2e99d8ddc15'
                    }
                    ticket_01_extractor_output_schema_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '2b487fc925b9447a93f5a423cde35a30'
                    }
                    ticket_01_extractor_prompt_v1: {
                        table: 'sys_generative_ai_config'
                        id: '48128a9a794e4be4b414da310423b6da'
                        deleted: true
                    }
                    ticket_01_extractor_prompt_v2: {
                        table: 'sys_generative_ai_config'
                        id: 'cfb77aa564d94886991bedc80087d40d'
                    }
                    ticket_01_extractor_prompt_v3: {
                        table: 'sys_generative_ai_config'
                        id: '1bacd630db5c441c9984cc1311b6609a'
                    }
                    ticket_01_extractor_user_access: {
                        table: 'sys_security_acl'
                        id: 'ef10b822ca28413fa8d69029f82310c8'
                    }
                    ticket_01_extractor_variable_design_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'dd479d866af840b5b9afd3905f8aa99c'
                    }
                    ticket_01_generation_service_integration: {
                        table: 'sys_atf_test'
                        id: '40941a30744549efbd0b43d12725a120'
                    }
                    ticket_01_generation_service_integration_script: {
                        table: 'sys_atf_step'
                        id: '4fde73de27fe4b3881c41bb44a25a2f6'
                    }
                    ticket_01_throwaway_extractor_skill: {
                        table: 'sys_one_extend_capability'
                        id: '21abbb02639c44ffae6bcf195e4a27fc'
                    }
                    ticket_01_throwaway_extractor_skill__output_error: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'c49ec8bcf67148f68a74ce92261b31a5'
                    }
                    ticket_01_throwaway_extractor_skill__output_errorcode: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '90985cc9ffed4002872d10fbc3927921'
                    }
                    ticket_01_throwaway_extractor_skill__output_provider: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'fc195a438ced49258e50097486752d11'
                    }
                    ticket_01_throwaway_extractor_skill__output_response: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '0c9d56e9365a4bf28a71f19741a7af68'
                    }
                    ticket_01_throwaway_extractor_skill__output_status: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'e505eaf6e4664f8d8cc0c5a487c21962'
                    }
                    ticket_01_throwaway_verifier_skill: {
                        table: 'sys_one_extend_capability'
                        id: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                    }
                    ticket_01_throwaway_verifier_skill__output_error: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'e2bf278860354ca498a314df07b321a6'
                    }
                    ticket_01_throwaway_verifier_skill__output_errorcode: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '358a7b433d924f20a61071990b45fd58'
                    }
                    ticket_01_throwaway_verifier_skill__output_provider: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '5a2c92220e2046408e5c3c97e3d85def'
                    }
                    ticket_01_throwaway_verifier_skill__output_response: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'e09822aa1a8d4b53bdf4229943bccdc7'
                    }
                    ticket_01_throwaway_verifier_skill__output_status: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'd6c1223dd67d40acbaaecf42f695b9de'
                    }
                    ticket_01_verifier_business_logic_block_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '4a8c0a511a4147a1a329ab0b99fa2d41'
                    }
                    ticket_01_verifier_capability_catalog_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '29c5dd9cbc47402fa8fd8badc15d2bb3'
                    }
                    ticket_01_verifier_output_schema_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '43c8edc262e84327ad2f3d5d1ab4516a'
                    }
                    ticket_01_verifier_prompt_v1: {
                        table: 'sys_generative_ai_config'
                        id: '4afca767c617449d8f59e0b05b950afa'
                        deleted: true
                    }
                    ticket_01_verifier_prompt_v2: {
                        table: 'sys_generative_ai_config'
                        id: '93af4c8a2bc84670b0f711c957038d8b'
                    }
                    ticket_01_verifier_user_access: {
                        table: 'sys_security_acl'
                        id: '5313f34858cf4ed0a87b72ae6b4bfb80'
                    }
                    ticket_01_verifier_variable_design_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '47bdfa2634ee47dc9cb9f3f05c9f581c'
                    }
                    ticket_02_catalog_test_specifications_acceptance: {
                        table: 'sys_atf_test'
                        id: '34533ff89894498ab67b6206b046a7e9'
                    }
                    ticket_02_catalog_test_specifications_acceptance_script: {
                        table: 'sys_atf_step'
                        id: '43945742d8c743ea9dd2b49ff130cf51'
                    }
                    ticket_02_navigate_to_catalog_test_specifications: {
                        table: 'sys_atf_step'
                        id: 'e1d6072f715f469888307ee0ab0c1f61'
                    }
                    ticket_02_navigate_to_create_catalog_test_specification: {
                        table: 'sys_atf_step'
                        id: 'e8322785b2f34b359ef4ddc169e95ea4'
                    }
                    ticket_02_open_catalog_test_specification_form: {
                        table: 'sys_atf_step'
                        id: '78cb92ee66734ef3a878f70c36adf162'
                        deleted: true
                    }
                    ticket_02_validate_catalog_test_specification_defaults: {
                        table: 'sys_atf_step'
                        id: 'b1bfdd2ef3284ff0b908e784f3b6e670'
                    }
                    ticket_02_validate_catalog_test_specification_field_states: {
                        table: 'sys_atf_step'
                        id: 'd374616fbcac415ca6e17f7664575e90'
                    }
                    ticket_03_accessible_worker_acceptance: {
                        table: 'sys_atf_test'
                        id: '17c18be1184b455fb655cd70592e5a00'
                    }
                    ticket_03_accessible_worker_graph: {
                        table: 'sys_atf_step'
                        id: 'e734d17870884bbb9960cf7d0944406f'
                    }
                    ticket_03_create_atf_action_acceptance: {
                        table: 'sys_atf_test'
                        id: '7d57365d84864002a12a85e5b5085914'
                    }
                    ticket_03_create_atf_action_metadata_contract: {
                        table: 'sys_atf_step'
                        id: '859fc31ad43e41f08706a22f533b3e40'
                    }
                    ticket_03_create_atf_hidden_without_role: {
                        table: 'sys_atf_step'
                        id: '71a92c5b2b6e4f5ba0fcd3f5548da9e3'
                    }
                    ticket_03_impersonate_unauthorized_user: {
                        table: 'sys_atf_step'
                        id: '36b49a7b50ff4944b8c92b3fac141bbc'
                    }
                    ticket_03_open_catalog_item_as_unauthorized_user: {
                        table: 'sys_atf_step'
                        id: '9d5b68c551984043a2693a43275bb208'
                    }
                    ticket_04_permission_generation_acceptance: {
                        table: 'sys_atf_test'
                        id: '0aca97a420494e289fc6cce0445868ea'
                    }
                    ticket_04_permission_generation_graph: {
                        table: 'sys_atf_step'
                        id: 'a359cd0ff6474df89d962df77b06d64b'
                    }
                    ticket_05_fail_fast_acceptance: {
                        table: 'sys_atf_test'
                        id: '41e0f1a295ad49b8a04233b12b47baa4'
                    }
                    ticket_05_ui_action_preflight_boundaries: {
                        table: 'sys_atf_step'
                        id: 'de97c29f7fa24a7696c06d9dcf32c3b1'
                    }
                    ticket_05_worker_preflight_boundaries: {
                        table: 'sys_atf_step'
                        id: 'f07ab2c6dcc44279a29d48a4c70601b0'
                    }
                    ticket_06_independent_partial_runs_acceptance: {
                        table: 'sys_atf_test'
                        id: '81ac6fcd47974449b7d60c514aeff667'
                    }
                    ticket_06_independent_partial_runs_graph_and_logs: {
                        table: 'sys_atf_step'
                        id: 'e66be10607b145a5b53571b088200b2b'
                    }
                    v2_ticket_03_behavior_execution_user: {
                        table: 'sys_properties'
                        id: 'b927efd1f20a4389af07fb61eb6341d7'
                    }
                    v2_ticket_03_catalog_item_page: {
                        table: 'sys_properties'
                        id: 'e8c9ade3ccee4b9d9e49ac50005caa8b'
                    }
                    v2_ticket_03_form_load_script: {
                        table: 'catalog_script_client'
                        id: 'eefb44b6a5ff4a15b2ffcc3a865be888'
                    }
                    v2_ticket_03_fresh_form_a: {
                        table: 'sys_atf_test'
                        id: '457c72bf94734b9c8f300edf252b3433'
                    }
                    v2_ticket_03_fresh_form_a_assert_baseline: {
                        table: 'sys_atf_step'
                        id: '43047b3203b44df5864529d71554347a'
                    }
                    v2_ticket_03_fresh_form_a_assert_post_open: {
                        table: 'sys_atf_step'
                        id: '302c62dd6b8e48c290600b2a17e7ae44'
                    }
                    v2_ticket_03_fresh_form_a_impersonate: {
                        table: 'sys_atf_step'
                        id: '8c65d68a22674058a18caf7053788f69'
                    }
                    v2_ticket_03_fresh_form_a_open: {
                        table: 'sys_atf_step'
                        id: '4232059094fc440699f4d58f8db7111f'
                    }
                    v2_ticket_03_fresh_form_a_post_open_assignment: {
                        table: 'sys_atf_step'
                        id: 'd554ca659ffe456a840bb405ee7c87df'
                    }
                    v2_ticket_03_fresh_form_a_readiness: {
                        table: 'sys_atf_step'
                        id: 'dac4f7b74b3a446ab24467dbf9210412'
                    }
                    v2_ticket_03_fresh_form_b: {
                        table: 'sys_atf_test'
                        id: '774db46d38e4411480c8fa92b82b8fbd'
                    }
                    v2_ticket_03_fresh_form_b_assert_baseline: {
                        table: 'sys_atf_step'
                        id: '55ccf74c867141538e29351c7bef73b7'
                    }
                    v2_ticket_03_fresh_form_b_impersonate: {
                        table: 'sys_atf_step'
                        id: '6e81b0e4029449f8a618280ac6873d5d'
                    }
                    v2_ticket_03_fresh_form_b_open: {
                        table: 'sys_atf_step'
                        id: 'a058c0f155de450d8a1bbc515bdce0ff'
                    }
                    v2_ticket_03_fresh_form_b_post_open_assignment: {
                        table: 'sys_atf_step'
                        id: '1dbcb8d2b19d4331ab54b9cf63c26bab'
                    }
                    v2_ticket_03_fresh_form_b_readiness: {
                        table: 'sys_atf_step'
                        id: '40b40fa7d1434d3696a78a61f29d3b6d'
                    }
                    v2_ticket_03_profile_preflight: {
                        table: 'sys_atf_test'
                        id: 'fab857499ea44c0ebc09c92f10cc13e9'
                    }
                    v2_ticket_03_profile_preflight_script: {
                        table: 'sys_atf_step'
                        id: 'ddb04145a94e4ebfb51df531cf35d195'
                    }
                    v2_ticket_03_readiness_timeout: {
                        table: 'sys_properties'
                        id: '5e02c8673f1d4a8ba99f195f8bf8e1bc'
                    }
                    v2_ticket_03_service_portal: {
                        table: 'sys_properties'
                        id: 'a28a3c37b4fd47debb9884f57432c91b'
                    }
                }
                composite: [
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: '02189ad4c6014ed4b083f482c7c28a7d'
                        key: {
                            agent_access_config: {
                                id: 'dc170a00d6d74c3f86d0938f3a0a5d89'
                                key: {
                                    agent: '07fe314bf5594f89bcb9af6dcc2d6efd'
                                }
                            }
                            role: {
                                id: 'd0b68172501749e295ac83daf94a7d6b'
                                key: {
                                    name: 'atf_test_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '02ac26e5f2bb4f26895b2cfb00bb5a9b'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: '6e5a1b535320220002c6435723dc3498'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '03e97fbc2e124db38dc6ba2cc70692fb'
                        key: {
                            document_key: '302c62dd6b8e48c290600b2a17e7ae44'
                            variable: 'f2fac9d673142300688e0d573cf6a7e0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '04fccd79bdfa45e29434cee48787fb9d'
                        key: {
                            document_key: 'de97c29f7fa24a7696c06d9dcf32c3b1'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '05af0051e36347ffb0f6ca4423ade003'
                        key: {
                            document_key: '4fde73de27fe4b3881c41bb44a25a2f6'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '07ac59d353254de9a9ede9bf50e48767'
                        key: {
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'kb_knowledge_base'
                            position: '1'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config'
                        id: '07fe314bf5594f89bcb9af6dcc2d6efd'
                        key: {
                            skill_id: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0c6dcf3335ec49e6b7b518a7cff99865'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: '787a9b535320220002c6435723dc3455'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_status'
                        id: '0d01f6a968554249abd2c405af3ccb97'
                        key: {
                            skill_config: {
                                id: 'c2600ef6216a4af88a119bcc6d5b1208'
                                key: {
                                    skill_id: '21abbb02639c44ffae6bcf195e4a27fc'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1020e1bc1ea245e8b9ed1b19787309f4'
                        key: {
                            document_key: 'b1bfdd2ef3284ff0b908e784f3b6e670'
                            variable: 'c83b5337e7633300e12127d8d2f6a98b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '10581e2ff0f745dabd9a5256da3aabae'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: 'b3be97b99f1303002528d4b4232e70ce'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '12bf950a090748e8a987b81e65d4f3e6'
                        key: {
                            document_key: '43047b3203b44df5864529d71554347a'
                            variable: 'e0cc42b59f1303002528d4b4232e70f9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '131f06a7a8574b0c9f3e9ef3179b7e64'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: 'd92b4dd673142300688e0d573cf6a7c3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1d6485759e0e4e58a989a1f0b62df307'
                        key: {
                            document_key: 'e1d6072f715f469888307ee0ab0c1f61'
                            variable: 'b6d2b40c73720300c79260bdfaf6a786'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: '20bf4d15b4984b0f8b1f68f4ccdb9e47'
                        key: {
                            agent: 'c2600ef6216a4af88a119bcc6d5b1208'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '21088f2705f04b808c3d26f9f6cf70c9'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'x_gemjp_atf_genera_catalog_item'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '21afb0c4f7ea4a2ba755f685cf101b98'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: '41ae57b99f1303002528d4b4232e7076'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '230e4d06e50b4f94b532a446fb167ad3'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: 'fe5d9f799f1303002528d4b4232e70d7'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '2383b5575b08494db985528f253c128c'
                        key: {
                            sys_ui_form: {
                                id: '6c2a6add994642e6abe767834cfaae46'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '603a409e23844061af8294926e45b4f7'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Human Notes'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '23a52ad65fb04086aa0825434f249809'
                        key: {
                            document_key: '55ccf74c867141538e29351c7bef73b7'
                            variable: 'f2fac9d673142300688e0d573cf6a7e0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '27ed0b4134e54385a7e011295a5b5fa2'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: '080e93b99f1303002528d4b4232e706d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a4da8cba7674c928549ab4614f4ca50'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: '41ae57b99f1303002528d4b4232e7076'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a7120a0c76545de9a9d60cf3f0b1ff4'
                        key: {
                            document_key: '55ccf74c867141538e29351c7bef73b7'
                            variable: '9b5b4e759f1303002528d4b4232e7026'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2b2e8a20bcfb4ad6a19d14f351717457'
                        key: {
                            document_key: 'a058c0f155de450d8a1bbc515bdce0ff'
                            variable: 'ac615adc73e703008e6b0d573cf6a702'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '350c38aaa83344c3aa8a4db1aa6648d8'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: 'd92b4dd673142300688e0d573cf6a7c3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3685ac90965a42abb37533b33f1a87b0'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_inaccessible_criteria'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '39f4643e275647d689c98f78148c08e0'
                        key: {
                            document_key: 'd554ca659ffe456a840bb405ee7c87df'
                            variable: '3f3525f48703030070870cf888cb0b37'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3cc23d33649143c2b0e090b87f4116bf'
                        key: {
                            document_key: 'e734d17870884bbb9960cf7d0944406f'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '401fc4946f864c32a93cb390f4d84669'
                        key: {
                            cat_item: '03000000000000000000000000000001'
                            variable_set: 'NULL'
                            name: 'load_driver'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '444f7c3ae56d4804b0a73c68b70514de'
                        key: {
                            document_key: 'b1bfdd2ef3284ff0b908e784f3b6e670'
                            variable: 'a0e13cc35320220002c6435723dc3467'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44895c29a43c462cabec8a221513cad0'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_accessible_criteria'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '48b70d2022d448eabbeaa4bba37e8ad5'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: 'b4de97b99f1303002528d4b4232e7077'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '49106fac1d1445908a25dcd4161228c1'
                        key: {
                            document_key: '43945742d8c743ea9dd2b49ff130cf51'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4aa10894cd74457aad0f8b92050a1ac4'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: 'b3be97b99f1303002528d4b4232e70ce'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '4cae193158e046c19209905ed0da56eb'
                        key: {
                            ai_config: '93af4c8a2bc84670b0f711c957038d8b'
                        }
                    },
                    {
                        table: 'sys_gen_ai_strategy_mapping'
                        id: '4cc1924f20b449319a565114ab63b11e'
                        key: {
                            strategy: 'CAPABILITY_EXECUTION'
                            feature: {
                                id: '6d1840ef2a5a4d78ad1e539838db8619'
                                key: {
                                    feature_name: 'T01 Throwaway Contract Extractor'
                                    document: '21abbb02639c44ffae6bcf195e4a27fc'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4d10593d3079461b8e490c2070ce3bff'
                        deleted: true
                        key: {
                            sys_security_acl: '5313f34858cf4ed0a87b72ae6b4bfb80'
                            sys_user_role: {
                                id: 'f9aa1429eb48464ca931ccd99a454df7'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4dc2f68ad7d44d66876b1cd7fca39629'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: '80f953535320220002c6435723dc340f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '50ba43fd3578407eadededb0dcff9690'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: '00eb17799f1303002528d4b4232e70fe'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '50fe94da79824938b8995f0fe46b6bd5'
                        key: {
                            sys_ui_section: {
                                id: 'ca79d6a835124a9ca1caa56847e4245d'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Permission Design'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'x_gemjp_atf_genera_inaccessible_user'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '53321cbf0c6349b59a6899cfcca9434e'
                        key: {
                            document_key: '43047b3203b44df5864529d71554347a'
                            variable: 'f2fac9d673142300688e0d573cf6a7e0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '539752e7f84d4f1bbb5edf845dc21d19'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_accessible_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5478ae82da3a4032847f3ed8ada495a3'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_catalog_item'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '5c71e9c0ca5144d287e171192fef334a'
                        key: {
                            question: {
                                id: '401fc4946f864c32a93cb390f4d84669'
                                key: {
                                    cat_item: '03000000000000000000000000000001'
                                    variable_set: 'NULL'
                                    name: 'load_driver'
                                }
                            }
                            value: 'baseline'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5fcd1864469742b18b8c440d06172fe1'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_schema_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '603a409e23844061af8294926e45b4f7'
                        key: {
                            name: 'kb_knowledge'
                            caption: 'Human Notes'
                            view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_gen_ai_feature_mapping'
                        id: '60c12cd42a484cfdb5a9ed8f7165bd81'
                        key: {
                            feature_name: 'T01 Throwaway Independent Verifier'
                            document: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '616e4baab9f14a3ab0001d2c4a6b65c8'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: 'e63a97535320220002c6435723dc34b8'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64427eadaee34c7fa29d1b4135d91547'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_accessible_user'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6527f3ae5f69401cbc44296ea94d62e3'
                        key: {
                            sys_ui_section: {
                                id: 'ca79d6a835124a9ca1caa56847e4245d'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Permission Design'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'x_gemjp_atf_genera_inaccessible_criteria'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '67e6b2ee16d3494f805193d1b70ea008'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_updated_by'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '685fa1b7bf9c4f78b6f7fa42d133321a'
                        deleted: true
                        key: {
                            document_key: '78cb92ee66734ef3a878f70c36adf162'
                            variable: '3a662f60a3023110571967d1361e6134'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6994db00de4f44a89b0c69ec1981d7af'
                        key: {
                            document_key: 'e734d17870884bbb9960cf7d0944406f'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '6b1086a4279d45b8aa7f4d2d23046aa0'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_updated_on'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6b162820e3464a7cba6b62a84b119f91'
                        key: {
                            document_key: '55ccf74c867141538e29351c7bef73b7'
                            variable: 'e0cc42b59f1303002528d4b4232e70f9'
                        }
                    },
                    {
                        table: 'sys_one_extend_capability_definition'
                        id: '6bf675a8d6fe4629b6b738ef69d229c0'
                        key: {
                            capability: '21abbb02639c44ffae6bcf195e4a27fc'
                            api: '936e514a53b3b110f028ddeeff7b128c'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '6c2a6add994642e6abe767834cfaae46'
                        key: {
                            name: 'kb_knowledge'
                            view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_gen_ai_feature_mapping'
                        id: '6d1840ef2a5a4d78ad1e539838db8619'
                        key: {
                            feature_name: 'T01 Throwaway Contract Extractor'
                            document: '21abbb02639c44ffae6bcf195e4a27fc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6d8fae74330c493290a4c47ba34ea43f'
                        key: {
                            document_key: '40b40fa7d1434d3696a78a61f29d3b6d'
                            variable: '516e57b99f1303002528d4b4232e700b'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '7311e5b4841e4d50a90d653644a8dadb'
                        key: {
                            sys_ui_form: {
                                id: '6c2a6add994642e6abe767834cfaae46'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'ca79d6a835124a9ca1caa56847e4245d'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Permission Design'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: '739374deb34e4995adebccc15fe2a34d'
                        deleted: true
                        key: {
                            agent_access_config: {
                                id: '20bf4d15b4984b0f8b1f68f4ccdb9e47'
                                key: {
                                    agent: 'c2600ef6216a4af88a119bcc6d5b1208'
                                }
                            }
                            role: {
                                id: '677a3bf6a39e4e86876a72f6f66a23c5'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '783db70453604cb989064109719d4a6a'
                        key: {
                            document_key: 'e8322785b2f34b359ef4ddc169e95ea4'
                            variable: 'b6d2b40c73720300c79260bdfaf6a786'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '790f1f87b20c49e6bb395f480f662a79'
                        key: {
                            document_key: '71a92c5b2b6e4f5ba0fcd3f5548da9e3'
                            variable: 'bc43e004c76733005e5c45b881c26046'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: '79848b53c529434fbd71f1465cb2e6dd'
                        key: {
                            parent_capability: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                            resource_capability: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7a6aa6c2ad2f4f76a38b81b617b97ce3'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: '0cd9df135320220002c6435723dc3426'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: '7b4134120ca24302b822c4e2be6d4e1a'
                        key: {
                            agent_access_config: {
                                id: '20bf4d15b4984b0f8b1f68f4ccdb9e47'
                                key: {
                                    agent: 'c2600ef6216a4af88a119bcc6d5b1208'
                                }
                            }
                            role: {
                                id: 'b481ed1023444c5e9509801bbbf7829a'
                                key: {
                                    name: 'atf_test_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7bc006faefd740ae8ce19df6d1aa92aa'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_inaccessible_user'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7bfaeb4a080045a88101ce8893bdda63'
                        key: {
                            document_key: '859fc31ad43e41f08706a22f533b3e40'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7c84d3a4ddd34b209580d2120fc7c81a'
                        key: {
                            document_key: 'a058c0f155de450d8a1bbc515bdce0ff'
                            variable: '83d1dadc73e703008e6b0d573cf6a779'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7d8e92afdd8146eaa274d55c34bf0c74'
                        key: {
                            sys_security_acl: 'ef10b822ca28413fa8d69029f82310c8'
                            sys_user_role: {
                                id: '1bd860fabf96480294557d42522ba3ea'
                                key: {
                                    name: 'atf_test_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7de4f264bf994f1ca876b935bbbf34b4'
                        key: {
                            name: 'kb_knowledge'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '7f0189a45f3c4931967987415566d150'
                        key: {
                            name: 'kb_knowledge'
                            caption: 'Specification Identity'
                            view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_one_extend_definition_config'
                        id: '831a314c52a242d6be7544e25d71835d'
                        key: {
                            definition: {
                                id: 'ca03f1dcf8fe4f3fbe0d6e75a3d08f21'
                                key: {
                                    capability: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                                    api: '936e514a53b3b110f028ddeeff7b128c'
                                }
                            }
                            capability: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '84961184172f4f3995b05279eaeb1e5b'
                        key: {
                            document_key: 'b1bfdd2ef3284ff0b908e784f3b6e670'
                            variable: '4aa838f25320220002c6435723dc34e1'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '84d64f068fdf49488b17f7231b97797b'
                        key: {
                            document_key: '43945742d8c743ea9dd2b49ff130cf51'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '88ce376174f14825bf14182acea72c29'
                        key: {
                            document_key: '4fde73de27fe4b3881c41bb44a25a2f6'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '892c0cfe330641b290ff1927b3ce2623'
                        key: {
                            document_key: '43047b3203b44df5864529d71554347a'
                            variable: '9b5b4e759f1303002528d4b4232e7026'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8a13c0d1da314f7daa4d1ee113564c27'
                        key: {
                            document_key: '302c62dd6b8e48c290600b2a17e7ae44'
                            variable: 'e0cc42b59f1303002528d4b4232e70f9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8a4d0b9fac9949838e925d2a7f3a3a54'
                        key: {
                            document_key: '302c62dd6b8e48c290600b2a17e7ae44'
                            variable: '9b5b4e759f1303002528d4b4232e7026'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8bbc81c33e2949be94f54c6afe6e5cf9'
                        key: {
                            document_key: '9d5b68c551984043a2693a43275bb208'
                            variable: '74d6e7a0a3023110571967d1361e616b'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '8cea468c628a4432af5d3b2e0c2dabf7'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_gen_ai_strategy_mapping'
                        id: '8d90e2fb9cda43fb8265f769696fcd24'
                        key: {
                            strategy: 'CAPABILITY_EXECUTION'
                            feature: {
                                id: '60c12cd42a484cfdb5a9ed8f7165bd81'
                                key: {
                                    feature_name: 'T01 Throwaway Independent Verifier'
                                    document: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '8edd3408b1cb4fc58c40c829585e4db2'
                        key: {
                            ai_config: '1bacd630db5c441c9984cc1311b6609a'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8f7e93e93982454087b4f1ac93e5bfae'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: '516e57b99f1303002528d4b4232e700b'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '913f61a0c1ad413a9479dad2ed954460'
                        key: {
                            ai_config: 'cfb77aa564d94886991bedc80087d40d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '935d95874d79408aacdc43c2d5c7cc60'
                        deleted: true
                        key: {
                            document_key: '78cb92ee66734ef3a878f70c36adf162'
                            variable: '27d4e1c25320220002c6435723dc3486'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '94caa2ad402d47648333ed8ac456599a'
                        key: {
                            sys_ui_section: {
                                id: '603a409e23844061af8294926e45b4f7'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Human Notes'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'text'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '94e7064e4a804d7a9e82ad5d52d1dc2f'
                        key: {
                            document_key: '4232059094fc440699f4d58f8db7111f'
                            variable: '3731d6dc73e703008e6b0d573cf6a788'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '987d2e15ff8d463188179443cccd48d5'
                        deleted: true
                        key: {
                            document_key: '78cb92ee66734ef3a878f70c36adf162'
                            variable: 'bb84ed825320220002c6435723dc3400'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '99b9ec38c00343f3be74379dd3d8238a'
                        key: {
                            document_key: '9d5b68c551984043a2693a43275bb208'
                            variable: 'ad351a4e53a0220002c6435723dc34f0'
                        }
                    },
                    {
                        table: 'sys_ui_view'
                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                        key: {
                            name: 'catalog_test_specification'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9abcd1076c9b490c97b89e61ce40876a'
                        key: {
                            document_key: 'e66be10607b145a5b53571b088200b2b'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9bdde0a5efcf4cdb8eee5b9a28f20fee'
                        key: {
                            document_key: '4232059094fc440699f4d58f8db7111f'
                            variable: 'ac615adc73e703008e6b0d573cf6a702'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a007cf6f17744c6d9c96ad6f82f5b5da'
                        deleted: true
                        key: {
                            sys_security_acl: 'ef10b822ca28413fa8d69029f82310c8'
                            sys_user_role: {
                                id: 'ed620cece6044deb8da4c4f195fe8e65'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a08e4b6f6f8941b6a1e16b1e32eac396'
                        key: {
                            name: 'kb_knowledge'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_status'
                        id: 'a0c6f37a9fb74c04878ea80f084dc0ae'
                        key: {
                            skill_config: {
                                id: '07fe314bf5594f89bcb9af6dcc2d6efd'
                                key: {
                                    skill_id: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a0ce23dd3da3413a8133208796f26470'
                        key: {
                            document_key: '9d5b68c551984043a2693a43275bb208'
                            variable: 'b124164e53a0220002c6435723dc34c5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a16554ca69184770a1e0c09fadd39049'
                        key: {
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'x_gemjp_atf_genera_schema_version'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a719188796f9440cb350f33cf280d9b7'
                        key: {
                            document_key: 'f07ab2c6dcc44279a29d48a4c70601b0'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a73c02d6db8b4bcfa738aa266be353ba'
                        key: {
                            name: 'kb_knowledge'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a9982b56bbc14eb3932e0152886e6140'
                        key: {
                            document_key: 'f07ab2c6dcc44279a29d48a4c70601b0'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a9ce2abafd6e44f4a683b9690a5f4ab0'
                        key: {
                            document_key: 'a058c0f155de450d8a1bbc515bdce0ff'
                            variable: '3a6e5fb15f1013001f1e1f9f2f7313e3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ab43b0a33b7b47828311ccbd41781ec2'
                        key: {
                            document_key: 'ddb04145a94e4ebfb51df531cf35d195'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'abec528651a246ee92ba5447cfedd40b'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ac1beef2d6fc4e0d8403d3b22611e725'
                        key: {
                            document_key: '4232059094fc440699f4d58f8db7111f'
                            variable: '83d1dadc73e703008e6b0d573cf6a779'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'aee297b0ce044229ba240918d56a797b'
                        key: {
                            document_key: '1dbcb8d2b19d4331ab54b9cf63c26bab'
                            variable: '2fba49d673142300688e0d573cf6a748'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'af06576b1ee5449cb508813e34d5cbc1'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_schema_version'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'af6d620305164a618b901e139830b3a7'
                        key: {
                            document_key: 'd554ca659ffe456a840bb405ee7c87df'
                            variable: 'd164adb48703030070870cf888cb0b30'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'aff8779128474373b6658866668364d2'
                        key: {
                            name: 'kb_knowledge'
                            view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b06c3b895c8343f9872de3c29f715ff4'
                        key: {
                            document_key: '71a92c5b2b6e4f5ba0fcd3f5548da9e3'
                            variable: '6619c7aa5320220002c6435723dc34e2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b2dc0fc2a72c4b69a53bac10a6509024'
                        key: {
                            document_key: '9d5b68c551984043a2693a43275bb208'
                            variable: 'c2eb56e853422110248dddeeff7b1261'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b5066ed7ce12426ead43575d3fdeada2'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: '592a17535320220002c6435723dc34d7'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'b5919d1afea04859bf4fb04c0cafd303'
                        key: {
                            sys_ui_action: 'c13a39021d033110f8779da9137d35b3'
                            sys_user_role: {
                                id: '87c99d3e691e4606b7a992ce25710dba'
                                key: {
                                    name: 'atf_test_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'b6dbb1448ec14342aae0b362a16d4b83'
                        key: {
                            question: {
                                id: '401fc4946f864c32a93cb390f4d84669'
                                key: {
                                    cat_item: '03000000000000000000000000000001'
                                    variable_set: 'NULL'
                                    name: 'load_driver'
                                }
                            }
                            value: 'post_open'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b79598862d42475d9a2902ecd689baec'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: 'fe5d9f799f1303002528d4b4232e70d7'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'b934181959524e6b92fc718b75d64427'
                        key: {
                            cat_item: '03000000000000000000000000000001'
                            variable_set: 'NULL'
                            name: 'residue_marker'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb0fa13ea75345f1a4b24690061c1cbd'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_catalog_item'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bb25e94a4c164e978ca582fb5a25ec9e'
                        key: {
                            document_key: '9d5b68c551984043a2693a43275bb208'
                            variable: '17d732a9c7a333005e5c45b881c26007'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: 'bc44a8bdd7094b969bb755cec87f97a3'
                        deleted: true
                        key: {
                            ai_config: '48128a9a794e4be4b414da310423b6da'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bdb19a0aae52478aa28a5961823dc508'
                        key: {
                            document_key: '859fc31ad43e41f08706a22f533b3e40'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: 'beea18ef7c4343cc9e46a77a3765aa14'
                        deleted: true
                        key: {
                            agent_access_config: {
                                id: 'dc170a00d6d74c3f86d0938f3a0a5d89'
                                key: {
                                    agent: '07fe314bf5594f89bcb9af6dcc2d6efd'
                                }
                            }
                            role: {
                                id: '6e8592847c944f598e980208541581ef'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config'
                        id: 'c2600ef6216a4af88a119bcc6d5b1208'
                        key: {
                            skill_id: '21abbb02639c44ffae6bcf195e4a27fc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c3ba93753a484c72ab4feca8e1004d50'
                        key: {
                            document_key: 'a058c0f155de450d8a1bbc515bdce0ff'
                            variable: '3731d6dc73e703008e6b0d573cf6a788'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c73464ee55764ef7b11c52990f2af6de'
                        key: {
                            document_key: 'e66be10607b145a5b53571b088200b2b'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c7ca2720bf334d6ca052efffbb7e8af8'
                        key: {
                            document_key: '71a92c5b2b6e4f5ba0fcd3f5548da9e3'
                            variable: 'ba62b4075320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_one_extend_capability_definition'
                        id: 'ca03f1dcf8fe4f3fbe0d6e75a3d08f21'
                        key: {
                            capability: 'd4e7afa5b20f4cf7972884ba0d7362a8'
                            api: '936e514a53b3b110f028ddeeff7b128c'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'ca79d6a835124a9ca1caa56847e4245d'
                        key: {
                            name: 'kb_knowledge'
                            caption: 'Permission Design'
                            view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'cb967b6221d0441a91e501df4fd21650'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'x_gemjp_atf_genera_schema_version'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: 'cc2ff3763ab14dfa8a8d6bb37137cc5d'
                        key: {
                            parent_capability: '21abbb02639c44ffae6bcf195e4a27fc'
                            resource_capability: '21abbb02639c44ffae6bcf195e4a27fc'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cce2e326e3f540e6bc01261b3adfeec3'
                        key: {
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'workflow_state'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cd8ba2e9124f4227a4ceef8fffb587db'
                        key: {
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ce0e98885787466a9e698dd02a48bbb9'
                        key: {
                            document_key: 'a359cd0ff6474df89d962df77b06d64b'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd09df039a84f40bc90ed669911012654'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_accessible_criteria'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd0efac3e18294b9b84110484365c962b'
                        key: {
                            document_key: '1dbcb8d2b19d4331ab54b9cf63c26bab'
                            variable: 'd164adb48703030070870cf888cb0b30'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd1fca9b0eedc4ecd9806647a054c6924'
                        key: {
                            document_key: '71a92c5b2b6e4f5ba0fcd3f5548da9e3'
                            variable: '56e6bee65320220002c6435723dc34b9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd6099435e82e49e4bf8ef738ef5a063f'
                        deleted: true
                        key: {
                            document_key: '78cb92ee66734ef3a878f70c36adf162'
                            variable: '6f2a59a4e7133300b5646ea8c2f6a975'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd89f8c55d2b0491a8efa8c3a8d60bd1c'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: '00eb17799f1303002528d4b4232e70fe'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'da335bccd96145cd9b2140890e2f3ceb'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: 'b4de97b99f1303002528d4b4232e7077'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dae7845636254d949760e5d92a9878fd'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_inaccessible_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: 'db3264e3fefa471fba6eec3662356887'
                        deleted: true
                        key: {
                            ai_config: '4afca767c617449d8f59e0b05b950afa'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'db81e584b5e94b958a9022d9403f75ce'
                        key: {
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'short_description'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dbd8e23811384489b787b0249673db68'
                        key: {
                            document_key: '1dbcb8d2b19d4331ab54b9cf63c26bab'
                            variable: '3f3525f48703030070870cf888cb0b37'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dbde120e64d144b09d6ed980bad6ced7'
                        key: {
                            document_key: '36b49a7b50ff4944b8c92b3fac141bbc'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: 'dc170a00d6d74c3f86d0938f3a0a5d89'
                        key: {
                            agent: '07fe314bf5594f89bcb9af6dcc2d6efd'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'df8da8b23c054193a879af777e69335f'
                        key: {
                            sys_ui_form: {
                                id: '6c2a6add994642e6abe767834cfaae46'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_action_view'
                        id: 'df991f2fc25b4dbfb5c8f6239b03bf02'
                        deleted: true
                        key: {
                            sys_ui_action: 'd17420ae269f42eb869abcc69bf16842'
                            sys_ui_view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e109121a75c942f7b0389fbf04c5e203'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: 'e81ad3535320220002c6435723dc340c'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e2a0559e34a442d6b7d212afc368b8db'
                        key: {
                            sys_ui_section: {
                                id: 'ca79d6a835124a9ca1caa56847e4245d'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Permission Design'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'x_gemjp_atf_genera_accessible_user'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e2fabc3ffc4a49f5a0d9a77b4d498791'
                        key: {
                            document_key: 'd554ca659ffe456a840bb405ee7c87df'
                            variable: '2fba49d673142300688e0d573cf6a748'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e7224cd7e3a14747b0aa1930d81083ff'
                        key: {
                            sys_security_acl: '5313f34858cf4ed0a87b72ae6b4bfb80'
                            sys_user_role: {
                                id: '840b0e163cf1447098ddc8ba37ae36bb'
                                key: {
                                    name: 'atf_test_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e8a9addddba44269b1c398519f770599'
                        key: {
                            document_key: 'd374616fbcac415ca6e17f7664575e90'
                            variable: 'b1fefcde73633300b19898b8caf6a7af'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e9a53910bf2f47c08e212eda535b5ecc'
                        key: {
                            document_key: 'dac4f7b74b3a446ab24467dbf9210412'
                            variable: '080e93b99f1303002528d4b4232e706d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e9ef59267cbd4a328cfba131d2c01bea'
                        key: {
                            document_key: 'a359cd0ff6474df89d962df77b06d64b'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_one_extend_definition_config'
                        id: 'ef6f1e1b016848898871559193d6d158'
                        key: {
                            definition: {
                                id: '6bf675a8d6fe4629b6b738ef69d229c0'
                                key: {
                                    capability: '21abbb02639c44ffae6bcf195e4a27fc'
                                    api: '936e514a53b3b110f028ddeeff7b128c'
                                }
                            }
                            capability: '21abbb02639c44ffae6bcf195e4a27fc'
                        }
                    },
                    {
                        table: 'sys_ui_action_view'
                        id: 'f199138e7fc742cd846f55f94aaa69d0'
                        deleted: true
                        key: {
                            sys_ui_action: '80c8c3a60a0a0b34003364513f7d9d27'
                            sys_ui_view: {
                                id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                key: {
                                    name: 'catalog_test_specification'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f280669438b04a23b39929bc62dd59ad'
                        key: {
                            document_key: '8c65d68a22674058a18caf7053788f69'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f539f6d82c5849e7a24d16cdcb968a42'
                        key: {
                            document_key: '4232059094fc440699f4d58f8db7111f'
                            variable: '3a6e5fb15f1013001f1e1f9f2f7313e3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f5f7364ff63349b1b9e239588863ab4f'
                        key: {
                            document_key: '9d5b68c551984043a2693a43275bb208'
                            variable: '6e55da4e53a0220002c6435723dc34a0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f616b934faf141e19ae18919e74669a7'
                        key: {
                            name: 'kb_knowledge'
                            element: 'x_gemjp_atf_genera_inaccessible_criteria'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f7b416fa5adb4ffd88a6321c84c7eed0'
                        key: {
                            sys_ui_section: {
                                id: 'ca79d6a835124a9ca1caa56847e4245d'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Permission Design'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'x_gemjp_atf_genera_accessible_criteria'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f86ba107e888437391df8094c048c6dd'
                        key: {
                            document_key: 'de97c29f7fa24a7696c06d9dcf32c3b1'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f8a95a7fef1e41c1b0c9a90258ea3003'
                        key: {
                            document_key: '6e81b0e4029449f8a618280ac6873d5d'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fc4d85165e0144088de9fbc0b0514173'
                        key: {
                            sys_ui_section: {
                                id: '7f0189a45f3c4931967987415566d150'
                                key: {
                                    name: 'kb_knowledge'
                                    caption: 'Specification Identity'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'x_gemjp_atf_genera_catalog_item'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fd066e4434a6499ba87689a64f2794e9'
                        key: {
                            document_key: 'ddb04145a94e4ebfb51df531cf35d195'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'ff4bed6b9ba54127bf72f341343f9262'
                        key: {
                            cat_item: '03000000000000000000000000000001'
                            variable_set: 'NULL'
                            name: 'load_result'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ff9715c50c624b3f89bb92795d272b0a'
                        key: {
                            list_id: {
                                id: 'aff8779128474373b6658866668364d2'
                                key: {
                                    name: 'kb_knowledge'
                                    view: {
                                        id: '9a8c8e73fc7443949d4fc1bda27b6b85'
                                        key: {
                                            name: 'catalog_test_specification'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'workflow_state'
                        }
                    },
                ]
            }
        }
    }
}

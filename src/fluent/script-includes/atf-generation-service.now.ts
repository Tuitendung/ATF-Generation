import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['AtfGenerationService'],
    name: 'AtfGenerationService',
    description:
        'Generation service that binds exact Specification inputs to complete OOB Accessible and Inaccessible Test graphs.',
    script: Now.include('../../server/script-includes/atf-generation-service.js'),
    accessibleFrom: 'package_private',
    active: true,
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
})

import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'scorm-viewer',
    outputTargets: [
        {
            type: 'dist'
        },
        {
            type: 'www',
            serviceWorker: null
        }
    ]
};

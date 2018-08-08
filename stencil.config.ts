import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'scormviewer',
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

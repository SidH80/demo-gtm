import React from 'react';
import Loading from './index';

export default {
    title: 'RCL/Components/Loading',
    component: Loading,
    parameters: {
        docs: {
            description: {
                component:
                    'This class creates a component, which triggers when a page is loading, and displays a loading spinner CSS icon and "Loading" text. It has been retrofitted from the existing spinner in the BALDUE MPV, for compatibility in React.',
            },
        },
    },
};

export const Default = () => <Loading />;

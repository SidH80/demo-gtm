import React from 'react';
import Checkbox from './Checkbox';

export default {
    title: 'RCL/Components/Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component:
                    'A single checkbox component used when the user is able to select more than one option. It can be controlled or uncontrolled.',
            },
        },
    },
};

export const Default = () => {
    return <Checkbox name='approve' />;
};

export const WithLabel = () => {
    return <Checkbox name='approve' label='Testing Label' />;
};

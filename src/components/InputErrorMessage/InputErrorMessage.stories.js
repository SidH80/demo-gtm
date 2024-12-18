import React from 'react';
import InputErrorMessage from './InputErrorMessage';

export default {
    title: 'RCL/Components/InputErrorMessage',
    component: InputErrorMessage,
    parameters: {
        docs: {
            description: {
                component:
                    'This component renders an input error message that will be used by other input components.',
            },
        },
    },
};

export const Default = () => {
    return <InputErrorMessage errorMessage='This is an input error message' />;
};

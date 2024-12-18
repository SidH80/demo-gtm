import React, { createRef } from 'react';
import MaskedInput from './MaskedInput';

export default {
    title: 'RCL/Components/MaskedInput',
    component: MaskedInput,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is a masked input field that automatically formats input to a MM/DD/YYYY format.',
            },
        },
    },
};

export const DefaultMaskedInput = props => {
    const handleKeyUp = e => {
        alert('Handling the onKeyUp event.', e.target.value);
    };

    const handleKeyDown = e => {
        alert('Handling the onKeyDown event.', e.target.value);
    };

    return (
        <MaskedInput
            ref={createRef()}
            {...props}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
        />
    );
};

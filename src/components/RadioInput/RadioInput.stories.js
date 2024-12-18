import React from 'react';
import RadioInput from './RadioInput';

export default {
    title: 'RCL/Components/RadioInput',
    component: RadioInput,
    parameters: {
        docs: {
            description: {
                component:
                    "This component creates an HTML form element group consisting of a radio and text input field, labels for each, and a message to the user displaying information regarding validation errors for the text input. It receives the props 'onChange' and 'onFocus' to handle the 'change' event on the text input, and the 'focus' event on the radio input respectively. Validation handler for the text input should be a function passed as the 'onChange' prop from the parent.",
            },
        },
    },
};

export const Default = () => {
    return (
        <RadioInput
            id='radio-3'
            inputFieldError=''
            inputFieldName='dlnInput3'
            inputFieldLabel='Control Number'
            inputFieldHelperText={
                <React.Fragment>
                    Enter the 14-digit control number provided on your letter.
                    <span className='sr-only'>Numerical input required</span>
                </React.Fragment>
            }
            label='Maybe'
            value='Maybe'
        />
    );
};

import React, { useRef } from 'react';
import RadioInputNew from './RadioInputNew';

export default {
    title: 'RCL/Components/RadioInputNew',
    component: RadioInputNew,
    parameters: {
        docs: {
            description: {
                component:
                    "This component creates an HTML form element group consisting of a radio and text input field, labels for each, and a message to the user displaying information regarding validation errors for the text input. It receives the props 'filter' 'onInput' and 'onFocus' to filter and handle the 'input' event on the text input, and the 'focus' event on the radio input respectively. Validation handler for the text input should be a function returning a bool passed as the 'filter' prop from the parent.",
            },
        },
    },
};

export const Default = () => {
    const helperText = (
        <React.Fragment>
            Enter the last 4 digits of the account number listed on your return.
            Do not use prepaid card numbers in this field.
            <span className='sr-only'>Numerical input required.</span>
        </React.Fragment>
    );
    const filterQuestion10 = value => {
        const regex = /^\d{0,4}$/;
        return regex.test(value);
    };
    const inputRef = useRef();
    const inputDefaultValue = '123';

    return (
        <RadioInputNew
            id='bank-acct-radio-yes'
            name='question9'
            label='Yes'
            value='Y'
            filter={filterQuestion10}
            inputFieldName='question10'
            inputFieldClass='question10'
            inputFieldLabel='Direct Deposit Account Number'
            inputFieldHelperText={helperText}
            inputDefaultValue={inputDefaultValue}
            inputRef={inputRef}
        />
    );
};

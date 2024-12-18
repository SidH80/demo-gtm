import React, { useState } from 'react';
import DateField from './DateField';

export default {
    title: 'RCL/Components/DateField',
    component: DateField,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is the date input component complete with self validation and formatting it does not allow users to input numbers and letters, and ensures that anything that they enter is in the MM/DD/YYYY format, it also displays relevant errors to the user when they provide improper input',
            },
        },
    },
};

export const DefaultDateField = () => {
    const [message, setMessage] = useState('');

    return (
        <>
            <DateField
                required
                handleDateFieldChange={() =>
                    setMessage('You have updated the date')
                }
            />
            <p>{message}</p>
        </>
    );
};

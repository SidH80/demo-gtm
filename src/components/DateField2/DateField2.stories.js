import React, { useRef } from 'react';
import DateField from './DateField2';

export default {
    title: 'RCL/Components/DateField2',
    component: DateField,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is the generic date input component complete with self validation and formatting it does not allow users to input numbers and letters, and ensures that anything that they enter is in the MM/DD/YYYY format, it also displays relevant errors to the user when they provide improper input',
            },
        },
    },
};

export const DefaultDateField = () => {
    const maskedInputRef = useRef(null);

    return (
        <>
            <DateField
                disableWeekendsAndHolidays={false}
                disabledDates={['02/22/2024']}
                dateFormat={'MM/DD/YYYY'}
                maxLength={10}
                size={12}
                immediatePropagate={true}
                maskedInputRef={maskedInputRef}
                required={true}
                propagateHolidays={() => {}}
            />
        </>
    );
};

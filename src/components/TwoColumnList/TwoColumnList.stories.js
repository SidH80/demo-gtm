import React from 'react';
import TwoColumnList from './TwoColumnList';

export default {
    title: 'RCL/Components/TwoColumnList',
    component: TwoColumnList,
    parameters: {
        docs: {
            description: {
                component:
                    "This component renders a table structure with two columns. The component lists out the contents the data object in key-value pairs (ex. Row: { 1: ,'a'}).",
            },
        },
    },
};

const Template = args => {
    return <TwoColumnList {...args} />;
};
const bankAcctData = [
    ['Name on Bank Account', 'Checking'],
    ['Routing Number', '12345676'],
    ['Account Number', '123456778'],
];
export const Default = Template.bind({});
Default.args = {
    colWidths: ['60%', '40%'],
    data: bankAcctData,
};

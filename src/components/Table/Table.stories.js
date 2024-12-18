import React from 'react';
import Table from './Table';

export default {
    title: 'RCL/Components/Table',
    component: Table,
    parameters: {
        docs: {
            description: {
                component:
                    'This component renders a simple table with equally spaced elements. The data passed in as a header is going to be rendered in bold text while the rest will be rendered as given. Adding a title will place one above the table and will indent the table slightly to the left.',
            },
        },
    },
};

const Template = args => {
    return <Table {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    title: 'Test Data',
    headerCols: ['A', 'B', 'C'],
    dataRows: [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
    ],
};

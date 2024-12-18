import React from 'react';
import SadCloud from './SadCloud';

export default {
    title: 'RCL/Components/SadCloud',
    component: SadCloud,
    parameters: {
        docs: {
            description: {
                component:
                    "This class creates a component that displays a 'sad cloud' message and image to the user if the OLA service is unavailable.",
            },
        },
    },
};

const Template = args => {
    return <SadCloud {...args} />;
};
export const Default = Template.bind({});
Default.args = {};

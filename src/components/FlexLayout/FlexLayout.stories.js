import React from 'react';
import FlexLayout from './';

export default {
    title: 'RCL/Components/FlexLayout',
    component: FlexLayout,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is responsible for creating a flex based layout where there must be one element in the below tree with a style of flex: 1 1 auto. This will cause there to be a sticky footer, matching the desired IRS layout.',
            },
        },
    },
};

export const Default = () => (
    <FlexLayout>
        <div>
            <p>Test Content</p>
        </div>
    </FlexLayout>
);

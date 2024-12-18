import React from 'react';

import AlertBox from './AlertBox';

export default {
    title: 'RCL/Components/AlertBox',
    component: AlertBox,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is responsible for creating a box that the alert/info message lives in. It is a component that will display an alert and/or info message to the user.',
            },
        },
    },
};

export const Info = () => (
    <AlertBox
        title='Info'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id dui non mi malesuada pretium ut vel massa. Vivamus in luctus sem, sed accumsan nulla. Nunc nec lectus ac lorem dapibus egestas.'
    />
);

export const Warning = () => (
    <AlertBox
        isWarning
        title='Warning'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id dui non mi malesuada pretium ut vel massa. Vivamus in luctus sem, sed accumsan nulla. Nunc nec lectus ac lorem dapibus egestas.'
    />
);

export const Error = () => (
    <AlertBox
        isError
        title='Error'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id dui non mi malesuada pretium ut vel massa. Vivamus in luctus sem, sed accumsan nulla. Nunc nec lectus ac lorem dapibus egestas.'
    />
);

export const Header = () => (
    <AlertBox
        isHeader
        title='Header'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id dui non mi malesuada pretium ut vel massa. Vivamus in luctus sem, sed accumsan nulla. Nunc nec lectus ac lorem dapibus egestas.'
    />
);

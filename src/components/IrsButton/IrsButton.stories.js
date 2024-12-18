// IrsButton.stories.js|jsx

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import IrsButton from './IrsButton';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'RCL/Components/IrsButton',
    component: IrsButton.WrappedComponent,
};

export const Default = () => (
    <BrowserRouter>
        <IrsButton buttonText='Hello World' />
    </BrowserRouter>
);

export const PrintButton = () => (
    <BrowserRouter>
        <IrsButton buttonText='Print' isPrintIcon />
    </BrowserRouter>
);

export const NewWindowButton = () => (
    <BrowserRouter>
        <IrsButton newWindow />
    </BrowserRouter>
);

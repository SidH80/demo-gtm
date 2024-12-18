import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import EmphasisTag from './EmphasisTag';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'RCL/Components/EmphasisTag',
    component: EmphasisTag.WrappedComponent,
};

export const Default = () => (
    <BrowserRouter>
        <EmphasisTag>Irap Approved</EmphasisTag>
    </BrowserRouter>
);

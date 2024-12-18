// IrsLogo.stories.js|jsx

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import IrsLogo from './IrsLogo';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'RCL/Components/IrsLogo',
    component: IrsLogo,
};

export const Default = () => (
    <div
        style={{
            backgroundColor: '#002346',
            width: 'fit-content',
            padding: '20px',
        }}>
        <BrowserRouter>
            <IrsLogo />
        </BrowserRouter>
    </div>
);

export const HeaderLogo = () => (
    <div
        style={{
            backgroundColor: '#00599c',
            width: 'fit-content',
            padding: '20px',
        }}>
        <BrowserRouter>
            <IrsLogo logoUrl='#' logoAlt='The logo of this website' />
        </BrowserRouter>
    </div>
);

export const FooterLogo = () => (
    <div
        style={{
            backgroundColor: '#1b1b1b',
            width: 'fit-content',
            padding: '20px',
        }}>
        <BrowserRouter>
            <IrsLogo footer logoAlt='IRS Footer Logo' />
        </BrowserRouter>
    </div>
);

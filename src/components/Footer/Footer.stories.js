// Footer.stories.js|jsx

import React from 'react';

import Footer from './Footer';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'RCL/Components/Footer',
    component: Footer,
};

export const NoLinks = () => <Footer />;

export const With2Links = () => (
    <Footer
        footerLinks={[
            {
                id: 'link1',
                linkDisplayText: 'Link 1',
                linkDestination: 'Link1',
                linkDescription: 'Link 1 link.',
                newWindow: false,
            },
            {
                id: 'link2',
                linkDisplayText: 'Link 2',
                linkDestination: 'Link2',
                linkDescription: 'Link 2 link.',
                newWindow: true,
            },
        ]}
    />
);

export const With3Links = () => (
    <Footer
        footerLinks={[
            {
                id: 'link1',
                linkDisplayText: 'Link 1',
                linkDestination: 'Link1',
                linkDescription: 'Link 1 link.',
                newWindow: false,
            },
            {
                id: 'link2',
                linkDisplayText: 'Link 2',
                linkDestination: 'Link2',
                linkDescription: 'Link 2 link.',
                newWindow: false,
            },
            {
                id: 'link3',
                linkDisplayText: 'Link 3',
                linkDestination: 'Link3',
                linkDescription: 'Link 3 link.',
                newWindow: true,
            },
        ]}
    />
);

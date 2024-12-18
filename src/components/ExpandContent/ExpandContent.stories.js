import React from 'react';
import ExpandContent from './ExpandContent';

export default {
    title: 'RCL/Components/ExpandContent',
    component: ExpandContent,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is responsible for creating a div that is collapsible/expandable to read more or read less content.',
            },
        },
    },
};

export const Default = () => {
    return (
        <ExpandContent
            collapsedText='This is default collapsed text ...'
            collapsedLinkText='Read more'
            expandedLinkText='Read less'
            collapsedLinkAriaLabel='Test 1'
            expandedLinkAriaLabel='Test 2'
            onOpen={() => {}}
            onClose={() => {}}>
            <p className='test1'>Expand content test</p>
        </ExpandContent>
    );
};

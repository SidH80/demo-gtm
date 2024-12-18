import React from 'react';

import PaginationNav from './PaginationNav';

export default {
    title: 'RCL/Components/PaginationNav',
    component: PaginationNav,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is responsible for creating a box that the alert/info message lives in. It is a component that will display an alert and/or info message to the user.',
            },
        },
    },
};

export const Default = () => (
    <PaginationNav
        // paginationLabel='sample label'
        currentPage={3}
        totalPages={15}
        handleNextClick={() => alert('clicked next')}
        handlePrevClick={() => alert('clicked prev')}
        prevAriaLabel='sample prev aria label'
        nextAriaLabel='sample next aria label'
        // prevLinkLabel='sample prev link label'
        // nextLinkLabel='sample next link label'
    />
);

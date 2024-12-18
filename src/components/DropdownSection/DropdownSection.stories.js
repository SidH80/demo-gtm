import React from 'react';
import DropDownSection from './DropdownSection';

export default {
    title: 'RCL/Components/DropDownSection',
    component: DropDownSection,
    parameters: {
        docs: {
            description: {
                component:
                    'This class is responsible for rendering a section of items in a dropdown menu. It should be given an array of link objects that will then be rendered into the dropdown menu. The DropdownSection will render a line below it to show that the section is over.',
            },
        },
    },
};

export const Default = () => {
    const testLinks = [
        {
            id: 'a',
            linkDescription: 'test',
            linkDestination: '#',
            linkDisplayText: 'Test1',
            icon: null,
        },
        {
            id: 'b',
            linkDescription: 'test',
            linkDestination: '#',
            linkDisplayText: 'Test2',
            icon: null,
        },
    ];
    return <DropDownSection links={testLinks}></DropDownSection>;
};

export const WithIcon = () => {
    const link = {
        id: 'test1',
        linkDisplayText: 'Test',
        linkDestination: '/test',
        linkDescription: 'Test',
        newWindow: false,
        icon: <p id='testing-icon'>Test Icon</p>,
    };
    return <DropDownSection links={[link]}></DropDownSection>;
};

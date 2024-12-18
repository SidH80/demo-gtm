import React, { useState } from 'react';
import AccordionRow from './AccordionRow';

export default {
    title: 'RCL/Components/AccordionRow',
    component: AccordionRow,
    parameters: {
        docs: {
            description: {
                component:
                    'This component renders an expandable accordion row inside whatever container it is placed in. You are able to place it in a div and let it exist by itself, or by placing it as a row in a table. If you pass the row a content prop with text, it will display the text. You can also pass it HTML and it will render that HTML.',
            },
        },
    },
};

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);

    const info = (
        <ul>
            <li>Test 1</li>
        </ul>
    );

    return (
        <AccordionRow
            content='Test data'
            headerLevel={4}
            onClick={() => setIsOpen(!isOpen)}
            open={isOpen}
            ariaLabel='Test data'
            expandedContent={info}
            contentStyles={{
                marginTop: '0px',
                marginRight: '32px',
                marginBottom: '24px',
                marginLeft: '32px',
            }}
            bounded
        />
    );
};

export const MultipleRows = () => {
    const [active, setActive] = useState(null);

    const info = (
        <ul>
            <li>Test 1</li>
            <li>Test 2</li>
            <li>Test 3</li>
        </ul>
    );

    return (
        <>
            <AccordionRow
                content='Test data'
                headerLevel={4}
                onClick={() => setActive(0)}
                open={active === 0}
                ariaLabel='Test data'
                expandedContent={info}
                contentStyles={{
                    marginTop: '0px',
                    marginRight: '32px',
                    marginBottom: '24px',
                    marginLeft: '32px',
                }}
                bounded
            />
            <AccordionRow
                content='Test data'
                headerLevel={4}
                onClick={() => setActive(1)}
                open={active === 1}
                ariaLabel='Test data'
                expandedContent={info}
                contentStyles={{
                    marginTop: '0px',
                    marginRight: '32px',
                    marginBottom: '24px',
                    marginLeft: '32px',
                }}
                bounded
            />
        </>
    );
};

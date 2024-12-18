import React, { useState } from 'react';
import HelptipGroup from './HelptipGroup';

export default {
    title: 'RCL/Components/HelptipGroup',
    component: HelptipGroup,
};

export const Functional = () => {
    const [isOpen, setIsOpen] = useState(true);
    const content = (
        <p className='test'>
            This is a helptip. Helptips display additional information regarding
            a topic.
        </p>
    );
    return (
        <HelptipGroup
            open={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            content={content}
            index={1}
        />
    );
};

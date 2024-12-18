import React, { useState } from 'react';
import ExpandableCheckbox from './ExpandableCheckbox';

export default {
    title: 'RCL/Components/ExpandableCheckBox',
    component: ExpandableCheckbox,
    parameters: {
        docs: {
            description: {
                component:
                    'Checkbox component that when checked,renders additional content underneath, similar to an expandable accordion',
            },
        },
    },
};

export const Template = () => {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <ExpandableCheckbox
            id='expanded-checkbox'
            label='Click to Expand'
            checked={isClicked}
            onClick={() => setIsClicked(!isClicked)}
            required>
            <>
                <h2>This is a test</h2>
                <p>Test Content</p>
            </>
        </ExpandableCheckbox>
    );
};

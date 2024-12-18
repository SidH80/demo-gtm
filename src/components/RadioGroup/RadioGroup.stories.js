import React, { useState } from 'react';
import Radio from '../Radio/Radio';
import RadioGroup from './RadioGroup';

export default {
    title: 'RCL/Components/RadioGroup',
    component: RadioGroup,
};

export const Default = () => {
    const [selectionIndex, setSelectionIndex] = useState('');
    const storeSelectedOption = selectedOption => {
        return { type: 'default Option', selectedOption };
    };

    const handleRadioClick = e => {
        setSelectionIndex(storeSelectedOption(e.target.value));
    };

    return (
        <>
            <RadioGroup
                id
                name='longTermPlan'
                onChange={handleRadioClick}
                legend={'Radio Group Test'}
                renderLegend>
                <>
                    <Radio
                        id='1'
                        value='1'
                        label={[<span>Option 1</span>]}
                        checked={selectionIndex === '0'}
                    />
                    <Radio
                        id='2'
                        value='2'
                        label={[<span>Option 2</span>]}
                        checked={selectionIndex === '1'}
                    />
                    <Radio
                        id='3'
                        value='3'
                        label={[<span>Option 3</span>]}
                        checked={selectionIndex === '3'}
                    />
                </>
            </RadioGroup>
        </>
    );
};

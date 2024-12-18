import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import FocusTrap from './FocusTrap';
import IrsButton from '../IrsButton';
import InputControl from '../InputControl';
import InputLabel from '../InputLabel';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';

export default {
    title: 'RCL/Components/FocusTrap',
    component: FocusTrap,
    parameters: {
        docs: {
            description: {
                component:
                    "This component is designed to direct focus onto wrapped components. This is helpful when the application intends for the user to perform an action before they may resume any actions within the application. This is especially relevant when a user is prompted for input. This component's functionality is supported by the FocusTrapService.",
            },
        },
    },
};

export const DefaultFocusTrap = () => {
    const [selectionRadio1, setSelectionRadio1] = useState('1');
    const [selectionRadio2, setSelectionRadio2] = useState('5');
    const handleRadio1Change = e => {
        setSelectionRadio1(e.target.value);
    };
    const handleRadio2Change = e => {
        setSelectionRadio2(e.target.value);
    };

    return (
        <>
            <FocusTrap>
                <form>
                    <InputLabel htmlFor='username' label='Username' />
                    <InputControl name='username' />

                    <br />

                    <InputLabel htmlFor='password' label='Password' />
                    <InputControl name='password' />

                    <br />

                    <BrowserRouter>
                        <IrsButton buttonText='Hello World' />
                    </BrowserRouter>
                    <br />
                    <br />
                    <RadioGroup
                        name='test1'
                        defaultSelection='1'
                        legend='Test Group 1'
                        onChange={handleRadio1Change}
                        renderLegend={true}>
                        <Radio
                            id='1'
                            value='1'
                            checked={selectionRadio1 === '1'}
                            label={'Radio 1'}
                        />
                        <Radio
                            id='2'
                            value='2'
                            checked={selectionRadio1 === '2'}
                            label={'Radio 2'}
                        />
                        <Radio
                            id='3'
                            value='3'
                            checked={selectionRadio1 === '3'}
                            label={'Radio 3'}
                        />
                    </RadioGroup>

                    <RadioGroup
                        name='test2'
                        defaultSelection='5'
                        legend='Test Group 2'
                        onChange={handleRadio2Change}
                        renderLegend={true}>
                        <Radio
                            id='4'
                            value='4'
                            checked={selectionRadio2 === '4'}
                            label={'Radio 1'}
                        />
                        <Radio
                            id='5'
                            value='5'
                            checked={selectionRadio2 === '5'}
                            label={'Radio 2'}
                        />
                    </RadioGroup>
                </form>
            </FocusTrap>
        </>
    );
};

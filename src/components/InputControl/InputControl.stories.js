import React, { useRef } from 'react';
import InputLabel from '../InputLabel/InputLabel';
import InputControl from './InputControl';

export default {
    title: 'RCL/Components/InputControl',
    component: InputControl,
    parameters: {
        docs: {
            description: {
                component:
                    'This component renders an input control with input validation.',
            },
        },
    },
};

export const Default = () => {
    const testAmountRef = useRef();

    return (
        <>
            <InputLabel label='Test' required htmlFor='test' />
            <InputControl
                id='test'
                name='test'
                className='test'
                ariaLabel='test Input'
                placeholder={'$'}
                inputRef={testAmountRef}
                defaultValue='1000'
            />
        </>
    );
};

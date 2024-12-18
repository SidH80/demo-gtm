import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Modal } from './Modal';
import { ModalBody, ModalHeader } from './subcomponents';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';
import IrsButton from '../IrsButton';

export default {
    title: 'RCL/Components/Modal',
    component: Modal,
    parameters: {
        docs: {
            description: {
                component:
                    'Used to render an overlay with popup content across the application. It will be appended to the body element in the DOM.',
            },
        },
    },
};

export const Default = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [selectionRadio1, setSelectionRadio1] = useState('1');
    const handleRadio1Change = e => {
        setSelectionRadio1(e.target.value);
    };

    return (
        <>
            {isModalVisible ? (
                <Modal
                    ariaCloseLabel='Close this dialog'
                    onClose={() => setIsModalVisible(false)}>
                    <ModalHeader>This is the header</ModalHeader>
                    <ModalBody>
                        This is the body, click anywhere or on the "x" to close
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
                        <BrowserRouter>
                            <IrsButton buttonText='Cancel' />
                        </BrowserRouter>
                        <BrowserRouter>
                            <IrsButton buttonText='Submit' />
                        </BrowserRouter>
                    </ModalBody>
                </Modal>
            ) : (
                <button onClick={() => setIsModalVisible(true)}>
                    Show the modal
                </button>
            )}
        </>
    );
};

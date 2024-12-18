import React, { useState } from 'react';
import TimeoutModal from './TimeoutModal';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'RCL/Components/TimeoutModal',
    component: TimeoutModal,
    parameters: {
        docs: {
            description: {
                component:
                    'Used to render an overlay with popup content across the application asking the user if they need more time. It will be appended to the body element in the DOM.',
            },
        },
    },
};

export const Default = () => {
    const [isTimeoutModalVisible, setIsTimeoutModalVisible] = useState(true);
    return (
        <>
            {isTimeoutModalVisible ? (
                <MemoryRouter>
                    <TimeoutModal
                        continueText='Yes'
                        continueFunction={() => setIsTimeoutModalVisible(false)}
                        endText='No, logout'
                        promptText='Do you need more time?'
                        countDownText='Your session will expire in'
                        closeBtnAriaLabel='Close Timeout Message.'
                    />
                </MemoryRouter>
            ) : (
                <button onClick={() => setIsTimeoutModalVisible(true)}>
                    Show the Timeout modal
                </button>
            )}
        </>
    );
};

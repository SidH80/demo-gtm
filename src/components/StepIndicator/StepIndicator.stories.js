import React from 'react';
import StepIndicator from './StepIndicator';

export default {
    title: 'RCL/Components/StepIndicator',
    component: StepIndicator,
};

export const Default = () => {
    let currStep = 1;
    const titles = ['Plan Summary', 'Terms and Conditions', 'Plan Approval'];
    function onKnotClickFunction(stepNum) {
        if (stepNum >= titles.length + 1) {
            currStep = 1;
        } else {
            currStep += 1;
        }
        alert(currStep);
    }

    return (
        <StepIndicator
            titles={titles}
            currentStep={currStep}
            onKnotClick={onKnotClickFunction(currStep)}
        />
    );
};

import React from 'react';
import PropTypes from 'prop-types';
import StepIndicatorItem from '../StepIndicatorItem';
import './StepIndicator.css';

const StepIndicator = ({
    titles,
    currentStep,
    onKnotClick,
    heading_one,
    heading_two,
    screenReaderStatus
}) => {
    let stepIndicatorHeading =
        heading_one +
        currentStep +
        heading_two +
        titles.length +
        ': ' +
        titles[currentStep - 1];

    return (
        <div className='stepIndicator-wrapper'>
            <h2 className='stepIndicator-heading'>
                {/* Step {currentStep} of {titles.length}: {titles[currentStep - 1]} */}
                {stepIndicatorHeading}
            </h2>

            <nav aria-label='Progress Tracker' role='navigation'>
                <ol role='list' className='stepIndicator-flexWrap'>
                    {titles.map((title, index) => {
                        const stepNum = index + 1;

                        let status = 'not_active';

                        if (currentStep === titles.length) {
                            status = currentStep === stepNum ? 'active' : 'finished';
                        } else if (currentStep === stepNum) {
                            status = 'active';
                        } else if (currentStep > stepNum) {
                            status = 'completed';
                        }

                        return (
                            <StepIndicatorItem
                                key={index}
                                title={title}
                                stepNum={stepNum}
                                onKnotClick={onKnotClick}
                                status={status}
                                screenReaderStatus={screenReaderStatus[status]}
                            />
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default StepIndicator;

StepIndicator.propTypes = {
    titles: PropTypes.array,
    currentStep: PropTypes.number,
    onKnotClick: PropTypes.func,
    heading_one: PropTypes.string,
    heading_two: PropTypes.string,
    screenReaderStatus: PropTypes.object
};

StepIndicator.defaultProps = {
    titles: [],
    currentStep: 1,
    onKnotClick: () => {},
    heading_one: 'Step ',
    heading_two: ' of ',
    screenReaderStatus: {
        active: 'active',
        completed: 'completed',
        finished: 'finished',
        not_active: 'not active',
    }
};

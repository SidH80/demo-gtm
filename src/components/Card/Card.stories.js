import React from 'react';
import Card from './Card';
import IrsButton from '../IrsButton';
import IrsLink from '../IrsLink';
import HelptipIcon from '../HelptipIcon';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'RCL/Components/Card',
    component: Card,
};

export const Default = () => {
    return (
        <Router>
            <Card headerText='Pay Now'>
                <h3>No setup fee</h3>
                <h3>
                    Avoid additional penalties and interest from accruing
                    <div>
                        <IrsLink
                            newWindow
                            linkDisplayText='Learn more'
                            blue
                            noPadding
                            linkDestination='/'
                            linkDescription='This is a dead link that goes nowhere.'
                        />
                    </div>
                </h3>
                <h3>Pay off amount owed today</h3>
                <div className='card--linkContainer card--multiLink'>
                    <h3>
                        Pay By Bank Account <HelptipIcon />
                    </h3>
                    <IrsButton buttonText='GO TO IRS DIRECT PAY' newWindow />
                    <h3>
                        Pay By Debit or Credit Card <HelptipIcon />
                    </h3>
                    <IrsButton buttonText='GO TO CARD OPTIONS' newWindow />
                </div>
            </Card>
        </Router>
    );
};

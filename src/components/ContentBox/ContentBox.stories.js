import React from 'react';
import ContentBox from './ContentBox';
import IrsButton from '../IrsButton';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'RCL/Components/ContentBox',
    component: ContentBox,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is responsible for creating a box that the content lives in. It is a component responsible for formatting and presentation. If a title is not included as a prop, it will not be rendered.',
            },
        },
    },
};

export const Default = () => {
    return (
        <Router>
            <ContentBox border title='Test'>
                <p>Test Content</p>
                <IrsButton
                    buttonText='Testing Button'
                    className='test__btn'
                    newWindow={true}
                    ariaLabel='Testing'
                    to='\'
                />
            </ContentBox>
        </Router>
    );
};

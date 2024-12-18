// HeaderBar.stories.js|jsx

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserIcon from '../UserIcon/UserIcon';
import LogoutIcon from '../LogoutIcon/LogoutIcon';
import ChevronDownIcon from '../ChevronDownIcon/ChevronDownIcon';
import { gaPageEventMethods } from '../../helpers/gaService';
import './HeaderBar.css';
import HeaderBar from './HeaderBar';

export default {
    title: 'RCL/Components/HeaderBar',
    component: HeaderBar,
};

export const Default = () => {
    const userLinks = [
        {
            id: 'userLink0',
            isLanguageDropDown: false,
            get linkDescription() {
                return 'This will change the language';
            },
            linkDestination: '#',
            newWindow: false,
            icon: <ChevronDownIcon />,
        },

        {
            id: 'userLink1',
            get linkDisplayText() {
                return 'Profile';
            },
            get linkDestination() {
                return '/ola/profile';
            },
            get linkDescription() {
                return 'This will take you to the profile page.';
            },
            newWindow: false,
            internalLink: true,
            handleClick: () => {
                gaPageEventMethods.sendHeaderProfileClick();
            },
            icon: <UserIcon />,
        },

        {
            id: 'userLink2',
            get linkDisplayText() {
                return 'Help';
            },
            get linkDestination() {
                return 'https://www.irs.gov/payments/frequently-asked-questions-about-online-account';
            },
            get linkDescription() {
                return 'Help This link will open the Frequently Asked Questions page in a new window.';
            },
            externalLink: true,
            newWindow: true,
            className: 'link',
            handleClick: () => {
                gaPageEventMethods.sendHeaderHelpClick();
            },
        },
        {
            id: 'userLink3',
            get linkDisplayText() {
                return 'Logout';
            },
            get linkDescription() {
                return 'Logout This link will log the user out.';
            },
            newWindow: false,
            blurToButton: true,
            internalLink: false,
            handleClick: evt => {
                evt.preventDefault();
                gaPageEventMethods.sendHeaderLogoutClick();
            },
            icon: <LogoutIcon />,
        },
    ];

    return (
        <header role='banner'>
            <BrowserRouter>
                <HeaderBar userLinks={userLinks} />
            </BrowserRouter>
        </header>
    );
};

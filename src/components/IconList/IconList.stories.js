import React from 'react';
import IconList from './IconList';
import HelptipIcon from '../HelptipIcon';
import AlertIcon from '../AlertIcon';
import ChevronDownIcon from '../ChevronDownIcon';
import ChevronLeftIcon from '../ChevronLeftIcon';
import ChevronRightIcon from '../ChevronRightIcon';
import ChevronUpIcon from '../ChevronRightIcon';
import CloseIcon from '../CloseIcon';
import InfoIcon from '../InfoIcon';
import LogoutIcon from '../LogoutIcon';
import PrintIcon from '../PrintIcon';
import WarningIcon from '../WarningIcon';
import UserIcon from '../UserIcon';
import SuccessIcon from '../SuccessIcon';
import SortIcon from '../SortIcon';
import PointerIcon from '../PrintIcon';
import ExternalArrow from '../ExternalArrow';

export default {
    title: 'RCL/Components/IconList',
    component: IconList,
    parameters: {
        docs: {
            description: {
                component: 'A list of the Icons available',
            },
        },
    },
};

export const Default = () => (
    <IconList
        arr={[
            <HelptipIcon />,
            <AlertIcon />,
            <CloseIcon />,
            <WarningIcon />,
            <InfoIcon />,
            <LogoutIcon />,
            <PrintIcon />,
            <UserIcon />,
            <SuccessIcon />,
            <SortIcon />,
            <PointerIcon />,
            <ChevronLeftIcon />,
            <ChevronRightIcon />,
            <ChevronUpIcon />,
            <ChevronDownIcon />,
            <ExternalArrow />,
            <LogoutIcon />,
        ]}
    />
);

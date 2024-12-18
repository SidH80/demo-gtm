import React from 'react';
import PropTypes from 'prop-types';
import './AccordionIcon.css';

/**
 * @function AccordionIconPlus - This component renders the svg icon
 * of the accordion plus icon.
 */
const AccordionIconPlus = iconStyles => {
    return (
        <svg
            className='accordion-icon accordion-icon-plus'
            height='20px'
            width='20px'
            viewBox='0 0 20 20'
            role='img'
            style={iconStyles}
            fill='#00599C'
            focusable='false'>
            <path d='M15.8333335,10.8333335 C15.8333335,11.2890625 15.455729,11.6666669 15,11.6666669 L11.6666669,11.6666669 L11.6666669,15 C11.6666669,15.455729 11.2890625,15.8333335 10.8333335,15.8333335 L9.16666654,15.8333335 C8.71093752,15.8333335 8.33333307,15.455729 8.33333307,15 L8.33333307,11.6666669 L5,11.6666669 C4.54427098,11.6666669 4.16666654,11.2890625 4.16666654,10.8333335 L4.16666654,9.16666654 C4.16666654,8.71093752 4.54427098,8.33333307 5,8.33333307 L8.33333307,8.33333307 L8.33333307,5 C8.33333307,4.54427098 8.71093752,4.16666654 9.16666654,4.16666654 L10.8333335,4.16666654 C11.2890625,4.16666654 11.6666669,4.54427098 11.6666669,5 L11.6666669,8.33333307 L15,8.33333307 C15.455729,8.33333307 15.8333335,8.71093752 15.8333335,9.16666654 L15.8333335,10.8333335 Z M10,19 C14.9705627,19 19,14.9705627 19,10 C19,5.02943725 14.9705627,1 10,1 C5.02943725,1 1,5.02943725 1,10 C1,14.9705627 5.02943725,19 10,19 Z M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z' />
        </svg>
    );
};

/**
 * @function AccordionIconMinus - This component renders the svg icon of the
 * accordion minus icon.
 */
const AccordionIconMinus = iconStyles => {
    return (
        <svg
            className='accordion-icon accordion-icon-minus'
            height='20px'
            width='20px'
            viewBox='0 0 20 20'
            role='img'
            style={iconStyles}
            fill='#00599C'
            focusable='false'>
            <path d='M15.8333335,10.8333335 C15.8333335,11.2890625 15.455729,11.6666669 15,11.6666669 L5,11.6666669 C4.54427098,11.6666669 4.16666654,11.2890625 4.16666654,10.8333335 L4.16666654,9.16666654 C4.16666654,8.71093752 4.54427098,8.33333307 5,8.33333307 L15,8.33333307 C15.455729,8.33333307 15.8333335,8.71093752 15.8333335,9.16666654 L15.8333335,10.8333335 Z M10,19 C14.9705627,19 19,14.9705627 19,10 C19,5.02943725 14.9705627,1 10,1 C5.02943725,1 1,5.02943725 1,10 C1,14.9705627 5.02943725,19 10,19 Z M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z' />
        </svg>
    );
};

/**
 * @description - This component renders either the accordion plus or the accordion minus
 * svg depending on whether the accordion icon has been passed the prop
 * isOpen as true or false. If isOpen is true, the minus icon is rendered. If
 * it is false, the plus icon is rendered. If neither is passed, the plus
 * icon renders by default.
 */
const AccordionIcon = ({
    isOpen,
    OpenComponent,
    ClosedComponent,
    iconStyles,
}) => {
    const OpenComponentRender = OpenComponent || (
        <AccordionIconMinus iconStyles={iconStyles} />
    );

    const ClosedComponentRender = ClosedComponent || (
        <AccordionIconPlus iconStyles={iconStyles} />
    );

    return isOpen ? OpenComponentRender : ClosedComponentRender;
};

AccordionIcon.propTypes = {
    /**@property {object} iconStyles - Object containing CSS attributes and values to set as inline styles on AccordionIconMinus/AccordionIconPlus */
    iconStyles: PropTypes.object,

    /** @property {boolean} isOpen - Determines the correct icon to be returned when open or closed */
    isOpen: PropTypes.bool,

    /** @prop OpenComponent - component to overwrite the minus icon */
    OpenComponent: PropTypes.node,

    /** @prop ClosedComponent - component to overwrite the plus icon */
    ClosedComponent: PropTypes.node,
};

AccordionIcon.defaultProps = {
    isOpen: false,
};

export default AccordionIcon;

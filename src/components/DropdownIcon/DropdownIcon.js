import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description This component renders an icon, image, or text to act as the
 * menu icon for a dropdown menu. DropdownIcon currently provides
 * text options to describe the icon's purpose.
 */
const DropdownIcon = ({
    open,
    hasLangPicker,
    menuLabelMenu,
    menuLabelClose,
    iconText,
}) => {
    const getText = () => {
        if (open) {
            return hasLangPicker ? menuLabelClose : iconText.close;
        } else {
            return hasLangPicker ? menuLabelMenu : iconText.menu;
        }
    };
    return <span>{getText()}</span>;
};

DropdownIcon.propTypes = {
    /**@prop props contains open flag and menu labels for the open and close text object sent from dropdown component*/
    props: PropTypes.object,
};

DropdownIcon.defaultProps = {
    open: false,
    iconText: {
        close: 'Close',
        menu: 'Menu',
    },
};

export default DropdownIcon;

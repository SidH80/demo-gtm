import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ExternalArrow from '../ExternalArrow';
import PrintIcon from '../PrintIcon';
import './IrsButton.css';

/**
 * @description - This is a reusable button component that can be used anywhere on the site.
 * It can be made active or disabled. Pass in a prop to trigger an action when
 * the button is clicked.
 */

const IrsButton = ({
    newWindow,
    active,
    to,
    inverted,
    className,
    isPrintIcon,
    clickEvent,
    ariaLabel,
    icon,
    buttonText,
}) => {
    let count = 0;

    const guid = 'anchor-ui-' + count++;

    const history = useHistory();

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const navigate = () => {
        if (newWindow) {
            window.open(to);
        } else if (active) {
            history.push(to);
        }
    };

    const handleKeyPress = e => {
        let key = e.which || e.keyCode;
        if (key === 32 || key === 0) {
            let targetClassName = e.target.className;
            if (
                targetClassName &&
                targetClassName.includes('irs-button') &&
                e.target.id == guid &&
                document.activeElement
            ) {
                e.preventDefault();
                document.activeElement.click();
            }
        }
    };

    let classes;

    if (active) {
        classes = 'irs-button irs-button--active';
    } else {
        classes = 'irs-button irs-button--disabled';
    }

    if (inverted) {
        classes = `${classes} inverted`;
    }

    if (className) {
        classes = `${classes} ${className}`;
    }

    let externalIcon;

    if (newWindow) {
        externalIcon = <ExternalArrow />;
    } else {
        externalIcon = null;
    }

    let printIcon;

    if (isPrintIcon) {
        printIcon = <PrintIcon />;
    } else {
        printIcon = null;
    }

    const clickFunction = active && clickEvent ? clickEvent : navigate;
    const tabIndex = active ? 0 : -1;

    return (
        <a
            href={to}
            disabled={!active}
            onClick={e => {
                e.preventDefault();
                clickFunction();
            }}
            className={classes}
            tabIndex={tabIndex}
            role='button'
            id={guid}
            aria-label={ariaLabel}>
            {printIcon}
            {buttonText}
            {externalIcon}
            {!newWindow ? icon : null}
        </a>
    );
};

IrsButton.propTypes = {
    /**@prop {boolean} active - Determines if a button is active or not */
    active: PropTypes.bool,
    /**@prop {string} buttonText - Provides the text within the button*/
    buttonText: PropTypes.string,
    /**@prop {function} clickEvent - Performs an action when the button is clicked*/
    clickEvent: PropTypes.func,
    /**@prop {boolean} newWindow - Determines if a new window will open when Button is clicked*/
    newWindow: PropTypes.bool,
    /**@prop {string} ariaLabel - Provides text to be read by screen reader */
    ariaLabel: PropTypes.string,
    /**@prop {string} className - Defines the CSS class for the button*/
    className: PropTypes.string,
    /**@prop {boolean} inverted - A flag for whether the button should have default colors or inverted colors */
    inverted: PropTypes.bool,
    /**@prop {string} to - The Link to which the button should go */
    to: PropTypes.string,
    /**@prop {boolean} isPrintIcon - Determines if the button should be generated with a Print*/
    isPrintIcon: PropTypes.bool,
    /**@prop {Object} icon - If an icon other than the print and external arrow icon is passed, it will be displayed*/
    icon: PropTypes.object,
};

IrsButton.defaultProps = {
    active: true,
    buttonText: '',
    clickEvent: null,
    newWindow: false,
    ariaLabel: null,
    className: '',
    inverted: false,
    to: '',
    isPrintIcon: false,
    icon: null,
};

export default withRouter(IrsButton);

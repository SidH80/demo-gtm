import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownIcon from '../DropdownIcon';
import DropdownSection from '../DropdownSection';
import DropdownSectionNav from '../DropdownSectionNav';
import { withRouter } from 'react-router-dom';
import './Dropdown.css';
import FocusTrap from '../FocusTrap';
import ReactDOM from 'react-dom';

/**
 * @description This component is responsible for maintaining the dropdown menu. If the
 * trigger is pressed (taken from DropdownIcon) when the menu is not open
 * this component will be responsible for rendering the dropdown box. If
 * the dropdown box is already open and the trigger is pressed, it is
 * responsible for closing the box.
 */
export function Dropdown(props) {
    const [isActive, setIsActive] = useState(false);
    const [menuControlHeight, setMenuControlHeight] = useState('auto');
    const buttonRef = React.createRef();
    const dropdownMenuControlRef = React.createRef();

    /**
     * Respond to window resize events to update the Dropdown menu.
     * Execute only once.
     */
    useEffect(() => {
        window.addEventListener('resize', recalculateHeight);
        return function cleanup() {
            window.removeEventListener('resize', removeHiddenAttributes);
            window.removeEventListener('resize', recalculateHeight);
        };
    }, []);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus();
        }

        if (props.isActive || isActive) {
            window.addEventListener('resize', removeHiddenAttributes, {
                once: true,
            });
            if (props.hiddenElements) {
                for (let hideClassName of props.hiddenElements) {
                    let objectsToHide = document.getElementsByClassName(
                        hideClassName
                    );
                    for (let hideObject of objectsToHide) {
                        hideObject.setAttribute('aria-hidden', 'true');
                    }
                }
            }
        } else {
            window.removeEventListener('resize', removeHiddenAttributes);
            if (props.hiddenElements) {
                for (let hideClassName of props.hiddenElements) {
                    let objectsToHide = document.getElementsByClassName(
                        hideClassName
                    );
                    for (let hideObject of objectsToHide) {
                        hideObject.removeAttribute('aria-hidden');
                    }
                }
            }
        }
    }, [props.isActive, isActive]);

    /**
     * On each update of the headerHeight property render,
     * refresh the height of the menu control to
     * accomodate scrolling of menu items.
     */
    useEffect(() => {
        recalculateHeight();
    }, [props.headerHeight]);

    /**
     * On each render, refresh the height of the menu control to
     * accomodate scrolling of menu items.
     */
    useEffect(() => {
        recalculateHeight();
    });

    /**
     * Find the height of the header portion of the page.
     * @returns height of the header from the top of the page.
     */
    const getHeaderElementHeight = () => {
        let headerHeight = 0;
        let par = ReactDOM.findDOMNode(dropdownMenuControlRef.current);
        while (
            par &&
            par.parentNode &&
            par.nodeName.toUpperCase() !== 'HEADER'
        ) {
            par = par.parentNode;
        }
        if (par && par.nodeName.toUpperCase() === 'HEADER') {
            headerHeight = par.getBoundingClientRect().height;
        }
        return headerHeight;
    };

    /**
     * Update the height of the menu-control element so that it's the appropriate
     * height so everything within the content is scrollable.
     */
    const recalculateHeight = () => {
        if (dropdownMenuControlRef.current) {
            setMenuControlHeight(
                window.innerHeight - getHeaderElementHeight() + 'px'
            );
        }
    };

    const removeHiddenAttributes = () => {
        if (props.isActive === null) setIsActive(false);

        props.disableFunction ? props.disableFunction() : '';
        if (props.hiddenElements) {
            for (let hideClassName of props.hiddenElements) {
                let objectsToHide = document.getElementsByClassName(
                    hideClassName
                );
                for (let hideObject of objectsToHide) {
                    hideObject.removeAttribute('aria-hidden');
                }
            }
        }
    };

    /**
     * @function trigger Switches the value stored for active in the redux store
     * because we can only have one source of truth.
     */
    const trigger = () => {
        props.disableFunction ? props.disableFunction() : '';
        if (props.isActive === null) setIsActive(!isActive);
    };

    /**
     * @function renderActive Responsible for rendering the components - DropdownIcon and DropdownSection,
     * wrapped in the FocusTrap jointly.
     */
    const renderActive = () => {
        const buttonClasses = 'dropdown-button';
        const navBoxClasses = 'dropdown__box--layout dropdown__box--style';
        document.body.classList.add(['dropdown-menu-prevent-body-scroll']);
        const dropdownMenuControlHeightStyle = {
            height: menuControlHeight,
        };

        return (
            <FocusTrap isModal={false}>
                {(props.isActive || isActive) && (
                    <div className='dropdown__backdrop' onClick={trigger} />
                )}
                <button
                    className={buttonClasses}
                    onClick={trigger}
                    aria-expanded={props.isActive || isActive}
                    aria-controls='dropdown-menu-control'
                    ref={buttonRef}>
                    <DropdownIcon
                        hasLangPicker={props.hasLangPicker}
                        menuLabelMenu={props.menuLabelMenu}
                        menuLabelClose={props.menuLabelClose}
                        links={props.userLinks}
                        open={props.isActive || isActive}
                        iconText={props.iconText}
                    />
                </button>
                <div
                    id='dropdown-menu-control'
                    className={navBoxClasses}
                    aria-hidden={
                        props.isActive != null ? !props.isActive : !isActive
                    }
                    style={dropdownMenuControlHeightStyle}
                    ref={dropdownMenuControlRef}>
                    <div
                        id='dropdown-menu-id'
                        className='dropdown-content'
                        role='navigation'>
                        {props.links.map((section, index) => (
                            <DropdownSectionNav
                                key={index}
                                inputRef={props.inputRef}
                                links={section}
                                clickFunction={trigger}
                            />
                        ))}
                    </div>
                    <div className='dropdown-user-box'>
                        <DropdownSection
                            userName={props.userName}
                            links={props.userLinks}
                            clickFunction={trigger}
                        />
                    </div>
                </div>
            </FocusTrap>
        );
    };

    /**
     * @function renderInactive Responsible for rendering the pageview without the
     */
    const renderInactive = () => {
        const buttonClasses = 'dropdown-button';
        document.body.classList.remove(['dropdown-menu-prevent-body-scroll']);
        return (
            <div className='dropdown-wrapper'>
                <button
                    className={buttonClasses}
                    onClick={trigger}
                    aria-expanded={props.isActive || isActive}
                    aria-controls='dropdown-menu-control'
                    ref={buttonRef}>
                    <DropdownIcon
                        hasLangPicker={props.hasLangPicker}
                        menuLabelMenu={props.menuLabelMenu}
                        menuLabelClose={props.menuLabelClose}
                        links={props.userLinks}
                        open={props.isActive || isActive}
                        iconText={props.iconText}
                    />
                </button>
            </div>
        );
    };

    return props.isActive || isActive ? renderActive() : renderInactive();
}

Dropdown.propTypes = {
    /**@prop {array} links - Links are passed to the DropdownSection component when browswer size requires a dropdown menu*/
    links: PropTypes.array,
    /**@prop {string} userName - Used to display the logged in user's name, ie. 'TAX PAYER'*/
    userName: PropTypes.string,
    /**@prop {array} userLinks - Links that relate to user actions and will display at the bottom of the dropdown*/
    userLinks: PropTypes.array,
    hiddenElements: PropTypes.array,
    disableFunction: PropTypes.func,
    inputRef: PropTypes.func,
    /**@prop {number} headerHeight - The height the <header> element */
    headerHeight: PropTypes.number,
    /**@prop {boolean} isActive - Determines if the mobile menu is active */
    isActive: PropTypes.bool,
};

Dropdown.defaultProps = {
    links: [],
    userName: '',
    userLinks: [],
    hiddenElements: null,
    disableFunction: null,
    inputRef: null,
    headerHeight: 0,
    isActive: null,
};

export default withRouter(Dropdown);

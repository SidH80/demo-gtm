import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ChevronUpIcon from '../ChevronUpIcon';
import ChevronDownIcon from '../ChevronDownIcon';
import './DropdownSectionSubNav.css';

const DropdownSectionSubNav = ({ link, clickStateFunction, onClickFunc }) => {
    let isActive = l => {
        for (const snLink of l.subNav) {
            if (snLink.linkDestination === window.location.pathname) {
                return 'DropdownSubNav__selected';
            }
        }
        return '';
    };

    let classes = isActive(link);
    let focusableElement = React.createRef();
    return (
        <li className={'DropdownSubNav link-list ' + classes}>
            <button
                href='/'
                className='DropdownSubNav__main'
                aria-expanded={link.state}
                ref={focusableElement}
                onClick={e => {
                    e.preventDefault();
                    clickStateFunction(link.id);
                    focusableElement.current.focus();
                }}>
                {link.linkDisplayText}
                {link.state ? (
                    <ChevronUpIcon isFocusable='false' />
                ) : (
                    <ChevronDownIcon />
                )}
            </button>
            <ul
                role='list'
                className={`DropdownSubNav__ul ${link.state ? 'open' : ''}`}
                aria-hidden={!link.state}>
                <div className='DropdownSubNav__animation-container'>
                    {link.subNav.map(snLink => {
                        const isCurrent =
                            snLink.linkDestination === window.location.pathname;
                        return (
                            <li key={snLink.id} className='DropdownSubNav__li'>
                                <NavLink
                                    exact
                                    to={snLink.linkDestination}
                                    aria-label={
                                        isCurrent
                                            ? `${snLink.linkDisplayText} Current`
                                            : null
                                    }
                                    aria-current={null}
                                    className='DropdownSubNav__link'
                                    onClick={onClickFunc}>
                                    {snLink.linkDisplayText}
                                </NavLink>
                            </li>
                        );
                    })}
                </div>
            </ul>
        </li>
    );
};

DropdownSectionSubNav.propTypes = {
    /**@prop {object} link -  */
    link: PropTypes.shape({
        /**@prop {string} id - Each link object is made up of a link ID */
        id: PropTypes.string,
        /**@prop {string} linkDisplayText - The display text of the link */
        linkDisplayText: PropTypes.string,
        /** @prop {array} subNav - Array of sub-navigation links associated with main link */
        subNav: PropTypes.arrayOf(
            PropTypes.shape({
                /**@prop {string} id - Each link object is made up of a link ID */
                id: PropTypes.string,
                /**@prop {string} linkDescription - The alt text for the link, also used for accessibility purposes */
                linkDescription: PropTypes.string,
                /**@prop {string} linkDestination - An absolute or relative URL that describes where the user will be taken after clicking the link */
                linkDestination: PropTypes.string,
                /**@prop {string} linkDisplayText - The display text of the link */
                linkDisplayText: PropTypes.string,
                /**@prop {element} icon - An icon can be optionally included where provided */
            })
        ),
    }),
    clickStateFunction: PropTypes.func,
    linkState: PropTypes.bool,
};

export default DropdownSectionSubNav;

// DropdownSectionSubNav.defaultProps = {
//     linkState: false,
//     clickStateFunction: null,
// };

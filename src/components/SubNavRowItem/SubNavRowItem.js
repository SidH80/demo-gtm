import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChevronUpIcon from '../ChevronUpIcon';
import ChevronDownIcon from '../ChevronDownIcon';
import './SubNavRowItem.css';

/**
 * @description a sub-navigation component for the navigation bar that will allow the user to select from
 * a list of navigation links in the sub-nav menu. This component should only be used within the
 * NavRow component and the prop data must follow a specific structure. When passing in the data
 * you must ensure that the id in the object is unique for the on blur functionality. The location
 * object is the history location object that is passed from the NavRow component.
 */
const SubNavRowItem = ({ data, location }) => {
    // Parent object id is used to create uniqueness between sub nav items
    const id = data.id;
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    // Mouse enter state is captured so that when the user hovers over the sub-nav and
    // performs a click action, the sub-nav will not close. This solution was implemented
    // due to a dragon AT issue where dragon does a onMouseEnter and onClick event when accessing the sub-nav
    const [mouseEnter, setMouseEnter] = useState(false);

    const toggleClick = e => {
        e.preventDefault();
        if (!mouseEnter) {
            setIsOpen(!isOpen);
        }
    };

    const toggleMouseEnter = () => {
        if (!isOpen) {
            setMouseEnter(true);
            setIsOpen(true);
        }
    };

    const toggleBlur = e => {
        const target =
            e.relatedTarget != null ? e.relatedTarget : document.activeElement;
        if (!target?.className.includes(id)) {
            setMouseEnter(false);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setIsActive(false);
        data.subNav.forEach(link => {
            if (link.linkDestination === location.pathname) {
                // TODO: When there is a product that uses the sub-nav with multi-lingual support
                // the logic for setting an active state for the tab must be added
                setIsActive(true);
            }
        });
    }, [location]);

    return (
        <li className='SubNavRowItem'>
            <a
                href='/'
                className={`SubNavRowItem__tab ${id} ${isActive ? 'active' : ''
                    } ${isOpen ? 'open' : ''}`}
                aria-expanded={isOpen}
                onContextMenu={toggleClick}
                onClick={toggleClick}
                onAuxClick={toggleClick}
                onMouseEnter={toggleMouseEnter}
                onMouseLeave={toggleBlur}
                onBlur={toggleBlur}>
                <span>{data.linkDisplayText}</span>
                {isOpen ? (
                    <ChevronUpIcon isFocusable="false" />
                ) : (
                    <ChevronDownIcon />
                )}
            </a>
            <ul
                className={`SubNavRowItem__menu ${id} ${isOpen ? 'open' : ''}`}
                aria-expanded={isOpen}
                aria-hidden={!isOpen}
                onMouseLeave={toggleBlur}>
                <div className='container'>
                    {data.subNav.map(link => {
                        const isCurrent = link.linkDestination === location.pathname;
                        return (
                            <li key={link.id} className='SubNavRowItem__column'>
                                <NavLink
                                    exact
                                    to={link.linkDestination}
                                    className={`SubNavRowItem__link ${id}`}
                                    aria-label={isCurrent ? `${link.linkDisplayText} Current` : null}
                                    aria-current={null}
                                    onBlur={toggleBlur}>
                                    {link.linkDisplayText}
                                </NavLink>
                                <span className='SubNavRowItem__linkDescription'>
                                    {link.linkDescription}
                                </span>
                            </li>
                        );
                    })}
                </div>
            </ul>
        </li>
    );
};

SubNavRowItem.propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
};

SubNavRowItem.defaultProps = {
    data: {},
    location: {},
};

export default SubNavRowItem;

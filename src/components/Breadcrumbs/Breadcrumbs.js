import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Breadcrumbs.css';

const isObject = require('lodash/isObject');

/**
 * @description - This class is responsible for displaying breadcrumbs
 * at the top of content in either mobile or desktop view.
 */
const Breadcrumbs = ({ crumbs, onCrumbClick }) => {
    /**
     * @function - This function will be given either an object or a string. If it's an
     * object, it should be a link object. If it's an object, it will return
     * an NavLink component to be placed in the breadcrumbs. If it is given a string, it
     * will return paragraph text.
     */
    const formatBreadcrumb = (path, index) => {
        if (isObject(path)) {
            return (
                <NavLink
                    className='breadcrumbs__element--link link--blue'
                    key={index}
                    exact
                    onClick={() => onCrumbClick(path)}
                    to={path.linkDestination}>
                    {path.linkDisplayText}
                </NavLink>
            );
        } else {
            return (
                <span key={index} className='breadcrumbs__element--text'>
                    {path}
                </span>
            );
        }
    };

    return (
        /* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */
        <ul role='list' className='breadcrumbs container'>
            {crumbs.map((path, index) => (
                <li key={index} className='breadcrumbs__item'>
                    {formatBreadcrumb(path, index)}
                </li>
            ))}
        </ul>
    );
};

Breadcrumbs.propTypes = {
    /**@prop {arrayOf} crumbs - Used for creating breadcrumbs that help users dynamically navigate content */
    crumbs: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                /**@prop {string} linkDescription - Provides the text description that the screen reader will access */
                linkDescription: PropTypes.string,
                /**@prop {string} linkDestination - Provides the URL the link will navigate to */
                linkDestination: PropTypes.string,
                /**@prop {string} linkDisplayText - Provides the text for the link itself */
                linkDisplayText: PropTypes.string,
            }),
        ])
    ),
};

Breadcrumbs.defaultProps = {
    crumbs: [],
};

export default Breadcrumbs;

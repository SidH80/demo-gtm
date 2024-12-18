import React, { useState, useEffect } from 'react';
import './BreadcrumbBar.css';
import Breadcrumbs from '../Breadcrumbs';
import PropTypes from 'prop-types';
/**
 * @description - This component displays navigation breadcrumbs upon navigation through the application's views.
 *
 * NOTE: This component wraps a 'Breadcrumbs' component which renders a React Router 'NavLink'.
 */

const mediaQuery = window.matchMedia('(min-width: 768px)');
const BreadcrumbBar = ({ onCrumbClick, pathGetter, ariaLabel, className }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const handleMediaQuery = () => {
        setIsMobile(window.innerWidth < 768);
    };
    const handleCrumbClick = crumb => {
        if (onCrumbClick) {
            onCrumbClick(crumb);
        }
    };

    useEffect(() => {
        mediaQuery.addEventListener('change', handleMediaQuery);
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQuery);
        };
    }, []);

    const crumbs = pathGetter();
    const hasCrumbs = crumbs && crumbs.length > 0;
    const mobileCrumbs = crumbs?.slice(-2);

    return hasCrumbs ? (
        <nav
            aria-label={ariaLabel || 'Breadcrumb'}
            className={`breadcrumb-bar ${className}`}>
            <Breadcrumbs
                onCrumbClick={handleCrumbClick}
                crumbs={isMobile ? mobileCrumbs : crumbs}
            />
        </nav>
    ) : null;
};

BreadcrumbBar.propTypes = {
    /**@param {function} onBreadCrumbClick - Returns a function to handle Breadcrumb click*/
    onCrumbClick: PropTypes.func,

    /**@param {function} pathGetter - Returns a list of links and text that will be rendered into Breadcrumbs*/
    pathGetter: PropTypes.func,

    /**@prop {string} ariaLabel - Value of aria-label attribute to be applied (if any) */
    ariaLabel: PropTypes.string,

    /**@prop className {String} - class attribute of the input element. */
    className: PropTypes.string,
};

BreadcrumbBar.defaultProps = {
    ariaLabel: null,
    className: '',
    pathGetter: () => {
        return [];
    },
};

export default BreadcrumbBar;

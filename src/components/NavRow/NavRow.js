import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import SubNavRowItem from '../SubNavRowItem';
import './NavRow.css';
import '../../styles/global.css';
import getClassNames from '../../helpers/getClassNames';

/**
 * @description This class is responsible for rendering a list of navigation tabs
 * designed to look like tabs jutting out from the header. This can
 * be used elsewhere, but is the main driver for tab-based navigation
 * designs in the site.
 *
 * This component utilizes the location prop that gets passed from the
 * withRouter higher-order component (HOC). For this component to work correctly,
 * it must be a child of a parent Router component and must be wrapped by
 * the withRouter HOC.
 */
const NavRow = ({ links, location, languageCodes, className }) => {
    return (
        <nav
            className={getClassNames('tab-nav-row', className)}
            role='navigation'
            aria-label='application'>
            <div className='container'>
                {/* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */}
                <ul role='list' className='link-list'>
                    {links.map(link => {
                        if (link.subNav) {
                            return (
                                <SubNavRowItem
                                    key={link.id}
                                    data={link}
                                    location={location}
                                />
                            );
                        } else {
                            const isCurrent =
                                link.linkDestination === location.pathname
                                    ? [link.linkDisplayText] + ' Current'
                                    : null;
                            const destination = link.linkDestination;
                            return (
                                <li
                                    key={link.id}
                                    className='tab-nav-row__item tab-nav-row__li'>
                                    <NavLink
                                        exact
                                        to={link.linkDestination}
                                        className='tab-nav-row-item__link'
                                        activeClassName='tab-nav-row__li--selected'
                                        aria-label={isCurrent}
                                        aria-current={null}
                                        isActive={(match, location) => {
                                            let pathnameSpliceCount = 3;

                                            // Split the location into path parts.
                                            // First element will be empty string.
                                            const splitPath = location.pathname.split(
                                                '/'
                                            );

                                            // If language codes are specified, compare one additional route path item
                                            if (languageCodes.length > 0) {
                                                // Check if the third element (index 2) is a language code.
                                                if (
                                                    splitPath.length >= 3 &&
                                                    languageCodes.includes(
                                                        splitPath[2]
                                                    )
                                                ) {
                                                    ++pathnameSpliceCount;
                                                }
                                            }

                                            return !!(
                                                match ||
                                                destination ===
                                                    location.pathname
                                                        .split('/')
                                                        .splice(
                                                            0,
                                                            pathnameSpliceCount
                                                        )
                                                        .join('/')
                                            );
                                        }}>
                                        {link.linkDisplayText}
                                    </NavLink>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </nav>
    );
};

NavRow.propTypes = {
    /**@param {array} links - Provides a collection of the different links to be displayed on the navigation row */
    links: PropTypes.array,
    // Provides the pathname received by the HOC. Note: This value should not be passed in manually (location: type Object).
    location: PropTypes.object,
    // list of language codes ex. en, es
    languageCodes: PropTypes.array,
};

NavRow.defaultProps = {
    links: [],
    location: {},
    languageCodes: [],
};

export default withRouter(NavRow);

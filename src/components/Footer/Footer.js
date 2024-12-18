import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import '../../styles/global.css';
import IrsLogo from '../IrsLogo';
import IrsLink from '../IrsLink';

/**
 *  @description This component renders the footer of the site. It will always
 *  remain at the bottom of the page. It renders a smaller IRS logo and
 *  a nav list of links to external pages.
 */
export default class Footer extends Component {
    handleClick = (gaFunction = null, usageStatsFunction = null) => {
        if (gaFunction) {
            this.props.gaFunctions[gaFunction]();
        }

        if (usageStatsFunction) {
            usageStatsFunction();
        }
    };

    footerLinks = Array.isArray(this.props.footerLinks)
        ? this.props.footerLinks
        : [];

    render() {
        return (
            <footer className={this.props.className} role='contentinfo'>
                <div className='footer-container rcl-test'>
                    <div className='irs-logo'>
                        <IrsLogo footer={true} logoAlt={this.props.logoAlt} />
                    </div>
                    {/* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */}
                    <div className='links'>
                        <ul role='list' className='ul-link'>
                            {this.props.footerLinks.map(item => {
                                return (
                                    <li key={item.id}>
                                        <IrsLink
                                            icon={item.icon}
                                            linkDisplayText={
                                                item.linkDisplayText
                                            }
                                            linkDestination={
                                                item.linkDestination
                                            }
                                            linkDescription={
                                                item.linkDescription
                                            }
                                            clickEvent={() =>
                                                this.handleClick(
                                                    item.gaEvent,
                                                    item.usageStatsEvent
                                                )
                                            }
                                            newWindow={item.newWindow}
                                            addDelineater={false}
                                            blue={false}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    /**@param {string} addDelineator - Gives implemented component ability to reject defect delineator which would otherwise be added by default */
    addDelineator: PropTypes.bool,
    /**@param {string} className - Custom class name(s) */
    className: PropTypes.string,
    /**@param {arrayOf} footerLinks - Each footerLink object is made up of a footer ID */
    footerLinks: PropTypes.arrayOf(PropTypes.object),
    /**@param {object} gaFunctions - Each gaFunctions object is made up of a ga function defined in the page events methods object of the ga service */
    gaFunctions: PropTypes.object,
    /**@param {string} logoAlt - alt text for the logo used in the footer */
    logoAlt: PropTypes.string,
};

Footer.defaultProps = {
    addDelineator: true,
    className: '',
    footerLinks: [],
    gaFunctions: {},
    logoAlt: '',
};

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './HeaderBar.css';
import IrsLogo from '../IrsLogo';
import NavList from '../NavList';
import Dropdown from '../Dropdown';
import SkipNav from '../SkipNav';
import UsBanner from '../UsBanner/UsBanner';
import getClassNames from '../../helpers/getClassNames';

/**
 *  @description This component renders the header bar of the site. It will left align
 *  the IRS logo and right align the nav links. It will exist at the top of the page,
 *  or directly under any elements above it. It includes the US Government Banner.
 */
export default function HeaderBar(props) {
    const [logoDisable, setLogoDisable] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [changeHeaderHeight, setChangeHeaderHeight] = useState(false);
    const headerRef = useRef();

    const disableLogo = () => {
        if (logoDisable === true) {
            setLogoDisable(false);
        } else {
            setLogoDisable(true);
        }
    };

    const className = getClassNames('irs-header', props.className);

    /**
     * When the banner expansion changes, we need to make sure the Dropdown menu
     * resizes itself appropriately for scrolling the menu items. We do that by
     * updating the header height value.
     */
    const bannerExpandChange = () => {
        setChangeHeaderHeight(!changeHeaderHeight);
    };

    /**
     * When the headerHeight values changes, we need to let Dropdown menu know.
     * Used in connection with bannerExpandChange
     */
    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.getBoundingClientRect().top);
        }
    }, [changeHeaderHeight]);

    return (
        <>
            <UsBanner
                onExpandChange={bannerExpandChange}
                bannerText={props.bannerText}
                content={props.usBannerContent}
            />
            <div className={className} ref={headerRef}>
                {!props.stripped && (
                    <SkipNav
                        title={props.skipTitle}
                        inputRef={props.inputRef}
                    />
                )}
                <div className='container irs-header__content'>
                    <span className='left-aligned-elts irs-header__logo'>
                        <IrsLogo
                            logo={props.logo}
                            logoAlt={props.logoAlt}
                            logoUrl={props.logoUrl}
                            logoLabel={props.logoLabel}
                            logoLabelCurrent={props.logoLabelCurrent}
                            disableRef={logoDisable}
                        />
                    </span>
                    {!props.stripped && (
                        <span className='right-aligned-elts right-aligned-menu'>
                            <div className='irs-header--large'>
                                <NavList
                                    links={props.userLinks}
                                    userName={props.userName}
                                />
                            </div>
                            <div className='irs-header--phone'>
                                <Dropdown
                                    isActive={props.isMobileMenuActive}
                                    links={[props.navLinks]}
                                    userLinks={props.userLinks}
                                    hasLangPicker={props.hasLangPicker}
                                    menuLabelMenu={props.menuLabelMenu}
                                    menuLabelClose={props.menuLabelClose}
                                    menuHeader={props.menuHeader}
                                    userName={props.userName}
                                    hiddenElements={props.dropDownHide}
                                    disableFunction={disableLogo}
                                    inputRef={props.inputRef}
                                    headerHeight={headerHeight}
                                    iconText={props.dropDownButtonIconText}
                                />
                            </div>
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}

HeaderBar.propTypes = {
    /**@param {string} logo - IRS logo src */
    logo: PropTypes.string,
    /**@param {string} logoAlt - SVG Alt Tag */
    logoAlt: PropTypes.string,
    /**@param {string} logoUrl - The URL path to the IRS logo */
    logoUrl: PropTypes.string,
    /**@param {string} logoLabel -  */
    logoLabel: PropTypes.string,
    /**@param {string} logoLabelCurrent -  */
    logoLabelCurrent: PropTypes.string,
    /**@param {string} skipTitle -  */
    skipTitle: PropTypes.string,
    /**@param {boolean} stripped - Determines if SkipNav, NavList, FocusTrap and Dropdown should be displayed or removed */
    stripped: PropTypes.bool,
    inputRef: PropTypes.func,
    dropDownHide: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // Provides the text contained within the banner (bannerText: type String).
    bannerText: PropTypes.string,
    usBannerContent: PropTypes.object,

    /**@prop {boolean} isMobileMenuActive - Determines if the mobile menu is active */
    isMobileMenuActive: PropTypes.bool,
};

HeaderBar.defaultProps = {
    logo: '',
    logoAlt: '',
    logoUrl: null,
    logoLabel: '',
    logoLabelCurrent: '',
    skipTitle: '',
    stripped: false,
    inputRef: null,
    dropDownHide: null,
    isMobileMenuActive: null,
};

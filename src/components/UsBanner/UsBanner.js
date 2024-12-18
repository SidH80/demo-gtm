import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '../ChevronDownIcon';
import ChevronUpIcon from '../ChevronUpIcon';
import CloseIcon from '../CloseIcon';
import useInnerWidth from '../../hooks/useInnerWidth'
import './UsBanner.css';

/**
 *  This component creates a banner that sticks to the top of the page.
 *  While the icon and text can be changed, it is intended to announce
 *  that the website is an official website of the US Government.
 */

 export default function UsBanner(props) {
    const innerWidth = useInnerWidth();
    const isMobileView = innerWidth <= 991
    const [detailsExpanded, setDetailsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const closeButtonRef = useRef();
    const toggleButtonRef = useRef();

    const classes = props.className
        ? `gb-layout gb-display ${props.className}`
        : 'gb-layout gb-display';

    /**
     * Click handler to toggle the expansion and
     * contraction of the banner details panel.
     */
    const handleDetailsExpandClick = () => {
        setDetailsExpanded(!detailsExpanded);
        if (props.onExpandChange) {
            props.onExpandChange(!detailsExpanded);
        }
    }

    const LockIcon = () => {
        return <svg className="gb__lock-icon" height="12px" width="10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/></svg>
    }

    /**
     * Updates the isMobile state if the isMobileView variable matches
     * the expected width of "991px" using the useInnerWidth hook.
     * IsMobile is primarily used to decided whether to show the toggling
     * link button or show the X close button for an expanded
     * detail panel.
     */
    const updateIsMobile = (bool) => {
        setIsMobile(bool);
    }

    /**
     * Update isMobile flag when expansion changes.
     */
    useEffect(() => {
        updateIsMobile(isMobileView);
    }, [detailsExpanded, isMobileView]);

    return (
        <div className={`${classes} ${detailsExpanded ? 'expanded' : ''}`} id='usbanner' tabIndex='-1'>
            <div className={`container ${detailsExpanded ? 'expanded' : ''}`}>
                <p className='gb-background-flag gb__text-layout gb__text-display'>
                    <span className='gb__gov-text'>{props.bannerText} </span>
                    <span className='gb__detail-toggle'>
                        {(!(isMobile && detailsExpanded)) &&
                            <button
                                aria-controls={'gb__details'}
                                aria-expanded={detailsExpanded}
                                className='gb__detail-toggle-button'
                                onClick={handleDetailsExpandClick}
                                ref={toggleButtonRef}
                            >
                                {props.content.buttonText}
                                {!detailsExpanded && <ChevronDownIcon aria-hidden='true' isFocusable='false' />}
                                {detailsExpanded && <ChevronUpIcon aria-hidden='true' isFocusable='false'/>}
                            </button>
                        }
                        {(isMobile && detailsExpanded) &&
                            <button
                                aria-controls={'gb__details'}
                                aria-expanded={detailsExpanded}
                                aria-hidden={!detailsExpanded}
                                aria-label={props.content.ariaLabel}
                                className='gb__close-button'
                                type='button'
                                onClick={handleDetailsExpandClick}
                                ref={closeButtonRef}
                            >
                                <CloseIcon/>
                            </button>
                        }
                    </span>
                </p>
                {detailsExpanded &&
                <div className='gb__details' aria-expanded={detailsExpanded} aria-hidden={!detailsExpanded}>
                    <div className='gb__item'>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='gb__item-icon dotgov-icon'
                            role='img'
                            focusable='false'
                            height='40px'
                            width='40px'
                            viewBox="0 0 54 54"
                        >
                            <path className="dotgov-icon-path" d="M36.5,20.91v1.36H35.15a0.71,0.71,0,0,1-.73.68H18.23a0.71,0.71,0,0,1-.73-0.68H16.14V20.91l10.18-4.07Zm0,13.57v1.36H16.14V34.48a0.71,0.71,0,0,1,.73-0.68h18.9A0.71,0.71,0,0,1,36.5,34.48ZM21.57,23.62v8.14h1.36V23.62h2.71v8.14H27V23.62h2.71v8.14h1.36V23.62h2.71v8.14h0.63a0.71,0.71,0,0,1,.73.68v0.68H17.5V32.45a0.71,0.71,0,0,1,.73-0.68h0.63V23.62h2.71Z"/>
                            <circle className="dotgov-icon-circle" cx="27" cy="27.12" r="26"/>
                        </svg>
                        <div className='gb__item-text'>
                            <p className='gb__item-header'>
                                {props.content.officialGovSiteText}
                            </p>
                            <p>
                                {props.content.officialGovtOrgText}
                            </p>
                        </div>
                    </div>

                    <div className='gb__item'>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='gb__item-icon https-icon'
                            role='img'
                            focusable='false'
                            height='40px'
                            width='40px'
                            viewBox="0 0 54 54"
                        >
                            <path className="https-icon-path" d="M34.72,34.84a1.29,1.29,0,0,1-1.29,1.29H20.57a1.29,1.29,0,0,1-1.29-1.29V27.12a1.29,1.29,0,0,1,1.29-1.29H21V23.26a6,6,0,0,1,12,0v2.57h0.43a1.29,1.29,0,0,1,1.29,1.29v7.72Zm-4.29-9V23.26a3.43,3.43,0,0,0-6.86,0v2.57h6.86Z"/>
                            <circle className="https-icon-circle" cx="27" cy="27.12" r="26"/>
                        </svg>
                        <div className='gb__item-text'>
                            <p className='gb__item-header'>
                                {props.content.secureGovSiteText}
                            </p>
                            <p>
                                {props.content.displayConnectedGovSiteText(<LockIcon/>)}
                                {' '}
                                {props.content.sensitiveInfoText}
                            </p>
                        </div>
                    </div>

                </div>
 }
            </div>
        </div>
    );
}

UsBanner.propTypes = {
    // Provides the text contained within the banner (bannerText: type String).
    bannerText: PropTypes.string,
    className: PropTypes.string,
    imageUrl: PropTypes.string,
    /**@param {func} onExpandChange - callback function whenever the banner expands or contracts */
    onExpandChange: PropTypes.func,
    content: PropTypes.object
};

UsBanner.defaultProps = {
    bannerText: 'An official website of the United States government',
    className: null,
    imageUrl: '',
    onExpandChange: null,
    content: {
        buttonText: 'Here\'s how you know',
        ariaLabel: 'Here\'s how you know',
        officialGovSiteText: 'Official websites use .gov',
        officialGovtOrgText: <>A <span className = 'bold'>.gov</span> website belongs to an official government organization in the United States.</>,
        secureGovSiteText: 'Secure .gov websites use HTTPS',
        displayConnectedGovSiteText(LockIcon) {
           return <> A <span className='bold'>lock ({LockIcon})</span> or <span className='bold'>https://</span> means you've safely connected to the .gov website.</>
        },
        sensitiveInfoText: 'Share sensitive information only on official, secure websites.'
    }
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExternalArrow from '../ExternalArrow';
import './IrsLink.css';

/**
 *  @description This component will render a link. The link will be decorated with
 *  an underline and will be the color white. It is expected to be used
 *  in the header and footer. Passing in the prop delineate will add a
 *  delineator to the left of the link. If the link will open in a new window,
 *  an icon will appear denoting the external destination.
 *
 *  This link should not be used in inline text. A separate component should be used for that.
 */
export default class IrsLink extends Component {
    constructor(props) {
        super(props);

        this.anchorElement = null;

        this.setAnchorRef = elem => {
            this.anchorElement = elem;
        };
    }

    buildClassName(props) {
        let classes = [];

        if (props.addDelineater) {
            classes.push('link--delineate');
        } else if (props.removeLinkClass) {
            classes.push('');
        } else {
            classes.push('link');
        }

        if (props.blue) {
            classes.push('link--blue');
        }

        if (props.noPadding) {
            classes.push('link--no-padding');
        }

        if (props.className) {
            classes.push(props.className);
        }

        return classes.join(' ');
    }

    render() {
        const target = this.props.newWindow ? '_blank' : '_self';
        let externalIcon;
        if (this.props.newWindow) {
            externalIcon = <ExternalArrow />;
        }

        return (
            <a
                ref={this.setAnchorRef}
                href={this.props.href || this.props.linkDestination || '#'}
                aria-label={
                    this.props['aria-label'] || this.props.linkDescription
                }
                aria-expanded={this.props['aria-expanded']}
                target={target}
                className={this.buildClassName(this.props)}
                onClick={this.props.onClick || this.props.clickEvent}>
                {this.props.icon}
                {this.props.children || this.props.linkDisplayText}
                {externalIcon}
            </a>
        );
    }
}

IrsLink.propTypes = {
    /**@param {string} aria-label - Add support for HTML/ARIA label attribute from W3C spec for <a> anchor elements */
    'aria-label': PropTypes.string,
    /**@param {boolean} area-expanded - Tracks whether the link has been clicked or not to screen readers. */
    'aria-expanded': PropTypes.bool,
    /**@param {string} href - Add support for HTML href attribute from W3C spec for <a> anchor elements */
    href: PropTypes.string,
    /**@param {string} onClick - Add support for HTML onclick attribute from W3C spec for <a> anchor elements */
    onClick: PropTypes.func,
    /**@param {boolean} newWindow - Determines if a new window will open in result of clicking the link */
    newWindow: PropTypes.bool,
    /**[Deprecated]
     * Term should be delimit(er) not delineate
     * For more effective management of CSS, style delimiters should be defined at
     * the collection/list level semantically
     * @param {boolean} addDelineater - Determines if the link should be delineated */
    addDelineater: PropTypes.bool,
    /**[Deprecated]
     * use HTML/ARIA aria-label attribute instead
     * @param {string} linkDescription - Provides the text description that the screen reader will access */
    linkDescription: PropTypes.string,
    /**[Deprecated]
     * use HTML href attribute instead
     * @param {string} linkDestination - Provides the URL the link will navigate to */
    linkDestination: PropTypes.string,
    /**[Deprecated]
     * define child element instead
     * @param {string} linkDisplayText - Provides the text for the link itself */
    linkDisplayText: PropTypes.string,
    /**[Deprecated]
     * For more effective management of CSS, link color should be defined at the same level as the background color
     * @param {boolean} blue - Determines if the link should be blue or white */
    blue: PropTypes.bool,
    /**@param {element} icon - Allows for an icon to be added onto the link */
    removeLinkClass: PropTypes.bool,
    /**@param {element} removeLinkClass - Allows for removal of link class for header help link*/
    icon: PropTypes.element,
    /**@param {boolean} noPadding - Flag for whether there should be side padding or not */
    noPadding: PropTypes.bool,
    /**[Deprecated]
     * use HTML onclick attribute instead
     * @param {func} clickEvent - Provides the onclick event to be fired for the link itself */
    clickEvent: PropTypes.func,
    /**Note: not implemented
     * @param {string} arrowClasses - Class name(s) passed to ExternalArrow component */
    arrowClasses: PropTypes.string,
};

IrsLink.defaultProps = {
    'aria-label': null,
    'aria-expanded': null,
    href: null,
    onclick: null,
    newWindow: false,
    addDelineater: false,
    linkDescription: null,
    linkDestination: null,
    linkDisplayText: 'Empty Link Object Provided',
    blue: true,
    removeLinkClass: null,
    icon: null,
    noPadding: true,
    clickEvent: null,
    arrowClasses: null,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import htmlSanitize from 'sanitize-html-react';
import AlertBox from '../AlertBox';
import './RedlineMessage.css';
import Truncate from '../Truncate';
import ReactHtmlParser from 'react-html-parser';

/**
 * This component renders an Alert Box and populates the data with
 * the response from a call to the Redline Endpoint API. We are expecting
 * to receive HTML that will be rendered in the alert box, which is why
 * this component is necessary. This component will receives the API response
 * via message prop and then sanitize the HTML string to remove any script tags.
 * SANITIZATION OF THE HTML STRING IS MANDATORY FOR SECURITY.
 */
export default class RedlineMessage extends Component {
    constructor(props) {
        super(props);

        this.header = null;

        // we need to render the received html in a div, which
        // we pass into the alert box to be rendered. We sanitize it here
        // to prevent any circumvention of sanitization.

        // DANGER: Developers -- be VERY CAREFUL about changing this line.
        //         THE CONTENT NEEDS TO BE SANITIZED

        this.sanitizedHtml = htmlSanitize(props.message, {
            allowedTags: ['a', 'span', 'strong', 'i', 'b', 'em', 'u', 'br', 'h2', 'h3', 'ul', 'ol', 'li', 'p',],
            allowedAttributes: {
                a: ['href', 'name', 'target', 'rel', 'class', 'aria-label',],
                span: ['class'],
            },
        });

        this.preparedMessage = this.removeClasses(this.sanitizedHtml);

        this.removedMessageHeader = this.removeHeader(this.preparedMessage);
    }

    /**
     * @method removeClasses
     * Function that prepares the message body for truncation by:
     * 1. removing the sr-only text and appending it as an aria-label attribute
     *    of the parent a tag to preserve accessability
     * 2. removing expand-content__collapsed class attribute
     *    to avoid truncation text class inconsistencies
     */
    removeClasses = string => {

        const frag = document.createRange().createContextualFragment(string);
        const srClassElements = frag.querySelectorAll('.sr-only');
        for (let element of srClassElements) {
            const elInnerText = element.innerText;
            element.parentNode.ariaLabel = elInnerText;
            element.parentNode.removeChild(element);
        }

        let expandCollapsedElements = frag.querySelectorAll('.expand-content__collapsed');
        if (expandCollapsedElements.length > 0) {
            for (let element of expandCollapsedElements)
                element.classList.remove('expand-content__collapsed');
        }

        let div = document.createElement('div');
        div.appendChild(frag);
        return div.innerHTML;
    };

    /**
     * @method removeHeader
     * Function that prepares the message body for truncation by
     * removing the header from the api response
     */
    removeHeader = string => {
        const frag = document.createRange().createContextualFragment(string);
        const tempHeader = frag.querySelector('h2');

        if (typeof tempHeader !== 'undefined' && tempHeader !== null) {
            this.header = tempHeader.innerHTML;

            // if element has a h2 remove it
            tempHeader.parentNode.removeChild(tempHeader);

            //return frag with header removed
            let div = document.createElement('div');
            div.appendChild(frag);
            return div.innerHTML;
        } else {
            return string;
        }
    };

    componentDidMount() {
        if (this.props.img && this.props.message) {
            let redlineContent = document.getElementById(
                'redline-message__content'
            );
            if (
                redlineContent &&
                redlineContent.getElementsByTagName('a').length >= 1
            ) {
                let originalLink = document
                    .getElementById('redline-message__content')
                    .getElementsByTagName('a');
                let image =
                    '<img alt=\'\' className=\'' +
                    'external-icon' +
                    '\' src=\'' +
                    this.props.img +
                    '\'/>';
                for (var key of Object.keys(originalLink)) {
                    let inner = originalLink[key].innerHTML + image;
                    document
                        .getElementById('redline-message__content')
                        .getElementsByTagName('a')[key].innerHTML = inner;
                }
            }
        }
    }

    /**
     * We perform the get request after the component becomes mounting
     * to prevent a delay in first paint of the component.
     */

    render() {
        if (
            !this.props.message ||
            this.props.message === 'null' ||
            this.props.message.search('Failed to fetch') > -1 ||
            this.props.message.search('Network request failed') > -1 ||
            this.props.message.search('NetworkError') > -1
        ) {
            return null;
        }

        let parser = new DOMParser();
        let doc = parser.parseFromString(this.sanitizedHtml, 'text/html');
        let redlineText = doc.getElementsByTagName('body')[0].textContent;

        if (redlineText.length > 1000) {
            return null;
        }

        //Sets default header if one isn't supplied by EAP api or redlineTitle prop
        let title = this.header ?? this.props.redlineTitle ?? 'Important Message from the IRS';

        // MSIE 11 Check
        let isIE = navigator.userAgent.indexOf('Trident/7.0') > -1;

        if (isIE || redlineText.length < 124) {
            return (
                <AlertBox
                    title={title}
                    content={
                        <div id='redline-message__content'>
                            <p>{ReactHtmlParser(this.removedMessageHeader)}</p>
                        </div>
                    }
                    headerLevel={2}
                />
            );
        } else {
            return (
                <AlertBox
                    title={title}
                    content={
                        <Truncate
                            id='redline-message__content'
                            removedHeaderMessage={this.removedMessageHeader}
                            {...this.props}
                        />
                    }
                    headerLevel={2}
                />
            );

        }
    }
}

RedlineMessage.propTypes = {
    message: PropTypes.string,
};

RedlineMessage.defaultProps = {
    message: '',
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import './Truncate.css';
import clip from 'text-clipper';

export default class Truncate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            size: null,
            displayMessage: null,
        };

        this.messageDiv = React.createRef();
        this.handleMqlChange = this.handleMqlChange.bind(this);

        // Define media queries
        this.queryDict = {
            '(min-width: 1200px)': {
                mql: null,
                size: 'xl',
                addEventListenerAvailable: null,
                displayMessage: `${clip(this.props.removedHeaderMessage, 122, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                }
                )}...`,
            },
            '(min-width: 992px) and (max-width: 1199px)': {
                mql: null,
                size: 'l',
                addEventListenerAvailable: null,
                displayMessage: `${clip(this.props.removedHeaderMessage, 106, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                }
                )}...`,
            },
            '(min-width: 768px) and (max-width: 991px)': {
                mql: null,
                size: 'm',
                addEventListenerAvailable: null,
                displayMessage: `${clip(this.props.removedHeaderMessage, 65, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                }
                )}...`,
            },
            '(min-width: 576px) and (max-width: 767px)': {
                mql: null,
                size: 's',
                addEventListenerAvailable: null,
                displayMessage: `${clip(this.props.removedHeaderMessage, 46, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                }
                )}...`,
            },
            '(max-width: 575px)': {
                mql: null,
                size: 'xs',
                addEventListenerAvailable: null,
                displayMessage: `${clip(this.props.removedHeaderMessage, 24, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                }
                )}...`,
            },
        };

        // Store references for un-mounting later
        for (const [key, { size, displayMessage }] of Object.entries(
            this.queryDict
        )) {
            let mql = window.matchMedia(key);
            this.queryDict[key].mql = mql;
            if (mql?.matches) this.state = { ...this.state, size, displayMessage };

            // Checks addEventListener is available to the object which also determines if it is IE browser
            this.queryDict[key].addEventListenerAvailable = typeof this.queryDict[key] === 'object' && this.queryDict[key] !== null && 'addEventListener' in this.queryDict[key].mql;
        }
    }

    componentDidMount = () => {

        // Add event listeners for changes in media query state
        for (const query in this.queryDict) {

            // If addEventListener is not available to media query object then
            // add listener which means that user is using IE
            this.queryDict[query].addEventListenerAvailable ?
                this.queryDict[query].mql?.addEventListener(
                    'change',
                    this.handleMqlChange,
                )
                :
                this.queryDict[query].mql?.addListener(
                    'change',
                    this.handleMqlChange,
                )

        }
        // Initialize message container height
        this.setContainerStyle();
    };

    componentWillUnmount = () => {

        // Remove event listeners if component leaves dom
        for (const query in this.queryDict) {

            // If addEventListener is not available to media query object then
            // remover listener which means that user is using IE
            this.queryDict[query].addEventListenerAvailable ?
                this.queryDict[query].mql?.removeEventListener(
                    'change',
                    this.handleMqlChange
                )
                :
                this.queryDict[query].mql?.removeListener(
                    'change',
                    this.handleMqlChange
                )

        }
    };

    /**
     * @method handleMqlChange
     * Function that is attached to a media query event listener and changes the
     * currentCharSize state value based on the screen width.
     */
    handleMqlChange = mql => {
        if (mql?.matches) this.setState({
            size: this.queryDict[mql?.media].size,
        });
        this.assignSnippet();
    };

    /**
     * @method assignSnippet
     * Function that checks the current media query and assigns the correct
     * snippet in state.
     */
    assignSnippet = () => {
        for (const query in this.queryDict) {
            if (this.queryDict[query].size === this.state.size) {
                this.setState(
                    {
                        displayMessage: !this.state.isOpen
                            ? this.queryDict[query].displayMessage
                            : this.props.removedHeaderMessage,
                    },
                    () => {
                        this.setContainerStyle();
                    }
                );
                break;
            }
        }
    };

    /**
     * @method setContainerStyle
     * Function that sets the style height of the message div to allow for a
     * CSS transition animation.
     */
    setContainerStyle = () => {
        if (this.messageDiv && this.messageDiv.current) {
            this.messageDiv.current.style.height = `${this.messageDiv.current.childNodes[0].scrollHeight}px`;
        }
    };

    /**
     * @method toggleContent
     * Function that switches between content snippet and full content.
     */
    toggleContent = () => {
        this.setState({ isOpen: !this.state.isOpen }, () => {
            this.assignSnippet();
        });
    };

    render() {
        let isOpen = this.state.isOpen;

        let readMore = 'Read more';
        let readLess = 'Read less';
        let ariaLabelLess = 'Read less about the important message from the IRS';
        let ariaLabelMore = 'Read more about the important message from the IRS';

        //If there is a languagePicker provide translated text
        if (this.props.hasLangPicker) {
            readMore = this.props.readMore;
            readLess = this.props.readLess;
            ariaLabelMore = this.props.ariaLabelMore;
            ariaLabelLess = this.props.ariaLabelLess;
        }

        let buttonText = !isOpen ? readMore : readLess;
        let ariaLabel = !isOpen ? ariaLabelMore : ariaLabelLess;

        let isRight = !isOpen ? '' : 'read-less';
        let truncateMessage = !isOpen
            ? 'truncate-message'
            : 'truncate-message truncate-message__message-column';
        const externalLinkStyles = this.props.img
            ? `.truncate-message__content .irs-external-link:after{background-image:url(${this.props.img});}`
            : '.truncate-message__content .irs-external-link:after{display:none;}';

        return (
            <div
                className={`${truncateMessage}`}>
                {/* Using <style> here to assign dynamic this.props.img as background-image for :after */}
                <style>{externalLinkStyles}</style>
                <div className='truncate-message__content' ref={this.messageDiv}>
                    <p>{(ReactHtmlParser(this.state.displayMessage))}</p>
                </div>
                <button
                    className={`read-link ${isRight}`}
                    onClick={() => this.toggleContent()}
                    aria-expanded={this.state.isOpen}
                    aria-label={ariaLabel}
                >
                    {buttonText}
                </button>
            </div>
        )
    }
}

Truncate.propTypes = {
    removedHeaderMessage: PropTypes.string,
    img: PropTypes.string,
    hasLangPicker: PropTypes.bool,
    readMore: PropTypes.string,
    readLess: PropTypes.string,
    ariaLabelMore: PropTypes.string,
    ariaLabelLess: PropTypes.string,
};

Truncate.defaultProps = {
    removedHeaderMessage: '',
    img: null,
    hasLangPicker: false,
    readMore: '',
    readLess: '',
    ariaLabelMore: '',
    ariaLabelLess: '',
};
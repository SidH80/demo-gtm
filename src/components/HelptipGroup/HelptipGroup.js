import React, { Component } from 'react';
//Styles
import './HelptipGroup.css';
//Components
import HelptipButton from '../HelptipButton';
import HelptipContent from '../HelptipContent';
import PropTypes from 'prop-types';

/**
 * This component groups the HelptipButton and HelptipContent components into a contained
 * unit. It is also responsible for calculating the position of the caret that points
 * to the helptip open/close icons.
 */
export default class HelptipGroup extends Component {
    constructor() {
        super();
        this.state = {
            pointerPosition: 0,
        };
        this.contentRef = React.createRef();
    }

    /**@function componentDidMount Function that when triggered upon component mounting adjusts sizing */
    componentDidMount() {
        this.calculatePointerOffset();
        window.addEventListener('resize', this.calculatePointerOffset);
    }
    /**@function componentWillUnmount Function that when triggered upon component unmounting adjusts sizing */
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculatePointerOffset);
    }
    /**
     * @method calculatePointerOffset
     * @return {number} position
     * Calculates and returns the desired offset to position helptip pointer
     * underneath "?"/"i" icon.
     */
    calculatePointerOffset = () => {
        const elem = document.getElementById(this.props.id);
        const contentBoundingRect =
            this.contentRef.current !== null
                ? this.contentRef.current.getBoundingClientRect()
                : { left: 0 };
        const selectorBoundingRect =
            elem !== null ? elem.getBoundingClientRect() : { left: 0 };
        const position =
            selectorBoundingRect !== undefined
                ? selectorBoundingRect.left -
                  contentBoundingRect.left +
                  (this.props.buttonOffset + this.props.iconOffset) / 2 -
                  0.5
                : 0;
        this.setState({ pointerPosition: position });
    };

    render() {
        /**
         * NOTE: Helptip pointer positioning works like this:
         * 1. HelptipContent is positioned using CSS position attribute = 'relative'
         * 2. PointerIcon is a nested child of HelptipContent. It's position is 'absolute' relative to its parent.
         * 3. PointerIcon is vertically positioned with a static 'top' attribute relative to its parent.
         * 4. PointerIcon is horizontally positioned via value dynamically calculated by 'calculatePointerOffset' and passed as prop 'pointerPosition'.
         */
        return (
            <span className='helptip-group' ref={this.contentRef}>
                <HelptipButton
                    isOpen={this.props.open}
                    id={this.props.id}
                    label={this.props.label}
                    ariaLabel={this.props.ariaLabel}
                    buttonOffset={this.props.buttonOffset}
                    clickHandler={this.props.toggle}
                    component={this.props.component}
                    iconOffset={this.props.iconOffset}
                    inputRef={this.props.inputRef}
                    isBold={this.props.bold}
                />
                {this.props.open && (
                    <HelptipContent
                        content={this.props.content}
                        isOpen={this.props.open}
                        pointerPosition={this.state.pointerPosition}
                    />
                )}
            </span>
        );
    }
}

HelptipGroup.propTypes = {
    open: PropTypes.bool,
    toggle: PropTypes.func,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    buttonOffset: PropTypes.number,
    helptipContent: PropTypes.object,
    iconOffset: PropTypes.number,
    component: PropTypes.string,
    inputRef: PropTypes.object,
    bold: PropTypes.bool,
};

HelptipGroup.defaultProps = {
    open: true,
    toggle: () => {},
    id: '',
    buttonOffset: 0,
    content: (
        <p style={{ fontWeight: 'bold' }}>
            This is a helptip. Helptips display additional information regarding
            a topic.
        </p>
    ),
    iconOffset: 5,
    component: 'h3',
    inputRef: null,
    bold: false,
};

import React from 'react';
import PropTypes from 'prop-types';
import AccordionIcon from '../AccordionIcon';
import './AccordionRow.css';

/**
 * @description - This component renders an expandable accordion row inside
 * whatever container it is placed in. You are able to place it
 * in a div and let it exist by itself, or by placing it as a
 * row in a table. If you pass the row a content prop with text,
 * it will display the text. You can also pass it HTML and it
 * will render that HTML.
 */
export default function AccordionRow(props) {
    const HeaderTag = `h${props.headerLevel}`;
    const expandedContent = props.open ? (
        <div
            className='accordion-row__expanded-content'
            style={props.contentStyles}>
            {props.expandedContent}
        </div>
    ) : null;

    var parentClasses = props.bounded
        ? 'accordion accordion--bounded'
        : 'accordion accordion--unbounded';
    if (props.noBottom) {
        parentClasses = `${parentClasses} accordion--no_bottom_border`;
    }
    var buttonClasses = props.blue
        ? 'accordion__toggle accordion--blue'
        : 'accordion__toggle';
    buttonClasses =
        props.open && !props.noButtonBottom
            ? `${buttonClasses} accordion--open`
            : buttonClasses;
    if (props.unopenable) {
        return (
            <div className={parentClasses}>
                <HeaderTag className='accordion__header-tag'>
                    <button
                        disabled
                        aria-expanded='false'
                        aria-labelledby={props.ariaLabel}
                        type='button'
                        className={buttonClasses}
                        style={props.buttonStyles}
                        aria-disabled='true'>
                        <span className='accordion__content accordion--unopenable'>
                            {props.content}
                        </span>
                    </button>
                </HeaderTag>
            </div>
        );
    }
    return (
        <div className={parentClasses}>
            <HeaderTag className='accordion__header-tag'>
                <button
                    aria-expanded={props.open}
                    aria-labelledby={props.ariaLabel}
                    className={buttonClasses}
                    onClick={props.onClick}
                    style={props.buttonStyles}
                    type='button'>
                    <AccordionIcon
                        isOpen={props.open}
                        aria-expanded={props.open}
                        iconStyles={props.iconStyles}
                        OpenComponent={props.OpenComponent}
                        ClosedComponent={props.ClosedComponent}
                    />
                    <span className='accordion__content'>{props.content}</span>
                </button>
            </HeaderTag>
            {expandedContent}
        </div>
    );
}

AccordionRow.propTypes = {
    /**@prop {function} content - Provides a description for the AccordionRow */
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**@prop {object} contentStyles - CSS attributes for AccordionRow content*/
    contentStyles: PropTypes.object,
    /**@prop {function} expandedContent - More in depth text displayed after toggling */
    expandedContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**@prop {boolean} bounded - Determines if the accordion header tag should be bound to the accordion container */
    bounded: PropTypes.bool,
    /**@prop {number} headerLevel - Controls the level of the header */
    headerLevel: PropTypes.number,
    /**@prop {boolean} noBottom - Says whether a bottom border will be added to the accordion row */
    noBottom: PropTypes.bool,
    /**@prop {boolean} blue - Determines whether a blue background should be applied to the accordion row */
    blue: PropTypes.bool,
    /**@prop {boolean} unopenable - Determines whether an accordion row should just show as a box that can't be opened */
    unopenable: PropTypes.bool,
    ariaLabel: PropTypes.string,
    noButtonBottom: PropTypes.bool,
    /**@prop {boolean} unopenable - Determines accordion button styling */
    buttonStyles: PropTypes.object,
    /** @prop OpenComponent - component to overwrite the minus icon */
    OpenComponent: PropTypes.node,
    /** @prop ClosedComponent - component to overwrite the plus icon */
    ClosedComponent: PropTypes.node,
};

AccordionRow.defaultProps = {
    content: 'Accordion Item: Click to Expand',
    contentStyles: {
        marginTop: '10px',
        marginRight: '5%',
        marginBottom: '10px',
        marginLeft: '5%',
        backgroundColor: '#FFFFFF',
    },
    expandedContent: null,
    bounded: false,
    headerLevel: 3,
    noBottom: false,
    blue: false,
    unopenable: false,
    ariaLabel: '',
    noButtonBottom: false,
    buttonStyles: {
        paddingBottom: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '16px',
    },
};

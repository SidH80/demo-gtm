import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ExpandContent.css';

/**
 * @description - This component is responsible for creating a
 * div that is collapsible/expandable to read more or read less
 * content.
 *
 */

const ExpandContent = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCollapsedText, setShowCollapsedText] = useState(true);
    const [hasBeenOpenedOnce, setHasBeenOpenedOnce] = useState(false);
    const [clientHeight, setClientHeight] = useState(false);

    const {
        collapsedText,
        collapsedLinkText,
        expandedLinkText,
        transitionDurationSeconds,
        classes,
        collapsedLinkAriaLabel,
        expandedLinkAriaLabel,
        onOpen,
        onClose,
    } = props;

    console.error(props);

    const defaultStyles = {
        overflow: 'hidden',
        position: 'relative',
    };

    const inlineStyle = defaultStyles;

    const contentClasses =
        'expand-content__content' +
        ' ' +
        'expand-content__content' +
        '--' +
        (isOpen ? 'open' : 'closed');

    const displayClass = isOpen ? '-isOpen' : '-isClosed';

    useEffect(() => {
        if (!clientHeight) {
            let newClientHeight = props.collapseWrapper?.clientHeight;
            setClientHeight({ newClientHeight });
        }
    }, []);

    useEffect(() => {
        window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        if (isOpen) {
            if (props.readLessSpan) {
                collapseWrapper.focus();
            }
        } else if (hasBeenOpenedOnce) {
            if (props.readMoreSpan) {
                readMoreSpan.focus();
            }
        }
    }, [handleKeyPress]);

    const toggleHeight = () => {
        if (isOpen) {
            setHasBeenOpenedOnce(true);
            // used to delay showing of "Read More" line until transition is complete
            setTimeout(() => {
                setShowCollapsedText(true);
            }, transitionDurationSeconds * 1000);
            if (onClose) {
                onClose();
                setIsOpen(false);
            }
        } else {
            setShowCollapsedText(false);
            if (onOpen) {
                onOpen();
                setIsOpen(true);
            }
        }
    };

    const handleKeyPress = e => {
        let key = e.which || e.keyCode;
        if (key === 13) {
            let targetClassName = e.target.className;
            if (
                targetClassName &&
                (targetClassName.includes('expand-content__less-link') ||
                    targetClassName.includes('expand-content__more-link'))
            ) {
                toggleHeight();
            }
        }
    };

    return (
        <div className={'expand-content' + ' ' + classes}>
            <span
                className={contentClasses}
                ref={props.collapseWrapper}
                style={inlineStyle}
                tabIndex='-1'>
                {!isOpen && showCollapsedText && (
                    <span
                        className={'expand-content__collapsed' + displayClass}>
                        <p>
                            {collapsedText}
                            <span
                                className='expand-content__more-link'
                                role='link'
                                tabIndex='0'
                                aria-expanded={false}
                                aria-label={collapsedLinkAriaLabel}
                                onClick={() => {
                                    toggleHeight();
                                }}
                                ref={props.readMoreSpan}>
                                {collapsedLinkText}
                            </span>
                        </p>
                    </span>
                )}
                <span
                    focusable={isOpen ? 'true' : 'false'}
                    aria-hidden={isOpen ? 'false' : 'true'}
                    className={'expand-content__children' + displayClass}
                    style={{
                        marginTop:
                            !isOpen && window.screen.width < 400
                                ? '20px'
                                : null,
                    }}>
                    {props.children}
                </span>
            </span>
            {isOpen && (
                <span
                    className='expand-content__less-link'
                    style={{ float: 'right' }}
                    role='link'
                    tabIndex='0'
                    aria-expanded={true}
                    aria-label={expandedLinkAriaLabel}
                    onClick={() => {
                        toggleHeight();
                    }}
                    ref={props.readLessSpan}>
                    {expandedLinkText}
                </span>
            )}
        </div>
    );
};

export default React.forwardRef((props, ref) => (
    <ExpandContent {...props} ref={ref} />
));

ExpandContent.propTypes = {
    /**@prop {string} collapsedText - Provides the link text displayed when collapsed*/
    collapsedText: PropTypes.string,
    /**@prop {string} collapsedLinkText - Provides the link text displayed when collapsed*/
    collapsedLinkText: PropTypes.string,
    /**@prop {string} expandedLinkText - Provides the link text displayed when expanded*/
    expandedLinkText: PropTypes.string,
    /**@prop {number} transitionDurationSeconds - Provides the duration in seconds for expand/collapse transition*/
    transitionDurationSeconds: PropTypes.number,
    /**@prop {string} classes - Provides ability to add a class to alert box container*/
    classes: PropTypes.string,
    /**@prop {string} collapsedLinkAriaLabel - Provides ability to set the aria-label on the collapsed link*/
    collapsedLinkAriaLabel: PropTypes.string,
    /**@prop {string} expandedLinkAriaLabel - Provides ability to set the aria-label on the expanded link*/
    expandedLinkAriaLabel: PropTypes.string,
    /**@prop {string} onOpen - Provides ability to call a function when content is opened*/
    onOpen: PropTypes.func,
    /**@prop {string} onOpen - Provides ability to call a function when content is closed*/
    onClose: PropTypes.func,
};

ExpandContent.defaultProps = {
    collapsedText: 'This is default collapsed text ...',
    collapsedLinkText: 'Read more',
    expandedLinkText: 'Read less',
    transitionDurationSeconds: 0,
    classes: '',
    collapsedLinkAriaLabel: '',
    expandedLinkAriaLabel: '',
    onOpen: null,
    onClose: null,
};

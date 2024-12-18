import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import './Loading.css';

/**
 * @description This class creates a component, which triggers when a page is loading,
 * and displays a loading spinner CSS icon and "Loading" text. It has been
 * retrofitted from the existing spinner in the BALDUE MPV, for compatibility in React.
 */

const Loading = ({
    pageOverlay,
    messageVariant,
    shouldFocus,
    children,
    messageSubtitle,
    message,
    onRemove,
}) => {
    const loadingSpinner = createRef();
    // If pageOverlay is true, use h1.  Else, check if messageVariant prop is in list of validElements - if so, use it and if not, use h2.
    // Note - if pageOverlay is false, and no messageVariant provided, it will default to 'h2' - since default messageVariant prop 'h1' is not in validElements

    const getMessageVariant = () => {
        const validElements = ['h2', 'p'];
        if (pageOverlay) {
            return 'h1';
        } else if (validElements.includes(messageVariant)) {
            return messageVariant;
        } else {
            return 'h2';
        }
    };

    useEffect(() => {
        if (pageOverlay && loadingSpinner.current !== null) {
            loadingSpinner.current.focus();
        }
        if (loadingSpinner.current !== null && shouldFocus) {
            loadingSpinner.current.focus();
        }
        return () => {
            onRemove();
        };
    }, []);

    const overlayClassname =
        pageOverlay === true
            ? 'loading-overlay fixed-pos'
            : 'loading-overlay--page-body relative-pos';
    const textClassname =
        pageOverlay === true ? 'loading-text' : 'loading-text-black';

    const childMessage = children;

    // if theres a child passed to component it needs to have a string as a child
    if (
        childMessage &&
        (!childMessage?.props.children ||
            typeof childMessage.props?.children !== 'string')
    ) {
        throw Error(
            'Child component must be a heading element containing a string'
        );
    }

    const Tag = childMessage?.type ? childMessage.type : getMessageVariant();

    const childrenMessage = childMessage?.props.children;

    const Subtitle = messageSubtitle ? (
        <p className='spinner-subtitle'>{messageSubtitle}</p>
    ) : null;

    return (
        <div className={overlayClassname} data-testid='overlay'>
            <div className='spinner-container'>
                <div className='spinner-container-cell'>
                    <div className='centered'>
                        <LoadingSpinner pageOverlay={pageOverlay} />
                        <Tag
                            className={textClassname}
                            tabIndex='-1'
                            ref={loadingSpinner}>
                            {childrenMessage || message}
                        </Tag>
                        {Subtitle}
                    </div>
                </div>
            </div>
        </div>
    );
};

Loading.propTypes = {
    /**@param {boolean} pageOverlay - Class name(s) passed to define whether page overlay is used */
    pageOverlay: PropTypes.bool,
    /**@param {string} message - Message with loading spinner */
    message: PropTypes.string,
    /**@param {string} messageVariant - HTML element for loading spinner message */
    messageVariant: PropTypes.string,
    /**@param {boolean} shouldFocus - If the spinner should be focused */
    shouldFocus: PropTypes.bool,
    /**@param {string} messageSubtitle - An optional subtitle for the main loading spinner message */
    messageSubtitle: PropTypes.string,
    /**@param {node} children */
    children: PropTypes.node,
    /**@param {function} onRemove -An optional function that will return when loading spinner unmounts*/
    onRemove: PropTypes.func,
};

Loading.defaultProps = {
    pageOverlay: true,
    message: 'Loading...',
    messageVariant: 'h1',
    shouldFocus: false,
    messageSubtitle: null,
    children: null,
    onRemove: () => {},
};

export { Loading };

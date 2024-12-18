import React from 'react';
import PropTypes from 'prop-types';

import './Typography.css';

/**
 * This hash table is a one-to-one
 * with the CSS class name modifiers
 * used inside of the CSS file.
 */
const SIZES = {
    // 12px
    XXS: 'xxs',
    // 16px
    XS: 'xs',
    // 20px
    SM: 'sm',
    // 24px
    MD: 'md',
    // 28px
    LG: 'lg',
    // 40px
    XL: 'xl',
};

/**
 * Entries for this hash table are to be
 * a valid HTML element type with a default
 * text size and a component to render with
 * props.
 */
const TEXT_ELEMENTS = {
    // Headings
    H1: {
        defaultTextSize: SIZES.LG,
        component: ({ children, textRef, ...props }) => (
            <h1 ref={textRef} {...props}>
                {children}
            </h1>
        ),
    },
    H2: {
        defaultTextSize: SIZES.MD,
        component: ({ children, textRef, ...props }) => (
            <h2 ref={textRef} {...props}>
                {children}
            </h2>
        ),
    },
    H3: {
        defaultTextSize: SIZES.SM,
        component: ({ children, textRef, ...props }) => (
            <h3 ref={textRef} {...props}>
                {children}
            </h3>
        ),
    },
    H4: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <h4 ref={textRef} {...props}>
                {children}
            </h4>
        ),
    },
    H5: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <h5 ref={textRef} {...props}>
                {children}
            </h5>
        ),
    },
    H6: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <h6 ref={textRef} {...props}>
                {children}
            </h6>
        ),
    },
    P: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <p ref={textRef} {...props}>
                {children}
            </p>
        ),
    },
    B: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <b ref={textRef} {...props}>
                {children}
            </b>
        ),
    },
    SPAN: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <span ref={textRef} {...props}>
                {children}
            </span>
        ),
    },
    SMALL: {
        defaultTextSize: SIZES.XXS,
        component: ({ children, textRef, ...props }) => (
            <small ref={textRef} {...props}>
                {children}
            </small>
        ),
    },
    STRONG: {
        defaultTextSize: SIZES.XS,
        component: ({ children, textRef, ...props }) => (
            <strong ref={textRef} {...props}>
                {children}
            </strong>
        ),
    },
    LEGEND: {
        defaultTextSize: SIZES.XXS,
        component: ({ children, textRef, ...props }) => (
            <legend ref={textRef} {...props}>
                {children}
            </legend>
        ),
    },
    CAPTION: {
        defaultTextSize: SIZES.XXS,
        component: ({ children, textRef, ...props }) => (
            <caption ref={textRef} {...props}>
                {children}
            </caption>
        ),
    },
    FIGCAPTION: {
        defaultTextSize: SIZES.XXS,
        component: ({ children, textRef, ...props }) => (
            <figcaption ref={textRef} {...props}>
                {children}
            </figcaption>
        ),
    },
};

export const isValidElement = element =>
    typeof element === 'string' && element.toUpperCase() in TEXT_ELEMENTS;
export const isValidSize = size =>
    typeof size === 'string' && size.toUpperCase() in SIZES;

/**
 * @description component for rendering proper
 * typography styling associated with various
 * text elements to enforce design standards
 * across the application.
 *
 * This benefits developers by not having to read
 * design specs for text content and reduces the
 * amount of duplicated CSS in the main application.
 */
export const Typography = ({
    m,
    as,
    size,
    margin,
    textRef,
    children,
    removeMargins,
    ...rest
}) => {
    /**
     * If user does not supply a valid
     * element type, fall back to a paragraph.
     *
     * Although we can set paragraph as a
     * default prop, default props will not
     * save us for invalid prop types at
     * run-time for an element that does
     * not exist in the TEXT_ELEMENT hash table.
     * @example <Typography as="badElType" />
     * The above will error out if we do not
     * use a fallback as done here,
     */
    if (!isValidElement(as)) {
        // TODO: console.warn about invalid type
        as = 'P';
    }

    /**
     * If user does not supply a valid size,
     * use the element's default size
     *
     * We cannot set this in default props since
     * it has a dependency on the prop being passed in
     * and also has the same risk as the code comment
     * for the isValidElement check above
     */
    if (!isValidSize(size)) {
        // TODO: warn about invalid sizes
        size = TEXT_ELEMENTS[as.toUpperCase()]['defaultTextSize'];
    }

    const fontStyles = `typography--${size}`;
    const marginStyles = removeMargins ? 'typography--zero-margins' : '';
    const TextElement = TEXT_ELEMENTS[as.toUpperCase()]['component'];

    return (
        <TextElement
            className={`typography ${fontStyles} ${marginStyles}`}
            style={{ margin: m || margin }}
            textRef={textRef}
            {...rest}>
            {children}
        </TextElement>
    );
    //return getTextElement(children, `${fontStyles} ${marginStyles}`, { margin: m || margin })[as.toUpperCase()];
};

Typography.propTypes = {
    /**@prop m - shorthand for modifying the margins of the block text element */
    m: PropTypes.string,

    /**@prop as - which HTML element the component should render as */
    as: PropTypes.oneOf([
        ...Object.keys(TEXT_ELEMENTS),
        ...Object.keys(TEXT_ELEMENTS).map(el => el.toLowerCase()),
    ]),

    /**@prop size - the font-size of the text element (XXS, XS, SM, MD, LG, XL) */
    size: PropTypes.string,

    /**@prop margin - modifies the margins of the block text element */
    margin: PropTypes.string,

    /**@prop removeMargins - determines if all margins should be removed from the block text element */
    removeMargins: PropTypes.bool,
};

Typography.defaultProps = {
    /** initialize to paragraphs since they are the most heavily used */
    as: 'p',

    /** initialize to null to avoid default inline-styling */
    margin: null,

    removeMargins: false,
};

export default React.forwardRef((props, ref) => {
    return <Typography textRef={ref} {...props} />;
});

import React from 'react';
import PropTypes from 'prop-types';
import './ContentBox.css';

/**
 * @description - This component is responsible for creating a box
 * that the content lives in. It is a component responsible
 * for formatting and presentation. If a title is not included
 * as a prop, it will not be rendered.
 */
const ContentBox = ({
    title,
    border,
    titleComponent: TitleComponent,
    titleId,
    children,
}) => {
    const classes = border ? 'content-box content-box__border' : 'content-box';

    return (
        <section className={classes} aria-labelledby={titleId}>
            <TitleComponent className='content-box__title' id={titleId}>
                {title}
            </TitleComponent>
            <div className='content-box__content'>{children}</div>
        </section>
    );
};

ContentBox.propTypes = {
    /**@prop {string} title - Title text for ContentBox */
    title: PropTypes.string,
    /**@prop {boolean} border - Determines if a border will surround the box */
    border: PropTypes.bool,
    /**@prop children - the content of the content box*/
    children: PropTypes.node,
    /**@prop {string} titleComponent - Determines which component the title will be (h2, h3, etc.) */
    titleComponent: PropTypes.string,
    /**@prop {string} titleId - Determines the title Id. If there's more than one box on a page, it should be changed from the default id */
    titleId: PropTypes.string,
};

ContentBox.defaultProps = {
    title: '',
    border: false,
    children: null,
    titleComponent: 'h2',
    titleId: 'content-box__title',
};

export default ContentBox;

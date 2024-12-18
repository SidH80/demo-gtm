import React from 'react';
import './EmphasisTag.css';
import PropTypes from 'prop-types';

/**
 * @description - This is a reusable tag component that can be used anywhere on the site.
 */
export default function EmphasisTag({ srOnlyText, children }) {
    return (
        <div className='emphasisTag' role='textbox'>
            <p className='emphasisTagText'>{children}</p>
            <p className='sr-only' srOnlyText={srOnlyText}>
                New feature
            </p>
        </div>
    );
}

EmphasisTag.propTypes = {
    srOnlyText: PropTypes.string,
};

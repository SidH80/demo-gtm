import React from 'react';
import PropTypes from 'prop-types';

import './Body.css';
import Typography from '../../Typography';

export default function Body({ children }) {
    return (
        <Typography as='p' className='modal__body'>
            {children}
        </Typography>
    );
}

Body.propTypes = {
    /**@prop children - the content of the body, should be a string */
    children: PropTypes.node.isRequired,
};

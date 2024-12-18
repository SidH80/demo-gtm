import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Header.css';
import Typography from '../../Typography';

export default function Header({ children }) {
    const headerRef = useRef();

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.focus();
        }
    }, []);

    return (
        <Typography
            as='h1'
            className='modal__header'
            ref={headerRef}
            tabIndex='-1'>
            {children}
        </Typography>
    );
}

Header.propTypes = {
    /**@prop children - the content of the header, should be a string */
    children: PropTypes.node.isRequired,
};

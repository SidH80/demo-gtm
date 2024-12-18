import React from 'react';
import PropTypes from 'prop-types';
import './HelptipIcon.css';

/**
 * @description This component renders an icon that is representative for HelptipButton,
 * when the button is closed/unopened a question mark icon ("?") is rendered and when it is open a cross icon ("X") is rendered.
 */

const HelptipIcon = ({ id, isOpen }) => (
    <svg
        className='helptip-icon'
        id={id}
        data-gtm="Account Balance"
        data-testid='helptip-icon'
        focusable='false'
        height='16px'
        width='16px'
        viewBox='0 0 18 18'>
        {isOpen ? (
            <path
                className='helptip-icon-path'
                data-testid='helptip-opened'
                d='M9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 Z M9,17 C13.418278,17 17,13.418278 17,9 C17,4.581722 13.418278,1 9,1 C4.581722,1 1,4.581722 1,9 C1,13.418278 4.581722,17 9,17 Z M14.0000005,12.0471381 C14.0000005,12.2575757 13.9158253,12.4680132 13.76431,12.6195286 L12.619529,13.76431 C12.4680137,13.9158249 12.2575761,14 12.0471381,14 C11.8367005,14 11.6262629,13.9158249 11.4747476,13.76431 L8.99999999,11.2895624 L6.52525239,13.76431 C6.37373755,13.9158249 6.16329998,14 5.9528619,14 C5.74242433,14 5.53198676,13.9158249 5.38047142,13.76431 L4.23569046,12.6195286 C4.08417513,12.4680132 4,12.2575757 4,12.0471381 C4,11.8367005 4.08417513,11.6262625 4.23569046,11.4747476 L6.71043757,8.99999999 L4.23569046,6.52525239 C4.08417513,6.37373705 4,6.16329948 4,5.9528619 C4,5.74242383 4.08417513,5.53198626 4.23569046,5.38047142 L5.38047142,4.23568997 C5.53198676,4.08417463 5.74242433,4 5.9528619,4 C6.16329998,4 6.37373755,4.08417463 6.52525239,4.23568997 L8.99999999,6.71043757 L11.4747476,4.23568997 C11.6262629,4.08417463 11.8367005,4 12.0471381,4 C12.2575761,4 12.4680137,4.08417463 12.619529,4.23568997 L13.76431,5.38047142 C13.9158253,5.53198626 14.0000005,5.74242383 14.0000005,5.9528619 C14.0000005,6.16329948 13.9158253,6.37373705 13.76431,6.52525239 L11.2895624,8.99999999 L13.76431,11.4747476 C13.9158253,11.6262625 14.0000005,11.8367005 14.0000005,12.0471381 Z'
            />
        ) : (
            <path
                className='helptip-icon-path'
                data-testid='helptip-closed'
                d='M9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 Z M9,17 C13.418278,17 17,13.418278 17,9 C17,4.581722 13.418278,1 9,1 C4.581722,1 1,4.581722 1,9 C1,13.418278 4.581722,17 9,17 Z M10.5533462,12.1315042 L10.5533462,14.3230653 C10.5533462,14.5239584 10.3889794,14.6883256 10.1880863,14.6883256 L7.99652525,14.6883256 C7.79563216,14.6883256 7.63126489,14.5239584 7.63126489,14.3230653 L7.63126489,12.1315042 C7.63126489,11.9306111 7.79563216,11.7662444 7.99652525,11.7662444 L10.1880863,11.7662444 C10.3889794,11.7662444 10.5533462,11.9306111 10.5533462,12.1315042 Z M13.4389016,6.652602 C13.4389016,8.38758764 12.2609374,9.05418764 11.3934449,9.53815691 C10.8546858,9.84862855 10.5168203,10.4787022 10.5168203,10.743516 C10.5168203,10.9444091 10.3615845,11.181828 10.15156,11.181828 L7.95999889,11.181828 C7.7591058,11.181828 7.63126489,10.8713569 7.63126489,10.6704638 L7.63126489,10.2595462 C7.63126489,9.15463418 8.72704544,8.20495745 9.5306178,7.83969709 C10.2337436,7.52009455 10.5259518,7.21875491 10.5259518,6.63433855 C10.5259518,6.12297436 9.8593518,5.66639945 9.11970016,5.66639945 C8.70878253,5.66639945 8.33439071,5.79424036 8.13349762,5.93121273 C7.91434162,6.08644855 7.69518562,6.30560455 7.15642653,6.981336 C7.08337489,7.07265109 6.97379689,7.12743982 6.87335035,7.12743982 C6.79116671,7.12743982 6.71811453,7.10004545 6.64506235,7.05438818 L5.14749562,5.91294982 C4.99226035,5.79424036 4.95573398,5.59334727 5.05618053,5.42898 C6.04238307,3.79444091 7.4303718,3 9.29319889,3 C11.2473405,3 13.4389016,4.56148745 13.4389016,6.652602 Z'
            />
        )}
    </svg>
);

HelptipIcon.propTypes = {
    /**@param {boolean} isOpen - Determines the correct icon to render depending on if component is open or not*/
    isOpen: PropTypes.bool,
    id: PropTypes.string,
};

HelptipIcon.defaultProps = {
    id: '',
    isOpen: false,
};

export default HelptipIcon;

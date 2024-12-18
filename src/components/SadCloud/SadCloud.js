import React from 'react';
import PropTypes from 'prop-types';
import './SadCloud.css';

/**
 * This class creates a component that displays a 'sad cloud'
 * message and image to the user if the OLA service is unavailable.
 */
const SadCloud = ({ banner, image, message }) => {
    return (
        <div
            id='service-unavailable'
            aria-labelledby='service-unavailable__content-title'
            data-testid='service-unavailable'>
            <img id='sad-cloud__img' src={image} alt='' />
            <div
                id='service-unavailable__content'
                data-testid='service-unavailable__content'>
                <h2 id='service-unavailable__content-title'>{banner}</h2>
                <p className='service-unavailable__message'>{message}</p>
            </div>
        </div>
    );
};

SadCloud.propTypes = {
    // Contains the text for the banner.
    banner: PropTypes.string,
    // Provides reference to image used for sad cloud.
    image: PropTypes.string,
    // Provides context for the component’s occurrence.
    message: PropTypes.string,
};

SadCloud.defaultProps = {
    banner: 'Your Account is Unavailable at This Time',
    image: '',
    message:
        "We apologize for the inconvenience, but we're unable to retrieve your account information due to a service error. You can still make a payment using the buttons on this page.",
};

export default SadCloud;

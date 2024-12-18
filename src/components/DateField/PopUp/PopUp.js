import React from 'react';
import './PopUp.css';
import CloseIcon from '../../CloseIcon';
import PropTypes from 'prop-types';

/**
 * This is the PopUp reusable component. It is a container with a very high Z-index that will overlay a box over the current user's screen.
 * It uses props to pass in content, which it then displays within the main container div.
 * @param {*} props contains the content to be displayed within the popup
 * @returns jsx for a popup component
 */

const PopUp = (props) => {
    return(
        <div className="PopUp__main">
            <div className="PopUp__container">
                <span className="PopUp__closeIcon" onClick={props.handleClose}>
                    <CloseIcon></CloseIcon>
                </span>

                {props.content}
            </div>
        </div>
    )
}

PopUp.propTypes = {
    /**@prop {node} content - content to be rendered inside of popup */
    content: PropTypes.node,
}

export default PopUp;
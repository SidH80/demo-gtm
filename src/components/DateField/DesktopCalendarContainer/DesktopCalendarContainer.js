import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './DesktopCalendarContainer.css';

/**
 * This is the desktop calendar container component. It shows as a pop-out from an input div.
 * There is a fixed width to this component's current implementation due to it using a background from the imported css file.
 * @param {*} props you can pass this component props containing content to be displayed within
 * @returns jsx for the a "popout" styled component
 */

const DesktopCalendarContainer = (props) => {
    const [expanded, setExpanded] = useState('');
    const ref = useRef();

    /**
     * this is the handleRefSize function, which checks if the content is taller than a certain height
     * if this is the case, then we return an expanded css style, which extends the background of the main container div by an extra row for the calendar to use.
     */
    const handleRefSize = () => {
        if (ref.current && ref.current.clientHeight > 288) {
            setExpanded(' expanded');
        } else {
            setExpanded('');
        }
    }

    useEffect(() => {
        const resizeObserver = new ResizeObserver(handleRefSize);
        resizeObserver.observe(ref.current);
        handleRefSize();

        return (() => {
            resizeObserver.unobserve(ref.current);
            })
    }, [ref]);

    return (
        <>
            <div className={'DesktopCalendarContainer__main' + expanded}>
                <div ref={ref}>
                    {props.content}    
                </div>
            </div>
        </>
    )
}

DesktopCalendarContainer.propTypes = {
    /**@prop {node} content - content to be displayed within the container component */
    content: PropTypes.node,
}

export default DesktopCalendarContainer;
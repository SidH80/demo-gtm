// candidate for deprecation since it always renders the same static HTML; move CSS into creat-react-app custom template

import React from 'react';
import './FlexLayout.css';
/**
 *
 * @description This function is responsible for creating a flex based
 * layout where there must be one element in the below tree
 * with a style of flex: 1 1 auto. This will cause there to be
 * a sticky footer, matching the desired IRS layout.
 *
 * @param {Element Tree} props An element tree
 */
export default function FlexLayout(props) {
    return (
        <div className='flex-wrapper'>
            <div className='site'>{props.children}</div>
        </div>
    );
}

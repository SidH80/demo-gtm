import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SkipNav.css';

/**This component is used to allow a user tabbing through a page, the option to skip
 * navigation options and arrive at the main content of the page. */
export default class SkipNav extends Component {
    skipToHeading = e => {
        e.preventDefault();
        this.props.inputRef();
    };

    render() {
        return (
            <a
                className='skip-nav'
                href=''
                onClick={e => this.skipToHeading(e)}>
                {this.props.title}
            </a>
        );
    }
}

SkipNav.propTypes = {
    title: PropTypes.string,
    inputRef: PropTypes.func,
};

SkipNav.defaultProps = {
    title: '',
    inputRef: null,
};

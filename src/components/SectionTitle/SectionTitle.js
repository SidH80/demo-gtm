import React, { Component } from 'react';
import './SectionTitle.css';
import PropTypes from 'prop-types';

export default class SectionTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headlineContent = this.props.headlineContentGetter();
        const additionalContent = this.props.subHeaderSetter();

        let itemClasses = additionalContent
            ? 'container sectionTitle__subHeader--column'
            : 'container';

        return headlineContent ? (
            <div className='outerSectionTitleWrapper'>
                <div className='sectionTitleContainer'>
                    <h1
                        className='sectionTitle'
                        ref={this.props.inputRef}
                        tabIndex='-1'
                        id='title'>
                        <span className={itemClasses}>
                            <span className='sectionTitle__title-content'>
                                {headlineContent}
                            </span>
                        </span>
                    </h1>
                    {additionalContent && (
                        <p className='sectionTitle__subHeader-container'>
                            <span className='container sectionTitle__subHeader'>
                                Current Amount Owed:{' '}
                                <span className='sectionTitle__subHeader-content'>
                                    {additionalContent}
                                </span>
                            </span>
                        </p>
                    )}
                </div>
            </div>
        ) : (
            ''
        );
    }
}

SectionTitle.propTypes = {
    headlineContentGetter: PropTypes.func,
    subHeaderSetter: PropTypes.func,
    inputRef: PropTypes.object,
};

SectionTitle.defaultProps = {
    headlineContentGetter: () => {
        return 'Account Home';
    },
    subHeaderSetter: () => {
        return null;
    },
    inputRef: null,
};

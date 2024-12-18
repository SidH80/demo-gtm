import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../Breadcrumbs';

/**
 * This component renders a bar with header text where a description can be provided for what the
 * component is titling. The header text is left aligned, enlarged and boldened on the page.
 * When the child component Breadcrumbs is used, Titlebar can be hot linked to optimize user navigation.
 */

export default function TitleBar(props) {
    const crumbs = [];
    return (
        <div className='intro'>
            <div className='container content__container content__container--display'>
                <Breadcrumbs crumbs={crumbs} />
                <h1 className='content__container__item'>{props.headerText}</h1>
            </div>
        </div>
    );
}

TitleBar.propTypes = {
    // Provides description text (headerText: type String).
    headerText: PropTypes.string,
};

TitleBar.defaultProps = {
    headerText: '',
};

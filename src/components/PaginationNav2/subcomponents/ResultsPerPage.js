import React from 'react';
import PropTypes from 'prop-types';

import '../PaginationNav2.css';

/**
 *  @description This component is a subcomponent of PaginationNav2.
 * It's purpose is to dynamically create the 'previous' button on the left
 * side with a chevron icon pointing left
 */

const ResultsPerPage = ({
    resultsPerPageLabel,
    resultsPerPageAllLabel,
    isMobile,
    handleChangeResults,
}) => {
    const label = resultsPerPageLabel || 'Results per page';
    const labelForAll = resultsPerPageAllLabel || 'All';

    const containerClassName = isMobile
        ? 'results-per-page-container-mobile'
        : 'results-per-page-container';
    const labelContainerClassName = isMobile
        ? 'label-container'
        : 'label-container__results';
    const labelSubcontainerClassName = isMobile
        ? ''
        : 'label-subcontainer__results';

    const VALUE_25 = '25';
    const VALUE_50 = '50';
    const VALUE_75 = '75';
    const VALUE_100 = '100';
    const VALUE_ALL = labelForAll;

    return (
        <div className={containerClassName}>
            <div className={labelContainerClassName}>
                <div className={labelSubcontainerClassName}>
                    <label
                        className='label-text no-select'
                        htmlFor='results-per-page-dropdown'>
                        {label}
                    </label>
                </div>
            </div>

            <select
                className='results-per-page-dropdown'
                id='results-per-page-dropdown'
                onChange={handleChangeResults}>
                <option value={VALUE_25}>{VALUE_25}</option>
                <option value={VALUE_50}>{VALUE_50}</option>
                <option value={VALUE_75}>{VALUE_75}</option>
                <option value={VALUE_100}>{VALUE_100}</option>
                <option value={VALUE_ALL}>{labelForAll}</option>
            </select>
        </div>
    );
};

ResultsPerPage.propTypes = {
    isMobile: PropTypes.bool,
    resultsPerPageLabel: PropTypes.string,
    resultsPerPageAllLabel: PropTypes.string,
    handleChangeResults: PropTypes.func,
};

ResultsPerPage.defaultProps = {
    isMobile: null,
    resultsPerPageAllLabel: null,
    resultsPerPageLabel: null,
    handleChangeResults: () => null,
};

export default ResultsPerPage;

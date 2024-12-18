import React from 'react';
import SortIcon from '../SortIcon';
import PropTypes from 'prop-types';
import './SortableTableHeaderItem.css';

/**
 *  @description This component renders a column header component for columns that are sortable
 */

const SortableTableHeaderItem = props => {
    const sortValueAsc =
        props.isSortCurrentlyAscending && props.elt.id == props.currentSort;
    const sortValueDesc =
        !props.isSortCurrentlyAscending && props.elt.id == props.currentSort;

    let headerClass =
        sortValueAsc || sortValueDesc
            ? 'header-sortable--active'
            : 'header-sortable';

    headerClass = !props.isItemSortable ? 'header-not-sortable' : headerClass;

    let ariaLabelText = `${props.elt.label}`;

    if (props.isItemSortable) {
        if (props.currentSort === props.elt.id) {
            ariaLabelText = props.isSortCurrentlyAscending
                ? `${ariaLabelText} ${props.screenReaderStatus.ASC}`
                : `${ariaLabelText} ${props.screenReaderStatus.DESC}`;
        } else {
            ariaLabelText = `${ariaLabelText} ${props.screenReaderStatus.DEFAULT}`;
        }
    }

    const handleSortChange = e => {
        props.updateSort(e.target.id);
    };

    const handleKeyboardEvent = e => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleSortChange(e);
        }
    };

    return props.isItemSortable ? (
        <th
            key={props.headerKey}
            className={`${props.className} ${headerClass}`}
            scope='col'
            style={props.style}
            id={props.elt.id}
            onClick={handleSortChange}>
            <button
                type='button'
                id={props.elt.id}
                className={headerClass}
                aria-label={ariaLabelText}
                onClick={handleSortChange}
                onKeyDown={handleKeyboardEvent}>
                {props.elt.label}
                <SortIcon
                    isSortedAsc={sortValueAsc}
                    isSortedDesc={sortValueDesc}
                />
            </button>
        </th>
    ) : (
        <th
            key={props.headerKey}
            className={headerClass}
            scope='col'
            style={props.style}
            id={props.elt.id}>
            <div id={props.elt.id}>{props.elt.label}</div>
        </th>
    );
};

export default SortableTableHeaderItem;

SortableTableHeaderItem.propTypes = {
    // Boolean for whether the currently sorted item is ascending
    isSortCurrentlyAscending: PropTypes.bool,
    // String value informing of the currently sorted column
    currentSort: PropTypes.string,
    // Boolean for whether the current item is sortable
    isItemSortable: PropTypes.bool,
    // Function to handle the column sort functionality
    updateSort: PropTypes.func,
    screenReaderStatus: PropTypes.object,
};

SortableTableHeaderItem.defaultProps = {
    isSortCurrentlyAscending: false,
    elt: '',
    currentSort: '',
    isItemSortable: false,
    updateSort: null,
    headerKey: null,
    style: {},
    screenReaderStatus: {
        DEFAULT: 'Not Sorted',
        ASC: 'Ascending',
        DESC: 'Descending',
    },
};

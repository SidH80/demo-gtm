import React from 'react';
import PropTypes from 'prop-types';
import SortableTableHeaderItem from '../SortableTableHeaderItem';
import './TableRow.css';

/**
 * This component is responsible for rendering a row in a table.
 * Each item in the table will have an equal width and the text
 * will wrap within its 'cell'. If the header prop is sent as true,
 * then the text in that row will be bolded. An element can be sent,
 * so it will accept a number, string, or html element as a value.
 */
const TableRow = ({
    header,
    styleName,
    cols,
    colWidths,
    skinny,
    bottomBorder,
    noTopBorder,
    totalRow,
    sortable,
    updateSort,
    currentSort,
    isSortCurrentlyAscending,
    sortableColumnSrStatus,
}) => {
    const styles = styleName;
    let itemClasses = header
        ? 'table-row__item table-row__item--header-item'
        : 'table-row__item';
    itemClasses =
        cols.length === 1
            ? `${itemClasses} table-row__content-item`
            : itemClasses;
    itemClasses = skinny
        ? `${itemClasses} table-row__item--skinny`
        : itemClasses;
    itemClasses =
        header && sortable ? `${itemClasses} header-sortable` : itemClasses;

    const itemRow = cols.map((elt, index) => {
        let colWidth;
        let colSpan;
        if (cols.length === 1) {
            colWidth = '100%';
            colSpan = '4';
        } else {
            colWidth = colWidths[index];
        }

        if (sortable && header) {
            return (
                <SortableTableHeaderItem
                    headerKey={index}
                    className={`${itemClasses} ${styles}`}
                    style={{ width: colWidth }}
                    elt={elt}
                    updateSort={updateSort}
                    currentSort={currentSort}
                    isSortCurrentlyAscending={isSortCurrentlyAscending}
                    isItemSortable={elt.isItemSortable}
                    screenReaderStatus={sortableColumnSrStatus}
                />
            );
        } else if (header) {
            return (
                <th
                    key={index}
                    className={`${itemClasses} ${styles}`}
                    scope='col'
                    style={{ width: colWidth }}>
                    {elt}
                </th>
            );
        } else {
            return (
                <td
                    key={index}
                    className={`${itemClasses} ${styles}`}
                    style={{ width: colWidth }}
                    colSpan={colSpan}>
                    {elt}
                </td>
            );
        }
    });

    let rowClasses = totalRow ? 'table-row--total' : 'table-row--wrapper';

    rowClasses = bottomBorder ? `${rowClasses} bottomBorder` : rowClasses;
    rowClasses = noTopBorder ? `${rowClasses} noTopBorder` : rowClasses;
    return <tr className={rowClasses}>{itemRow}</tr>;
};

TableRow.propTypes = {
    // Provides a row of data (cols: type Array).
    cols: PropTypes.array,
    // Describes the individual column widths within the table (colWidth: type Array).
    colWidths: PropTypes.array,
    // Determines whether to apply header styling to the component (header: type boolean).
    header: PropTypes.bool,
    // Describes the style set for the component (styleName: type String)
    styleName: PropTypes.string,
    // Determines whether the rows should be skinny/smaller than typical
    skinny: PropTypes.bool,
    // Boolean value to say whether this instance of the row is to be styled as a total row and bolded
    totalRow: PropTypes.bool,
    // Boolean value for whether the border should be removed from this row
    noBottomBorder: PropTypes.bool,
    // Boolean value for whether the top border should be removed from this row
    noTopBorder: PropTypes.bool,
    // Boolean value for whether the header is sortable
    sortable: PropTypes.bool,
    sortableColumnSrStatus: PropTypes.object,
    //Boolean value for whether the bottom border should be removed from this row
    bottomBorder: PropTypes.bool,
    // Function to handle the column sort functionality
    updateSort: PropTypes.func,
    // String value informing of the currently sorted column
    currentSort: PropTypes.string,
    // Boolean for whether the currently sorted item is ascending
    isSortCurrentlyAscending: PropTypes.bool,
};

TableRow.defaultProps = {
    cols: [],
    header: false,
    colWidths: ['20%', '30%', '35%', '15%'],
    styleName: '',
    skinny: false,
    totalRow: false,
    noBottomBorder: false,
    noTopBorder: false,
    sortable: false,
    bottomBorder: false,
    updateSort: null,
    currentSort: '',
    isSortCurrentlyAscending: false,
};

export default TableRow;

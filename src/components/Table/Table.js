import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '../TableRow';
import './Table.css';
import '../../styles/global.css';

/**
 * This component renders a simple table with equally spaced elements.
 * The data passed in as a header is going to be rendered in bold text
 * while the rest will be rendered as given. Adding a title will place
 * one above the table and will indent the table slightly to the left.
 */
export default class Table extends Component {
    render() {
        const tableClasses = ['table'];
        if (this.props.className) {
            tableClasses.push(this.props.className);
        }
        const titleClasses =
            this.props.title !== null ? 'table--indent-left' : '';
        const captionClasses = this.props.showCaption ? '' : 'sr-only';
        const captionTabIndex = this.props.enableTabIndex ? -1 : null;

        return (
            <div>
                {this.props.title !== null && (
                    <h4 className='table__title' id={this.props.tableId}>
                        {this.props.title}
                    </h4>
                )}
                <table
                    className={`${tableClasses.join(' ')} ${titleClasses}`}
                    width='100%'>
                    <caption
                        className='table__caption'
                        ref={this.props.tableCaptionRef}
                        tabIndex={captionTabIndex}>
                        <span className={captionClasses}>
                            {this.props.caption}
                        </span>
                    </caption>
                    <thead className='table__header'>
                        <TableRow
                            cols={this.props.headerCols}
                            colWidths={this.props.colWidths}
                            header
                            styleName={this.props.styleName}
                            skinny={this.props.skinny}
                            sortable={this.props.sortable}
                            currentSort={this.props.currentSort}
                            updateSort={this.props.updateSort}
                            isSortCurrentlyAscending={
                                this.props.isSortCurrentlyAscending
                            }
                            sortableColumnSrStatus={
                                this.props.sortableColumnSrStatus
                            }
                        />
                    </thead>
                    <tbody>
                        {this.props.dataRows.map((row, index) => {
                            var noBorder = false;
                            var noTopBorder = row.noTopBorder === true;
                            var bottomBorder =
                                (this.props.dataRows.length - 1 === index &&
                                    row.length === 1) ||
                                this.props.rowBottomBorder;
                            return (
                                <TableRow
                                    key={index}
                                    cols={row}
                                    colWidths={this.props.colWidths}
                                    styleName={this.props.styleName}
                                    skinny={this.props.skinny}
                                    noBorder={noBorder}
                                    bottomBorder={bottomBorder}
                                    noTopBorder={noTopBorder}
                                    header={false}
                                />
                            );
                        })}
                        {this.props.totalRow !== null && (
                            <TableRow
                                cols={this.props.totalRow}
                                colWidths={this.props.colWidths}
                                styleName={this.props.styleName}
                                skinny={this.props.skinny}
                                totalRow
                            />
                        )}
                    </tbody>
                    {this.props.footer && (
                        <tfoot>
                            <tr>
                                <td colSpan={this.props.footer.colSpan}>
                                    {this.props.footer.content}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        );
    }
}

Table.propTypes = {
    // Indicates that affected TableRow element should have a bottom border due to Applied Prior Year payment status
    rowBottomBorder: PropTypes.bool,
    // Provides a name for the table (title: type String).
    title: PropTypes.string,
    // Describes what the table is for in a caption under the title (caption: type String).
    caption: PropTypes.string,
    // Determines if the caption should be visible or not (showCaption: type boolean).
    showCaption: PropTypes.bool,
    // Describes the columns of the table (headerCols: type Array).
    headerCols: PropTypes.array,
    // Describes data for the table’s rows (dataRows: type Array).
    dataRows: PropTypes.array,
    // Determines whether the rows should be skinny/smaller than typical
    skinny: PropTypes.bool,
    // A unique value that identifies the connection between a table and it's elements
    tableId: PropTypes.string,
    // A bolded bottom row for final results and what not
    totalRow: PropTypes.array,
    // Reference for the table caption for focusability
    tableCaptionRef: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    // Option to add tabIndex value for table caption
    enableTabIndex: PropTypes.bool,
    // Boolean value for whether the item is a header
    header: PropTypes.bool,
    // Boolean value for whether the header is sortable
    sortable: PropTypes.bool,
    // String value informing of the currently sorted column
    currentSort: PropTypes.string,
    // Function to handle the column sort functionality
    updateSort: PropTypes.func,
    // Boolean for whether the currently sorted item is ascending
    isSortCurrentlyAscending: PropTypes.bool,
    sortableColumnSrStatus: PropTypes.object,
};

Table.defaultProps = {
    rowBottomBorder: false,
    caption: '',
    colWidths: ['20%', '30%', '35%', '15%'],
    dataRows: [],
    headerCols: [],
    showCaption: false,
    styleName: '',
    title: null,
    skinny: false,
    tableId: '',
    totalRow: null,
    tableCaptionRef: null,
    enableTabIndex: false,
    header: false,
    sortable: false,
    currentSort: '',
    updateSort: null,
    isSortCurrentlyAscending: false,
};

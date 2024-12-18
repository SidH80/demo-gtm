import React from 'react';
import PropTypes from 'prop-types';
import './HorizontalTableRow.css';

const HorizontalTableRow = ({ cols, indentTable, rowIndex, boldHeader }) => {
    let ariaToggle = false;
    // Checks if a regular col or multiple; reomves bottom separator if single columns
    let gridCellClasses =
        cols.length === 1
            ? 'table-row-wrapper table-row-wrapper--borderless'
            : 'table-row-wrapper';

    let itemRowClasses;
    let colSize = cols.length;
    let itemClasses = 'table-row-item';
    itemClasses =
        cols.length === 1
            ? `${itemClasses} table-row-item--content`
            : itemClasses;
    let calcWidth = `${100 / cols.length}%`;
    return (
        <div role='gridcell' className={gridCellClasses}>
            {cols.map((elt, index) => {
                if (indentTable) {
                    if (
                        rowIndex === 0 &&
                        index === cols.length - 1 &&
                        colSize !== 1
                    ) {
                        itemRowClasses = `${itemClasses} taxYear-end-col`;
                        calcWidth = '175px';
                        ariaToggle = false;
                    } else if (rowIndex === 0 && index === 0 && colSize !== 1) {
                        itemRowClasses = `${itemClasses} header-item header-item--mobile`;
                        calcWidth = 'auto';
                        ariaToggle = true;
                    }
                    if (rowIndex !== 0 && index === 0) {
                        itemRowClasses = `${itemClasses} header-item table-row-item--indent`;
                        ariaToggle = true;
                    } else if (rowIndex !== 0 && index === cols.length - 1) {
                        itemRowClasses = `${itemClasses} end-col`;
                        ariaToggle = false;
                    }
                } else {
                    if (
                        index === cols.length - 1 &&
                        colSize !== 1 &&
                        !indentTable
                    ) {
                        itemRowClasses = `${itemClasses} end-col`;
                        ariaToggle = false;
                    } else if (index === 0 && boldHeader && colSize !== 1) {
                        itemRowClasses = `${itemClasses} header-item`;
                        ariaToggle = true;
                    } else if (itemRowClasses === null) {
                        itemRowClasses = itemClasses;
                        ariaToggle = false;
                    }
                }
                return (
                    <div
                        aria-hidden={ariaToggle}
                        key={index}
                        style={{ width: calcWidth }}
                        className={itemRowClasses}>
                        {elt}
                    </div>
                );
            })}
        </div>
    );
};

export default HorizontalTableRow;

HorizontalTableRow.propTypes = {
    cols: PropTypes.array,
    colWidths: PropTypes.array,
    boldHeader: PropTypes.bool,
    header: PropTypes.bool,
    styleName: PropTypes.string,
    indentTable: PropTypes.bool,
    rowIndex: PropTypes.number,
};

HorizontalTableRow.defaultProps = {
    cols: [],
    colWidths: ['20%', '30%', '35%', '15%'],
    boldHeader: false,
    styleName: '',
    indentTable: false,
    rowIndex: null,
};

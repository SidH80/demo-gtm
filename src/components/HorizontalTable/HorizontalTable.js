import React from 'react';
import PropTypes from 'prop-types';

import { transpose } from '../../helpers/matrixHelper/index.js';

import HorizontalTableRow from '../HorizontalTableRow';

import './HorizontalTable.css';

const HorizontalTable = ({ boldHeader, dataRows, headerCols, indentTable }) => {
    const unprocessed = [];

    if (headerCols !== [] && dataRows[0].length !== 1) {
        unprocessed.push(headerCols);
    }

    for (const row in dataRows) {
        unprocessed.push(dataRows[row]);
    }

    const processedRows = transpose(unprocessed);

    return (
        <div>
            {processedRows.map((row, index) => (
                <HorizontalTableRow
                    key={index}
                    cols={row}
                    boldHeader={boldHeader}
                    indentTable={indentTable}
                    rowIndex={index}
                />
            ))}
        </div>
    );
};

HorizontalTable.propTypes = {
    boldHeader: PropTypes.bool,
    headerCols: PropTypes.array,
    dataRows: PropTypes.array,
    indentTable: PropTypes.bool,
};

HorizontalTable.defaultProps = {
    boldHeader: false,
    headerCols: [],
    dataRows: [],
    indentTable: false,
};

export default HorizontalTable;

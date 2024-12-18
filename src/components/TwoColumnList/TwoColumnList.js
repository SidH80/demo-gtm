import React from 'react';
import PropTypes from 'prop-types';
import './TwoColumnList.css';

/**
 * This component renders a table structure with two columns. The component
 * lists out the contents the data object in key-value pairs (ex. Row: { 1: ,
 * 'a'}).
 */
const TwoColumnList = ({
    data,
    noPadding,
    colWidths,
    margin,
    classes,
    boldRight,
    borderless,
    noBold,
}) => {
    const boldSetting = boldRight
        ? 'two-column-list__row--right-bold'
        : noBold
        ? 'two-column-list__row--no-bold'
        : 'two-column-list__row--default-bold';
    const borderSetting = borderless
        ? 'two-column-list__row--borderless'
        : 'two-column-list__row--borders';
    const tableBorderSetting = borderless
        ? 'two-column-list--borderless'
        : 'two-column-list--borders';
    const noPaddingClass = noPadding ? 'two-column-list__row--no-padding' : '';

    let columnClasses = 'two-column-list';
    columnClasses = classes ? `${columnClasses} ${classes}` : columnClasses;

    return (
        /* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */
        <ul
            role='list'
            className={`${columnClasses} two-column-list ${tableBorderSetting}`}>
            {Object.keys(data).map((key, index) => {
                let marginStyle;

                // Applying a style margin to list items between the first and last list item under the unordered list
                // This makes sure that any content surrounding the TwoColumnList do not get pushed by
                // the first and last list item's margin
                if (index !== Object.keys(data).length - 1 && index !== 0) {
                    marginStyle = {
                        margin: `${margin[0]} ${margin[1]}`,
                    };
                }

                // **Business Logic for array type data passed into TwoColumnList
                if (Array.isArray(data)) {
                    return (
                        <li
                            className={`two-column-list__row ${borderSetting} ${boldSetting} ${noPaddingClass}`}
                            style={marginStyle}
                            key={key}>
                            <span
                                style={{ width: colWidths[0] }}
                                className='two-column-row__header--display'>
                                {data[key][0]}
                            </span>
                            <span
                                style={{ width: colWidths[1] }}
                                className='two-column-row__right-item'>
                                {data[key][1]}
                            </span>
                        </li>
                    );
                }

                // **Business Logic for object type data passed into TwoColumnList
                else {
                    return (
                        <li
                            className={`two-column-list__row ${borderSetting} ${boldSetting} ${noPaddingClass}`}
                            style={marginStyle}
                            key={key}>
                            <span
                                style={{ width: colWidths[0] }}
                                className='two-column-row__header--display'>
                                {key}
                            </span>
                            <span
                                style={{ width: colWidths[1] }}
                                className='two-column-row__right-item'>
                                {data[key]}
                            </span>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

TwoColumnList.propTypes = {
    // Provides the key-value pairs to populate each row of the two-column list
    // (data: type Object).
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    classes: PropTypes.string,
    boldSetting: PropTypes.bool,
    borderSetting: PropTypes.bool,
    noPadding: PropTypes.bool,
};

TwoColumnList.defaultProps = {
    data: {},
    boldSetting: false,
    borderSetting: false,
    noPadding: false,
    colWidths: ['45%', '45%'],
    margin: ['0', '0'],
    classes: null,
};

export default TwoColumnList;

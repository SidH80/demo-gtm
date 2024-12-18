import React from 'react';
import PropTypes from 'prop-types';
import './AlertBox.css';
import InfoIcon from '../InfoIcon';
import WarningIcon from '../WarningIcon';
import SuccessIcon from '../SuccessIcon';
import ErrorIcon from '../ErrorIcon';

/**
 * @description - This component is responsible for creating a box
 * that the alert/info message lives in. It is a component that will
 * display an alert and/or info message to the user.
 */
const AlertBox = props => {
    const {
        id,
        isHeader,
        headerLevel,
        tabIndex,
        titleMessage,
        title,
        titleRef,
        isError,
        isWarning,
        isSuccess,
        contentSpacing,
        classes,
        srTitle,
        content,
    } = props;
    const HeaderTag = isHeader ? `h${headerLevel}` : 'p';
    let titleMessageSubtext = titleMessage ? 'alert-box--message-title' : '';

    const alertIcons = {
        error: <ErrorIcon />,
        warning: <WarningIcon />,
        info: <InfoIcon />,
        success: <SuccessIcon />,
    };

    const buildAlertClasses = () => {
        let alertClass = 'alert-box alert-box--info-color';
        if (isError) alertClass = 'alert-box alert-box--error-color';
        if (isWarning) alertClass = 'alert-box alert-box--warning-color';
        if (isSuccess) alertClass = 'alert-box alert-box--success-color';
        alertClass = contentSpacing
            ? `${alertClass} alert-box--content ${classes}`
            : `${alertClass} ${classes}`;
        return alertClass;
    };

    const selectIcon = () => {
        let icon = alertIcons.info;
        if (isError) icon = alertIcons.error;
        if (isWarning) icon = alertIcons.warning;
        if (isSuccess) icon = alertIcons.success;
        return icon;
    };

    let alertText = contentSpacing
        ? 'alert-bow__text alert-box__text--table-content'
        : 'alert-box__text';

    return (
        <div className={buildAlertClasses()}>
            <div className='alert-box__icon'>{selectIcon()}</div>
            <div className={alertText}>
                {title && (
                    <HeaderTag
                        id={id}
                        tabIndex={tabIndex}
                        className={`alert-box__title ${titleMessageSubtext}`}
                        ref={titleRef}>
                        {title}
                        {srTitle && <span className='sr-only'>{srTitle}</span>}
                    </HeaderTag>
                )}
                <div className={'alert-box__content'}>{content}</div>
            </div>
        </div>
    );
};

export default React.forwardRef((props, ref) => (
    <AlertBox {...props} titleRef={ref} />
));

AlertBox.propTypes = {
    /**@prop {string} srTitle - Determines if AlertBox title should include screen reader only title*/
    srTitle: PropTypes.string,
    /**@prop {boolean} contentSpacing - Determines if Alertbox should have top and bottom margins removed; special case usage for inside of tables.*/
    contentSpacing: PropTypes.bool,
    /**@prop {boolean} titleMessage - Determines if AlertBox title text should have subtext-style styling*/
    titleMessage: PropTypes.bool,
    /**@prop {boolean} isError - Determines if the AlertBox should be generated with an Error styling and WarningIcon*/
    isError: PropTypes.bool,
    /**@prop {boolean} isWarning - Determines if the AlertBox should be generated with a WarningIcon or InfoIcon*/
    isWarning: PropTypes.bool,
    /**@prop {boolean} isHeader - Determines AlertBox title is Header or Paragraph (508)*/
    isHeader: PropTypes.bool,
    /**@prop {string} title - Provides the AlertBox title*/
    title: PropTypes.string,
    /**@prop {function} content - Provides the AlertBox message*/
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**@prop {number} headerLevel - Controls the level of the header*/
    headerLevel: PropTypes.number,
    /**@prop {number} classes - Provides ability to add a class to alert box container*/
    classes: PropTypes.string,
    /**@prop {number} titleRef*/
    titleRef: PropTypes.func,
    /**@prop {string} altIcon - Provides the ability to change the status icon and */
    altIcon: PropTypes.string,
    /**@prop {string} id - Boolean to make header an ARIA header or regular header */
    id: PropTypes.string,
    /**@prop {string} tabIndex - Sets the Tab Index Order if needed */
    tabIndex: PropTypes.string,
};

AlertBox.defaultProps = {
    contentSpacing: false,
    isError: false,
    isWarning: false,
    isHeader: true,
    titleMessage: false,
    title: '',
    srTitle: null,
    content: '',
    headerLevel: 3,
    classes: '',
    altIcon: '',
    id: '',
    tabIndex: '-1',
};

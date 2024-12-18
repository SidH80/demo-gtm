import React from 'react';
import ChevronRightIcon from '../ChevronRightIcon/ChevronRightIcon';
import ChevronLeftIcon from '../ChevronLeftIcon/ChevronLeftIcon';
import ChevronUpIcon from '../ChevronUpIcon/ChevronUpIcon';
import ChevronDownIcon from '../ChevronDownIcon/ChevronDownIcon';
import './ChevronButton.css';

const ChevronButton = ({
    inputRef,
    onClick,
    direction,
    height,
    width,
    ariaLabel,
    classNames,
    disabled,
    ...rest
}) => {
    const classes = classNames ? `${classNames} chevron-btn` : 'chevron-btn';

    let icon;
    if (direction === 'right') {
        icon = (
            <ChevronRightIcon height={height} width={width} isMute={disabled} />
        );
    } else if (direction === 'left') {
        icon = (
            <ChevronLeftIcon height={height} width={width} isMute={disabled} />
        );
    } else if (direction === 'up') {
        icon = <ChevronUpIcon />;
    } else if (direction === 'down') {
        icon = <ChevronDownIcon />;
    }

    const handleClick = e => {
        e.preventDefault();

        if (disabled) {
            return;
        }

        onClick(e);
    };

    const handleKeyDown = e => {
        const key = e.which || e.keyCode;
        if (disabled && (key === 32 || key === 13)) {
            e.preventDefault();
            return;
        } else if (key === 32 || key === 13) {
            e.preventDefault();
            e.target.click();
        }
    };

    return (
        <a
            ref={inputRef}
            role='button'
            tabIndex={disabled ? '-1' : '0'}
            aria-label={ariaLabel}
            className={classes}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            {...rest}>
            {icon}
        </a>
    );
};

export default React.forwardRef((props, ref) => {
    return <ChevronButton inputRef={ref} {...props} />;
});

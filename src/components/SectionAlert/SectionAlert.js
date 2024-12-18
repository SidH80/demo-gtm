import propTypes from 'prop-types';
import React from 'react';

import ErrorIcon from '../ErrorIcon';
import InfoIcon from '../InfoIcon';
import SuccessIcon from '../SuccessIcon';
import WarningIcon from '../WarningIcon';
import { CONTENT_CLASS_NAME, ICON_CLASS_NAME } from './ClassNames';

import './SectionAlert.css';
import { SectionAlertBox } from './subcomponents';

/*********************************************************************
 * Alerts can be used to convey important information to users
 * throughout the application. These component will render your title
 * with the proper SVG icon.
 *
 * Refs to this component will be passed to the root div.
 *
 * Follow the best practices:
 * https://online-design-guide-master-pl.irslabs.org/ui-elements/alert/section-alerts
 *
 *********************************************************************/

const COLORS = {
    error: 'red',
    info: 'blue',
    success: 'green',
    warning: 'yellow',
}
const ICONS = {
    error: <ErrorIcon />,
    info: <InfoIcon />,
    success: <SuccessIcon />,
    warning: <WarningIcon />,
};

const SectionAlert = React.forwardRef((props, ref) => {
    const {
        children,
        variant,
        ...rest
    } = props;

    const color = COLORS[variant];
    const icon = ICONS[variant];

    return (
        <SectionAlertBox {...rest} color={color} ref={ref}>
            <div aria-hidden={true} className={ICON_CLASS_NAME}>
                {icon}
            </div>
            <div className={CONTENT_CLASS_NAME}>
                {children}
            </div>
        </SectionAlertBox>
    );
});

SectionAlert.propTypes = {
    /**@prop children - the content of the section alert, should be a <SectionAlertTitle> and a <p> */
    children: propTypes.node.isRequired,
    /**@prop variant - background color of the alert */
    variant: propTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    /**@prop ['string'] - all other props are passed to the root div */
    ['string']: propTypes.any,
};

export default SectionAlert;
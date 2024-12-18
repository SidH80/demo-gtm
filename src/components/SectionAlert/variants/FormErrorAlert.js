import propTypes from 'prop-types';
import React from 'react';

import '../SectionAlert.css';
import './FormErrorAlert.css'
import { CONTENT_CLASS_NAME, ICON_CLASS_NAME } from '../ClassNames';
import ErrorIcon from '../../ErrorIcon';
import { SectionAlertBox } from '../subcomponents';

const FormErrorAlert = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;

  return (
    <SectionAlertBox {...rest} color='red' ref={ref}>
      <div aria-hidden={true} className={ICON_CLASS_NAME}>
        <ErrorIcon />
      </div>
      <div className={CONTENT_CLASS_NAME}>
        {children}
      </div>
    </SectionAlertBox>
  );
});

FormErrorAlert.propTypes = {
  /**@prop children - the content of the section alert, should be a <SectionAlertTitle> and an <ol> */
  children: propTypes.node.isRequired,
  /**@prop ['string'] - all other props are passed to the root div */
  ['string']: propTypes.any,
};

export default FormErrorAlert;
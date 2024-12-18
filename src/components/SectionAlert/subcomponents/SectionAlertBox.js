import propTypes from 'prop-types';
import React from 'react';
import { BASE_CLASS_NAME } from '../ClassNames';

const SectionAlertBox = React.forwardRef((props, ref) => {
  const { children, color, ...rest } = props;

  let className = BASE_CLASS_NAME + ' ' + BASE_CLASS_NAME + '--' + color;
  if (props.className && typeof props.className === 'string') {
    className += ' ' + props.className;
  }

  return (
    <div {...rest} className={className} ref={ref}>
      {children}
    </div>
  )
});

SectionAlertBox.propTypes = {
  children: propTypes.node.isRequired,
  color: propTypes.oneOf(['blue', 'red', 'yellow', 'green']).isRequired,
  ['string']: propTypes.any,
}

export default SectionAlertBox;
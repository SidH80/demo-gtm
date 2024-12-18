import propTypes from 'prop-types';
import React from 'react';
import { getClassNames } from '../../../helpers';
import { TITLE_CLASS_NAME, TITLE_CLASS_NAME_WEIGHTED, TITLE_CLASS_NAME_UNWEIGHTED } from '../ClassNames';

const SectionAlertTitle = React.forwardRef((props, ref) => {
  const { children, element, className, unWeighted, ...rest } = props;
  const Component = element;

  const FONT_WEIGHT = unWeighted ? TITLE_CLASS_NAME_UNWEIGHTED : TITLE_CLASS_NAME_WEIGHTED
  const titleClassNames = getClassNames(TITLE_CLASS_NAME, FONT_WEIGHT, className)

  return children != null && (
    <Component
      {...rest}
      className={titleClassNames}
      ref={ref}
      tabIndex='-1'
    >
      {children}
    </Component>
  );
});

SectionAlertTitle.propTypes = {
  /**@prop element - Element to display the title (default is h3) */
  element: propTypes.string,
  /**@prop text - Title displayed beside the icon */
  children: propTypes.node,
  /**@prop text - Title displayed with normal font-weight, line-height,
   * font-size and no margin-top */
  unWeighted: propTypes.bool,
}

SectionAlertTitle.defaultProps = {
  element: 'h3',
  children: undefined,
  unWeighted: undefined,
}

export default SectionAlertTitle;

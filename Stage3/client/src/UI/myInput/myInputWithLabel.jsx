import React from 'react';
import PropTypes from 'prop-types';
import MyInput from './myInput';

import inputStyles from './myInput.module.css';

const MyInputWithLabel = ({
  labelClassName,
  labelText,
  spanClassName,
  className,
  ...restProps
}) => (
  <label
    data-testid='my-label-input'
    className={`${inputStyles.label} ${labelClassName || ''}`}
  >
    <MyInput className={className} {...restProps} />
    <span className={spanClassName}>{labelText}</span>
  </label>
);

MyInputWithLabel.propTypes = {
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  spanClassName: PropTypes.string,
  className: PropTypes.string,
};

export default MyInputWithLabel;

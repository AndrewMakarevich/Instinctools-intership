import React from 'react';
import PropTypes from 'prop-types';
import MyInput from './myInput';
import { LabelText, MyStylesInputLabel } from './styled';

const MyInputWithLabel = ({
  labelClassName,
  labelText,
  spanClassName,
  className,
  ...restProps
}) => (
  <MyStylesInputLabel
    data-testid='my-label-input'
    className={`${labelClassName || ''}`}
  >
    <MyInput className={className} {...restProps} />
    <LabelText className={spanClassName}>{labelText}</LabelText>
  </MyStylesInputLabel>
);

MyInputWithLabel.propTypes = {
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  spanClassName: PropTypes.string,
  className: PropTypes.string,
};

export default MyInputWithLabel;

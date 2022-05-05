import React from 'react';
import PropTypes from 'prop-types';

import inputStyles from './myInput.module.css';

const MyInput = ({ className, children, placeholder, ...restProps }) => (
  <input
    className={`${inputStyles['my-input']} ${className || ''}`}
    placeholder={placeholder || ' '}
    {...restProps}
  />
);

MyInput.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  placeholder: PropTypes.string,
};

export default MyInput;

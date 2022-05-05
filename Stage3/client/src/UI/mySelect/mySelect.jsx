import React from 'react';
import PropTypes from 'prop-types';
import selectStyles from './mySelect.module.css';

const MySelect = ({ className, children, ...restProps }) => (
  <select
    className={`${selectStyles['my-select']} ${className || ''}`}
    {...restProps}
  >
    {children}
  </select>
);

MySelect.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default MySelect;

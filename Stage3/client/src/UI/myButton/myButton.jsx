import React from 'react';
import PropTypes from 'prop-types';

import buttonStyles from './myButton.module.css';

const MyButton = ({ className, children, onClick, ...restProps }) => (
  <button
    type='button'
    className={`${buttonStyles['my-button']} ${className || ''}`}
    onClick={(e) => {
      if (onClick) {
        onClick(e);
      }
    }}
    {...restProps}
  >
    {children}
  </button>
);

MyButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
};

export default MyButton;

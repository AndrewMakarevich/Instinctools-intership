import React from 'react';
import PropTypes from 'prop-types';
import buttonStyles from './closeButton.module.css';

const CloseButton = React.forwardRef(({ className, ...restProps }, ref) => (
  <button
    type='button'
    ref={ref}
    className={`${buttonStyles['close-button']} ${className || ''}`}
    {...restProps}
  >
    ✕
  </button>
));

CloseButton.propTypes = {
  className: PropTypes.string,
};

export default CloseButton;

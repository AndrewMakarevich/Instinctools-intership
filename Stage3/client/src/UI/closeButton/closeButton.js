import React from 'react';
import buttonStyles from './closeButton.module.css';

const CloseButton = React.forwardRef(({ className, ...restProps }, ref) => {
  return (
    <button
      ref={ref}
      className={`${buttonStyles['close-button']} ${className || ''}`}
      {...restProps}
    >
      ✕
    </button>
  );
});

export default CloseButton;

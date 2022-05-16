import React from 'react';
import PropTypes from 'prop-types';
import { StyledCloseButton } from './styled';

const CloseButton = React.forwardRef(({ className, ...restProps }, ref) => (
  <StyledCloseButton
    type='button'
    ref={ref}
    className={className}
    {...restProps}
  >
    ✕
  </StyledCloseButton>
));

CloseButton.propTypes = {
  className: PropTypes.string,
};

export default CloseButton;

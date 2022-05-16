import React from 'react';
import PropTypes from 'prop-types';
import { MyStyledButton } from './styled';

const MyButton = ({ children, ...restProps }) => (
  <MyStyledButton {...restProps}>{children}</MyStyledButton>
);

MyButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
};

export default MyButton;

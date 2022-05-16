import React from 'react';
import PropTypes from 'prop-types';
import { MyStyledLink } from './styled';

const MyLink = ({ className: propClass, children, ...restProps }) => (
  <MyStyledLink className={propClass} {...restProps}>
    {children}
  </MyStyledLink>
);

MyLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

MyLink.defaultProps = {
  className: '',
  children: '',
};
export default MyLink;

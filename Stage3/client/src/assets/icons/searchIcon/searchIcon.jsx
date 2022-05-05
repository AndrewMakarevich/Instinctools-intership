import React from 'react';
import PropTypes from 'prop-types';
import inputStyles from './searchIcon.module.css';

const SearchIcon = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`${inputStyles.icon} ${className}`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    />
  </svg>
);

SearchIcon.propTypes = {
  className: PropTypes.string,
};

SearchIcon.defaultProps = {
  className: '',
};

export default SearchIcon;

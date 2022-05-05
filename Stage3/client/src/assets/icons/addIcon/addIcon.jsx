import React from 'react';
import PropTypes from 'prop-types';
import iconStyles from './addIcon.module.css';

const AddIcon = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`${iconStyles.icon} ${className || ''}`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
  </svg>
);

AddIcon.propTypes = {
  className: PropTypes.string,
};

AddIcon.defaultProps = {
  className: null,
};

export default AddIcon;

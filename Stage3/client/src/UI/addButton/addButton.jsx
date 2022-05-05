import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '../../assets/icons/addIcon/addIcon';
import buttonStyles from './addButton.module.css';

const AddButton = ({ className, ...restProps }) => (
  <button
    type='button'
    className={`${buttonStyles['add-button']} ${className || ''}`}
    {...restProps}
  >
    <AddIcon />
  </button>
);

AddButton.propTypes = {
  className: PropTypes.string,
};

AddButton.defaultProps = {
  className: null,
};

export default AddButton;

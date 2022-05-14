import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../../UI/myButton/myButton';
import MyInputWithLabel from '../../../UI/myInput/myInputWithLabel';

import formStyles from './editForm.module.css';

const EditForm = ({
  essenceName,
  initialParamValues,
  newParamValues,
  setNewParamValues,
  onSubmit,
  isLoading,
}) => {
  const submitChanges = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const clearChanges = () => {
    const newParamValuesObj = newParamValues;

    Object.keys(newParamValuesObj).forEach((newParam) => {
      newParamValuesObj[newParam] = initialParamValues[newParam];
    });

    setNewParamValues({ ...newParamValuesObj });
  };

  return (
    <form data-testid='edit-form' className={formStyles.form}>
      <div className={formStyles['form-inputs__wrapper']}>
        {Object.keys(newParamValues).map((paramKey) => (
          <MyInputWithLabel
            key={paramKey}
            labelText={`${essenceName}'s ${paramKey}`}
            value={newParamValues[paramKey]}
            onChange={(e) =>
              setNewParamValues({
                ...newParamValues,
                [paramKey]: e.target.value,
              })
            }
          />
        ))}
      </div>
      <div className={formStyles['form-buttons__wrapper']}>
        <MyButton
          disabled={isLoading}
          data-testid='clear-changes-btn'
          type='button'
          onClick={clearChanges}
        >
          Clear changes
        </MyButton>
        <MyButton
          data-testid='submit-changes-btn'
          disabled={isLoading}
          type='submit'
          onClick={submitChanges}
        >
          Submit changes
        </MyButton>
      </div>
    </form>
  );
};

EditForm.propTypes = {
  essenceName: PropTypes.string,
  initialParamValues: PropTypes.object,
  newParamValues: PropTypes.object,
  setNewParamValues: PropTypes.func,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default EditForm;

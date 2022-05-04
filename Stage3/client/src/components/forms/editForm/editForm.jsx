import MyButton from '../../../UI/myButton/myButton';
import MyInputWithLabel from '../../../UI/myInput/myInputWithLabel';
import PropTypes from 'prop-types';

import formStyles from './editForm.module.css';

const EditForm = ({
  essenceName,
  initialParamValues,
  newParamValues,
  setNewParamValues,
  children: submitButton,
}) => {
  const clearChanges = () => {
    const newParamValuesObj = newParamValues;

    for (let key in newParamValuesObj) {
      newParamValuesObj[key] = initialParamValues[key];
    }

    setNewParamValues({ ...newParamValuesObj });
  };

  return (
    <form data-testid='edit-form' className={formStyles['form']}>
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
        <MyButton type='button' onClick={clearChanges}>
          Clear changes
        </MyButton>
        {submitButton}
      </div>
    </form>
  );
};

EditForm.propTypes = {
  essenceName: PropTypes.string,
  initialParamValues: PropTypes.object,
  newParamValues: PropTypes.object,
  setNewParamValues: PropTypes.func,
  children: PropTypes.element,
};

export default EditForm;

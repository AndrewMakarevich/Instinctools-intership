import { useEffect, useState } from 'react';
import formStyles from './editUserForm.module.css';
import MyInputWithLabel from '../../../../UI/myInput/myInputWithLabel';
import SubmitUserChangesBtn from '../../btns/submitUserChangesBtn/submitUserChangesBtn';
import MyButton from '../../../../UI/myButton/myButton';

const EditUserForm = ({ userObj, actualizeUserInfo }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const setInitialUserInfoParamValues = () => {
    setNewUserInfo({
      username: userObj.username,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
    });
  };

  useEffect(() => {
    if (userObj) {
      setInitialUserInfoParamValues();
    }
  }, [userObj]);

  return (
    <form data-testid='edit-user-form' className={formStyles['form']}>
      <div className={formStyles['form-inputs__wrapper']}>
        {Object.keys(newUserInfo).map((userParam) => (
          <MyInputWithLabel
            key={userParam}
            labelText={`User's ${userParam}`}
            value={newUserInfo[userParam]}
            onChange={(e) => {
              setNewUserInfo({ ...newUserInfo, [userParam]: e.target.value });
            }}
          />
        ))}
      </div>
      <div className={formStyles['form-buttons__wrapper']}>
        <MyButton type='button' onClick={setInitialUserInfoParamValues}>
          Clear changes
        </MyButton>
        <SubmitUserChangesBtn
          userId={userObj._id}
          initialParamsObj={userObj}
          paramsToEditObj={newUserInfo}
          actualizeUserInfo={actualizeUserInfo}
        />
      </div>
    </form>
  );
};

export default EditUserForm;

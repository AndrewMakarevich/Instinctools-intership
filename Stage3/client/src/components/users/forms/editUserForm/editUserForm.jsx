import { useEffect, useState } from 'react';
import formStyles from './editUserForm.module.css';
import MyInputWithLabel from '../../../../UI/myInput/myInputWithLabel';
import useDelayState from '../../../../hooks/useDelayState';

const EditUserForm = ({ userObj }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
  });

  useEffect(() => {
    if (userObj) {
      setNewUserInfo({
        username: userObj.username,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
      });
    }
  }, [userObj]);

  return (
    <form className={formStyles['form']}>
      <div className={formStyles['form-inputs__wrapper']}>
        <MyInputWithLabel
          labelText={"User's username"}
          value={newUserInfo.username}
          onChange={(e) => {
            setNewUserInfo({ ...newUserInfo, username: e.target.value });
          }}
        />
        <MyInputWithLabel
          labelText={"User's first name"}
          value={newUserInfo.firstName}
        />
        <MyInputWithLabel
          labelText={"User's last name"}
          value={newUserInfo.lastName}
        />
        <MyInputWithLabel
          labelText={"User's email"}
          value={newUserInfo.email}
        />
      </div>
      <button>Submit changes</button>
    </form>
  );
};

export default EditUserForm;

import { useEffect, useState } from 'react';
import formStyles from './editUserForm.module.css';
import MyInputWithLabel from '../../../../UI/myInput/myInputWithLabel';
import useDelayState from '../../../../hooks/useDelayState';

const EditUserForm = ({ userObj }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
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
          onChange={(e) => {
            setNewUserInfo({ ...newUserInfo, firstName: e.target.value });
          }}
        />
        <MyInputWithLabel
          labelText={"User's last name"}
          value={newUserInfo.lastName}
          onChange={(e) => {
            setNewUserInfo({ ...newUserInfo, lastName: e.target.value });
          }}
        />
        <MyInputWithLabel
          labelText={"User's email"}
          value={newUserInfo.email}
          onChange={(e) => {
            setNewUserInfo({ ...newUserInfo, email: e.target.value });
          }}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setNewUserInfo({
            username: userObj.username,
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            email: userObj.email,
          });
        }}
      >
        Clear changes
      </button>
      <button>Submit changes</button>
    </form>
  );
};

export default EditUserForm;

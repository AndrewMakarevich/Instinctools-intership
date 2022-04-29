import { useEffect, useState } from 'react';
import SubmitUserChangesBtn from '../../btns/submitUserChangesBtn/submitUserChangesBtn';
import EditForm from '../../../forms/editForm/editForm';

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
    <EditForm
      essenceName='User'
      initialParamValues={userObj}
      newParamValues={newUserInfo}
      setNewParamValues={setNewUserInfo}
    >
      <SubmitUserChangesBtn
        userId={userObj._id}
        initialParamsObj={userObj}
        paramsToEditObj={newUserInfo}
        actualizeUserInfo={actualizeUserInfo}
      />
    </EditForm>
  );
};

export default EditUserForm;

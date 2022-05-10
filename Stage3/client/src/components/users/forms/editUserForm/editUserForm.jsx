import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import EditForm from '../../../forms/editForm/editForm';
import parseDataToEdit from '../../../../utils/parseDataToSend/parseDataToEdit';
import UserValidator from '../../../../utils/validator/userValidator';
import UserService from '../../../../service/userService';
import { userPaths } from '../../../router/routes';

const EditUserForm = ({ userObj, actualizeUserInfo }) => {
  const navigate = useNavigate();
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

  const submitUserChanges = async () => {
    try {
      const paramsObject = parseDataToEdit(userObj, newUserInfo);

      if (!Object.keys(paramsObject).length) {
        alert('Nothing to change');
        return;
      }

      UserValidator.validateUsername(paramsObject.username, true);
      UserValidator.validateFirstName(paramsObject.firstName, true);
      UserValidator.validateLastName(paramsObject.lastName, true);
      UserValidator.validateEmail(paramsObject.email, true);

      await UserService.editUser(userObj._id, paramsObject);
      // if user changed username, reload the page
      if (paramsObject.username) {
        navigate(`${userPaths.mainPath.path}/${paramsObject.username}`);
      } else {
        await actualizeUserInfo();
      }
    } catch (e) {
      alert(e.isAxiosError ? e.response.data.message : e.message);
    }
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
      onSubmit={submitUserChanges}
    />
  );
};

EditUserForm.propTypes = {
  userObj: PropTypes.object,
  actualizeUserInfo: PropTypes.func,
};

export default EditUserForm;

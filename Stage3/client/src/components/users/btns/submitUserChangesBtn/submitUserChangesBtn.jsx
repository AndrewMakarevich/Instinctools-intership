import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetching from '../../../../hooks/useFetching';
import UserService from '../../../../service/userService';
import MyButton from '../../../../UI/myButton/myButton';
import parseDataToEdit from '../../../../utils/parseDataToSend/parseDataToEdit';
import UserValidator from '../../../../utils/validator/userValidator';
import { userPaths } from '../../../router/routes';

const SubmitUserChangesBtn = ({
  userId,
  initialParamsObj,
  paramsToEditObj,
  actualizeUserInfo,
}) => {
  const navigate = useNavigate();

  const { executeCallback: editUser, isLoading: userInfoIsLoading } =
    useFetching(
      async (userId, paramsObject) =>
        await UserService.editUser(userId, paramsObject)
    );

  const submitUserChanges = async (e) => {
    try {
      e.preventDefault();
      const paramsObject = parseDataToEdit(initialParamsObj, paramsToEditObj);

      if (!Object.keys(paramsObject).length) {
        alert('Nothing to change');
        return;
      }

      UserValidator.validateUsername(paramsObject.username, true);
      UserValidator.validateFirstName(paramsObject.firstName, true);
      UserValidator.validateLastName(paramsObject.lastName, true);
      UserValidator.validateEmail(paramsObject.email, true);

      await editUser(undefined, userId, paramsObject);
      //if user changed username, reload the page
      if (paramsObject.username) {
        navigate(userPaths.mainPath + '/' + paramsObject.username);
      } else {
        await actualizeUserInfo();
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <MyButton
      type='submit'
      disabled={userInfoIsLoading}
      onClick={submitUserChanges}
    >
      Submit changes
    </MyButton>
  );
};

export default SubmitUserChangesBtn;

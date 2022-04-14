import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../../service/userService';
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

  return (
    <button
      onClick={async (e) => {
        try {
          e.preventDefault();
          const paramsObject = parseDataToEdit(
            initialParamsObj,
            paramsToEditObj
          );

          if (!Object.keys(paramsObject).length) {
            alert('Nothing to change');
          }

          UserValidator.validateUsername(paramsObject.username, true);
          UserValidator.validateFirstName(paramsObject.firstName, true);
          UserValidator.validateLastName(paramsObject.lastName, true);
          UserValidator.validateEmail(paramsObject.email, true);

          await UserService.editUser(userId, paramsObject);
          //if user changed username, reload the page
          if (paramsObject.username) {
            navigate(userPaths.mainPath + '/' + paramsObject.username);
          } else {
            await actualizeUserInfo();
          }
        } catch (e) {
          alert(e);
        }
      }}
    >
      Submit changes
    </button>
  );
};

export default SubmitUserChangesBtn;

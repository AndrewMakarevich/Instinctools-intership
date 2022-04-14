import { useNavigate } from 'react-router-dom';
import GroupService from '../../../../service/groupService';
import parseDataToEdit from '../../../../utils/parseDataToSend/parseDataToEdit';
import GroupValidator from '../../../../utils/validator/groupValidator';
import { groupPaths } from '../../../router/routes';

const SubmitGroupChangesBtn = ({
  groupId,
  initialParams,
  paramsToEditObj,
  actualizeGroupInfo,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={async (e) => {
        try {
          e.preventDefault();
          const paramsObject = parseDataToEdit(initialParams, paramsToEditObj);

          if (!Object.keys(paramsObject).length) {
            alert('Nothing to change');
          }

          GroupValidator.validateGroupTitle(paramsToEditObj.groupTitle, true);
          GroupValidator.validatedGroupName(paramsToEditObj.groupName, true);

          await GroupService.editGroup(groupId, paramsObject);

          if (paramsObject.groupName) {
            navigate(groupPaths.mainPath + '/' + paramsObject.groupName);
          } else {
            await actualizeGroupInfo();
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

export default SubmitGroupChangesBtn;

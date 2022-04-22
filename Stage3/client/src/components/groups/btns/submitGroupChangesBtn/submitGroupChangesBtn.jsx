import { useNavigate } from 'react-router-dom';
import useFetching from '../../../../hooks/useFetching';
import GroupService from '../../../../service/groupService';
import MyButton from '../../../../UI/myButton/myButton';
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
  const { executeCallback: editGroup, isLoading: groupInfoIsLoading } =
    useFetching(
      async (groupId, paramsObject) =>
        await GroupService.editGroup(groupId, paramsObject)
    );

  const submitGroupChanges = async (e) => {
    try {
      e.preventDefault();
      const paramsObject = parseDataToEdit(initialParams, paramsToEditObj);

      if (!Object.keys(paramsObject).length) {
        alert('Nothing to change');
        return;
      }

      GroupValidator.validateGroupTitle(paramsToEditObj.groupTitle, true);
      GroupValidator.validatedGroupName(paramsToEditObj.groupName, true);

      await editGroup(undefined, groupId, paramsObject);

      if (paramsObject.groupName) {
        navigate(groupPaths.mainPath + '/' + paramsObject.groupName);
      } else {
        await actualizeGroupInfo();
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <MyButton
      data-testid='submit-group-changes-btn'
      disabled={groupInfoIsLoading}
      onClick={submitGroupChanges}
    >
      Submit changes
    </MyButton>
  );
};

export default SubmitGroupChangesBtn;

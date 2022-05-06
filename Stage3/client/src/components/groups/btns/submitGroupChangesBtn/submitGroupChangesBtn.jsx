import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    useFetching(async (groupIdVal, paramsObject) => {
      await GroupService.editGroup(groupIdVal, paramsObject);
    });

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
        navigate(`${groupPaths.mainPath.path}/${paramsObject.groupName}`);
      } else {
        await actualizeGroupInfo();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <MyButton
      data-testid='submit-group-changes-btn'
      disabled={groupInfoIsLoading}
      type='submit'
      onClick={submitGroupChanges}
    >
      Submit changes
    </MyButton>
  );
};

SubmitGroupChangesBtn.propTypes = {
  groupId: PropTypes.string,
  initialParams: PropTypes.object,
  paramsToEditObj: PropTypes.object,
  actualizeGroupInfo: PropTypes.func,
};

export default SubmitGroupChangesBtn;

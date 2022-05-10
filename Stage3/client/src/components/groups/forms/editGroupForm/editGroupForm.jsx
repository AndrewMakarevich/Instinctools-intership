import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import EditForm from '../../../forms/editForm/editForm';
import parseDataToEdit from '../../../../utils/parseDataToSend/parseDataToEdit';
import GroupService from '../../../../service/groupService';
import GroupValidator from '../../../../utils/validator/groupValidator';
import { groupPaths } from '../../../router/routes';

const EditGroupForm = ({ groupObj, actualizeGroupInfo }) => {
  const navigate = useNavigate();
  const [newGroupInfo, setNewGroupInfo] = useState({
    groupName: '',
    groupTitle: '',
  });

  const submitGroupChanges = async () => {
    try {
      const paramsObject = parseDataToEdit(groupObj, newGroupInfo);

      if (!Object.keys(paramsObject).length) {
        alert('Nothing to change');
        return;
      }

      GroupValidator.validateGroupTitle(paramsObject.groupTitle, true);
      GroupValidator.validatedGroupName(paramsObject.groupName, true);

      await GroupService.editGroup(groupObj._id, newGroupInfo);

      if (paramsObject.groupName) {
        navigate(`${groupPaths.mainPath.path}/${paramsObject.groupName}`);
      } else {
        await actualizeGroupInfo();
      }
    } catch (error) {
      alert(error.isAxiosError ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    if (groupObj) {
      setNewGroupInfo({
        groupName: groupObj.groupName,
        groupTitle: groupObj.groupTitle,
      });
    }
  }, [groupObj]);

  return (
    <EditForm
      essenceName='Group'
      initialParamValues={groupObj}
      newParamValues={newGroupInfo}
      setNewParamValues={setNewGroupInfo}
      onSubmit={submitGroupChanges}
    />
  );
};

EditGroupForm.propTypes = {
  groupObj: PropTypes.object.isRequired,
  actualizeGroupInfo: PropTypes.func.isRequired,
};

export default EditGroupForm;

import { useEffect, useState } from 'react';
import SubmitGroupChangesBtn from '../../btns/submitGroupChangesBtn/submitGroupChangesBtn';
import EditForm from '../../../forms/editForm/editForm';

const EditGroupForm = ({ groupObj, actualizeGroupInfo }) => {
  const [newGroupInfo, setNewGroupInfo] = useState({
    groupName: '',
    groupTitle: '',
  });

  useEffect(() => {
    if (groupObj) {
      setNewGroupInfo({
        groupName: groupObj.groupName,
        groupTitle: groupObj.groupTitle,
      });
    }
  }, [groupObj]);

  return (
    <>
      <EditForm
        essenceName='Group'
        initialParamValues={groupObj}
        newParamValues={newGroupInfo}
        setNewParamValues={setNewGroupInfo}
      >
        <SubmitGroupChangesBtn
          groupId={groupObj._id}
          initialParams={groupObj}
          paramsToEditObj={newGroupInfo}
          actualizeGroupInfo={actualizeGroupInfo}
        />
      </EditForm>
    </>
  );
};

export default EditGroupForm;

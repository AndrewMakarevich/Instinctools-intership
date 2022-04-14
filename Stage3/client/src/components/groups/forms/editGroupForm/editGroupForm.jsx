import { useEffect, useState } from 'react';
import formStyles from './editGroupForm.module.css';
import MyInputWithLabel from '../../../../UI/myInput/myInputWithLabel';
import SubmitGroupChangesBtn from '../../btns/submitGroupChangesBtn/submitGroupChangesBtn';

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
    <form>
      <div className={formStyles['form-inputs__wrapper']}>
        {Object.keys(newGroupInfo).map((groupParam) => (
          <MyInputWithLabel
            key={groupParam}
            labelText={`Group's ${groupParam}`}
            value={newGroupInfo[groupParam]}
            onChange={(e) =>
              setNewGroupInfo({ ...newGroupInfo, [groupParam]: e.target.value })
            }
          />
        ))}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setNewGroupInfo({
            groupName: groupObj.groupName,
            groupTitle: groupObj.groupTitle,
          });
        }}
      >
        Clear changes
      </button>
      <SubmitGroupChangesBtn
        groupId={groupObj._id}
        initialParams={groupObj}
        paramsToEditObj={newGroupInfo}
        actualizeGroupInfo={actualizeGroupInfo}
      />
    </form>
  );
};

export default EditGroupForm;

import { useEffect, useState } from 'react';
import formStyles from './editGroupForm.module.css';
import MyInputWithLabel from '../../../../UI/myInput/myInputWithLabel';
import SubmitGroupChangesBtn from '../../btns/submitGroupChangesBtn/submitGroupChangesBtn';
import MyButton from '../../../../UI/myButton/myButton';

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
    <form className={formStyles['form']}>
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
      <div className={formStyles['form-buttons__wrapper']}>
        <MyButton
          onClick={(e) => {
            e.preventDefault();
            setNewGroupInfo({
              groupName: groupObj.groupName,
              groupTitle: groupObj.groupTitle,
            });
          }}
        >
          Clear changes
        </MyButton>
        <SubmitGroupChangesBtn
          groupId={groupObj._id}
          initialParams={groupObj}
          paramsToEditObj={newGroupInfo}
          actualizeGroupInfo={actualizeGroupInfo}
        />
      </div>
    </form>
  );
};

export default EditGroupForm;

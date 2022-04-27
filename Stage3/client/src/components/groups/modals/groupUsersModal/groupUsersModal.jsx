import { useState } from 'react';
import {
  getGroupUsersThunk,
  getNotGroupMembersThunk,
} from '../../../../store/reducers/userGroupReducer/actionCreator';
import MyButton from '../../../../UI/myButton/myButton';
import addUserToTheGroup from '../../../../utils/userGroup/addUserToTheGroup';
import deleteUserFromGroup from '../../../../utils/userGroup/deleteUserFromTheGroup';
import ModalWindow from '../../../modalWindow/modalWindow';
import GroupUsersPanel from '../../lists/groupUsersPanel/groupUsersPanel';
import modalStyles from './groupUsersModal.module.css';

const GroupUsersModal = ({ groupId }) => {
  const [groupUsersIsOpen, setGroupUsersIsOpen] = useState(false);
  const [deleteState, setDeleteState] = useState(true);

  return (
    <>
      <MyButton
        data-testid='open-group-users-modal-btn'
        onClick={() => setGroupUsersIsOpen(true)}
      >
        Users
      </MyButton>
      <ModalWindow
        testId='group-users-modal'
        isOpen={groupUsersIsOpen}
        setIsOpen={setGroupUsersIsOpen}
        modalContentClassName={modalStyles['group-users-content__wrapper']}
      >
        {deleteState ? (
          <GroupUsersPanel
            key={1}
            groupId={groupId}
            groupUsersStateArrName='groupUsers'
            thunkFunction={getGroupUsersThunk}
            actionsArr={[
              { header: 'delete', clickHandler: deleteUserFromGroup },
            ]}
          />
        ) : (
          <GroupUsersPanel
            key={2}
            groupId={groupId}
            groupUsersStateArrName='notGroupMembers'
            thunkFunction={getNotGroupMembersThunk}
            actionsArr={[{ header: 'add', clickHandler: addUserToTheGroup }]}
          />
        )}
        <MyButton onClick={() => setDeleteState(!deleteState)}>
          {deleteState ? 'Add new users to the group' : 'Delete users'}
        </MyButton>
      </ModalWindow>
    </>
  );
};

export default GroupUsersModal;

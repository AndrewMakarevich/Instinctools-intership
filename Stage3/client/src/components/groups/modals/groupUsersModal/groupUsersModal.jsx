import { useState } from 'react';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import GroupUsersList from '../../lists/groupUsersList/groupUsersList';
import NotGroupMembersList from '../../lists/notGroupMembersList/notGroupMembersList';
import modalStyles from './groupUsersModal.module.css';

const GroupUsersModal = ({ groupId }) => {
  const [groupUsersIsOpen, setGroupUsersIsOpen] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
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
        <button onClick={() => setDeleteState(!deleteState)}>
          {deleteState ? 'Add' : 'Delete'}
        </button>

        {deleteState ? (
          <GroupUsersList
            groupId={groupId}
            groupUsersIsOpen={groupUsersIsOpen}
          />
        ) : (
          <NotGroupMembersList
            groupId={groupId}
            groupUsersIsOpen={groupUsersIsOpen}
          />
        )}
      </ModalWindow>
    </>
  );
};

export default GroupUsersModal;

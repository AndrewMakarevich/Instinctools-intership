import { useState } from 'react';
import modalStyles from './userGroupsModal.module.css';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import UserGroupsList from '../../lists/userGroupsList/userGroupsList';
import GroupsUserNotPartOfList from '../../lists/groupsUserNotPartOfList/groupsUserNotPartOfList';

const UserGroupsModal = ({ userId }) => {
  const [userGroupsIsOpen, setUserGroupsIsOpen] = useState(false);
  const [leaveState, setLeaveState] = useState(false);

  return (
    <>
      <MyButton onClick={() => setUserGroupsIsOpen(true)}>User groups</MyButton>
      <ModalWindow
        isOpen={userGroupsIsOpen}
        setIsOpen={setUserGroupsIsOpen}
        modalContentClassName={modalStyles['user-groups-content__wrapper']}
      >
        <button onClick={() => setLeaveState(!leaveState)}>
          {leaveState ? 'Enter' : 'Leave'}
        </button>

        {leaveState ? (
          <UserGroupsList userId={userId} userGroupsIsOpen={userGroupsIsOpen} />
        ) : (
          <GroupsUserNotPartOfList
            userId={userId}
            userGroupsIsOpen={userGroupsIsOpen}
          />
        )}
      </ModalWindow>
    </>
  );
};

export default UserGroupsModal;

import { useState } from 'react';
import modalStyles from './userGroupsModal.module.css';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import UserGroupsList from '../../lists/userGroupsList/userGroupsList';
import GroupsUserNotPartOfList from '../../lists/groupsUserNotPartOfList/groupsUserNotPartOfList';

const UserGroupsModal = ({ userId }) => {
  const [userGroupsIsOpen, setUserGroupsIsOpen] = useState(false);
  const [leaveState, setLeaveState] = useState(true);

  return (
    <>
      <MyButton onClick={() => setUserGroupsIsOpen(true)}>User groups</MyButton>
      <ModalWindow
        isOpen={userGroupsIsOpen}
        setIsOpen={setUserGroupsIsOpen}
        modalContentClassName={modalStyles['user-groups-content__wrapper']}
      >
        {leaveState ? (
          <UserGroupsList userId={userId} userGroupsIsOpen={userGroupsIsOpen} />
        ) : (
          <GroupsUserNotPartOfList
            userId={userId}
            userGroupsIsOpen={userGroupsIsOpen}
          />
        )}

        <MyButton onClick={() => setLeaveState(!leaveState)}>
          {leaveState ? 'Enter into other groups' : 'Leave groups'}
        </MyButton>
      </ModalWindow>
    </>
  );
};

export default UserGroupsModal;

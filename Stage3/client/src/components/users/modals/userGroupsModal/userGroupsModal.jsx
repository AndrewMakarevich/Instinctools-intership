import { useState } from 'react';
import modalStyles from './userGroupsModal.module.css';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import {
  getGroupsUserNotParticipateInThunk,
  getUserGroupsThunk,
} from '../../../../store/reducers/userGroupReducer/actionCreator';
import deleteUserFromGroup from '../../../../utils/userGroup/deleteUserFromTheGroup';
import UserGroupsPanel from '../../lists/userGroupsPanel/userGroupsPanel';
import addUserToTheGroup from '../../../../utils/userGroup/addUserToTheGroup';

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
          <UserGroupsPanel
            key={1}
            userId={userId}
            thunkFunction={getUserGroupsThunk}
            userGroupsStateArrName='userGroups'
            actionsArr={[
              { header: 'leave', clickHandler: deleteUserFromGroup },
            ]}
          />
        ) : (
          <UserGroupsPanel
            key={2}
            userId={userId}
            thunkFunction={getGroupsUserNotParticipateInThunk}
            userGroupsStateArrName='groupsUserNotParticipateIn'
            actionsArr={[{ header: 'enter', clickHandler: addUserToTheGroup }]}
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

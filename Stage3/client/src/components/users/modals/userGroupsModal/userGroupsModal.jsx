import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import {
  getGroupsUserNotParticipateInThunk,
  getUserGroupsThunk,
} from '../../../../store/reducers/userGroupReducer/actionCreator';
import deleteUserFromGroup from '../../../../utils/userGroup/deleteUserFromTheGroup';
import UserGroupsList from '../../lists/userGroupsPanel/userGroupsList';
import addUserToTheGroup from '../../../../utils/userGroup/addUserToTheGroup';

import modalStyles from './userGroupsModal.module.css';

const UserGroupsModal = ({ userId }) => {
  const [userGroupsIsOpen, setUserGroupsIsOpen] = useState(false);
  const [leaveState, setLeaveState] = useState(true);

  const userGroupsActionsArray = useMemo(
    () => [
      {
        header: 'leave',
        clickHandler: (groupId, actualizeGroupListFunction) =>
          deleteUserFromGroup(userId, groupId, actualizeGroupListFunction),
      },
    ],
    [userId]
  );

  const groupsNotPartOfActionsArray = useMemo(
    () => [
      {
        header: 'enter',
        clickHandler: (groupId, actualizeGroupListFunction) => {
          addUserToTheGroup(userId, groupId, actualizeGroupListFunction);
        },
      },
    ],
    [userId]
  );

  return (
    <>
      <MyButton onClick={() => setUserGroupsIsOpen(true)}>User groups</MyButton>
      <ModalWindow
        isOpen={userGroupsIsOpen}
        setIsOpen={setUserGroupsIsOpen}
        modalContentClassName={modalStyles['user-groups-content__wrapper']}
      >
        {leaveState ? (
          <UserGroupsList
            key={1}
            userId={userId}
            thunkFunction={getUserGroupsThunk}
            userGroupsStateArrName='userGroups'
            actionsArr={userGroupsActionsArray}
          />
        ) : (
          <UserGroupsList
            key={2}
            userId={userId}
            thunkFunction={getGroupsUserNotParticipateInThunk}
            userGroupsStateArrName='groupsUserNotParticipateIn'
            actionsArr={groupsNotPartOfActionsArray}
          />
        )}

        <MyButton onClick={() => setLeaveState(!leaveState)}>
          {leaveState ? 'Enter into other groups' : 'Leave groups'}
        </MyButton>
      </ModalWindow>
    </>
  );
};

UserGroupsModal.propTypes = {
  userId: PropTypes.string,
};

export default UserGroupsModal;

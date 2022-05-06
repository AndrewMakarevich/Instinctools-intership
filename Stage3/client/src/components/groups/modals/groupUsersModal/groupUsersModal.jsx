import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getGroupUsersThunk,
  getNotGroupMembersThunk,
} from '../../../../store/reducers/userGroupReducer/actionCreator';
import MyButton from '../../../../UI/myButton/myButton';
import addUserToTheGroup from '../../../../utils/userGroup/addUserToTheGroup';
import deleteUserFromGroup from '../../../../utils/userGroup/deleteUserFromTheGroup';
import ModalWindow from '../../../modalWindow/modalWindow';
import GroupUsersList from '../../lists/groupUsersPanel/groupUsersList';

import modalStyles from './groupUsersModal.module.css';

const GroupUsersModal = ({ groupId }) => {
  const [groupUsersIsOpen, setGroupUsersIsOpen] = useState(false);
  const [deleteState, setDeleteState] = useState(true);

  const groupUsersActionsArray = useMemo(
    () => [
      {
        header: 'delete',
        clickHandler: (userId, actualizeUsersListFunction) =>
          deleteUserFromGroup(userId, groupId, actualizeUsersListFunction),
      },
    ],
    [groupId],
  );

  const notGroupMembersActionsArray = useMemo(
    () => [
      {
        header: 'add',
        clickHandler: (userId, actualizeUsersListFunction) =>
          addUserToTheGroup(userId, groupId, actualizeUsersListFunction),
      },
    ],
    [groupId],
  );

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
          <GroupUsersList
            key={1}
            groupId={groupId}
            groupUsersStateArrName='groupUsers'
            thunkFunction={getGroupUsersThunk}
            actionsArr={groupUsersActionsArray}
          />
        ) : (
          <GroupUsersList
            key={2}
            groupId={groupId}
            groupUsersStateArrName='notGroupMembers'
            thunkFunction={getNotGroupMembersThunk}
            actionsArr={notGroupMembersActionsArray}
          />
        )}
        <MyButton onClick={() => setDeleteState(!deleteState)}>
          {deleteState ? 'Add new users to the group' : 'Delete users'}
        </MyButton>
      </ModalWindow>
    </>
  );
};

GroupUsersModal.propTypes = {
  groupId: PropTypes.string,
};

export default GroupUsersModal;

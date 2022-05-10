import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import UserGroupService from '../../../../service/userGroupService';

import {
  getGroupUsersThunk,
  getNotGroupMembersThunk,
} from '../../../../store/reducers/userGroupReducer/actionCreator';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import GroupUsersList from '../../lists/groupUsersPanel/groupUsersList';

import modalStyles from './groupUsersModal.module.css';

const GroupUsersModal = ({ groupId }) => {
  const dispatch = useDispatch();

  const [groupUsersIsOpen, setGroupUsersIsOpen] = useState(false);
  const [deleteState, setDeleteState] = useState(true);

  const groupUsersListLimitValue = 10;
  const notGroupMembersListLimit = 10;

  const groupUsersActionsArray = useMemo(
    () => [
      {
        header: 'delete',
        clickHandler: async (user) => {
          try {
            if (
              window.confirm(
                'Are you sure you want to delete user from this group?',
              )
            ) {
              await UserGroupService.deleteUserFromTheGroup(user._id, groupId);
              await dispatch(
                getGroupUsersThunk(groupId, {}, 1, groupUsersListLimitValue),
              );
            }
          } catch (e) {
            alert(e.isAxiosResponse ? e.response.data.message : e.message);
          }
        },
      },
    ],
    [groupId],
  );

  const notGroupMembersActionsArray = useMemo(
    () => [
      {
        header: 'add',
        clickHandler: async (user) => {
          try {
            if (
              window.confirm('Are you sure you want to add user to this group?')
            ) {
              await UserGroupService.addUserToTheGroup(user._id, groupId);
              await dispatch(
                getNotGroupMembersThunk(
                  groupId,
                  {},
                  1,
                  notGroupMembersListLimit,
                ),
              );
            }
          } catch (e) {
            alert(e.isAxiosResponse ? e.response.data.message : e.message);
          }
        },
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
            limit={groupUsersListLimitValue}
          />
        ) : (
          <GroupUsersList
            key={2}
            groupId={groupId}
            groupUsersStateArrName='notGroupMembers'
            thunkFunction={getNotGroupMembersThunk}
            actionsArr={notGroupMembersActionsArray}
            limit={notGroupMembersListLimit}
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

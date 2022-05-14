import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import UserGroupService from '../../../../service/userGroupService';
import MyButton from '../../../../UI/myButton/myButton';
import ModalWindow from '../../../modalWindow/modalWindow';
import {
  getGroupsUserNotParticipateInThunk,
  getUserGroupsThunk,
} from '../../../../store/reducers/userGroupReducer/actionCreator';
import UserGroupsList from '../../lists/userGroupsPanel/userGroupsList';

import modalStyles from './userGroupsModal.module.css';
import RenderIf from '../../../renderIf/renderIf';

const UserGroupsModal = ({ userId }) => {
  const dispatch = useDispatch();
  const [userGroupsIsOpen, setUserGroupsIsOpen] = useState(false);
  const [leaveState, setLeaveState] = useState(true);

  const userGroupsListLimitValue = 10;
  const groupsUserNotPartOfListLimitValue = 10;

  const userGroupsActionsArray = useMemo(
    () => [
      {
        header: 'leave',
        clickHandler: async (group) => {
          try {
            if (window.confirm('Are you sure you want to leave this group?')) {
              await UserGroupService.deleteUserFromTheGroup(userId, group._id);
              await dispatch(
                getUserGroupsThunk(userId, {}, 1, userGroupsListLimitValue),
              );
            }
          } catch (e) {
            alert(e.isAxiosError ? e.response.data.message : e.message);
          }
        },
      },
    ],
    [userId],
  );

  const groupsNotPartOfActionsArray = useMemo(
    () => [
      {
        header: 'enter',
        clickHandler: async (group) => {
          try {
            if (window.confirm('Are you sure you want enter this group?')) {
              await UserGroupService.addUserToTheGroup(userId, group._id);
              await dispatch(
                getGroupsUserNotParticipateInThunk(
                  userId,
                  {},
                  1,
                  groupsUserNotPartOfListLimitValue,
                ),
              );
            }
          } catch (e) {
            alert(e.isAxiosError ? e.response.data.message : e.message);
          }
        },
      },
    ],
    [userId],
  );

  return (
    <>
      <MyButton onClick={() => setUserGroupsIsOpen(true)}>User groups</MyButton>
      <ModalWindow
        isOpen={userGroupsIsOpen}
        setIsOpen={setUserGroupsIsOpen}
        modalContentClassName={modalStyles['user-groups-content__wrapper']}
      >
        <RenderIf isTrue={leaveState}>
          <UserGroupsList
            key={1}
            userId={userId}
            thunkFunction={getUserGroupsThunk}
            userGroupsStateArrName='userGroups'
            actionsArr={userGroupsActionsArray}
            limit={userGroupsListLimitValue}
          />
        </RenderIf>

        <RenderIf isTrue={!leaveState}>
          <UserGroupsList
            key={2}
            userId={userId}
            thunkFunction={getGroupsUserNotParticipateInThunk}
            userGroupsStateArrName='groupsUserNotParticipateIn'
            actionsArr={groupsNotPartOfActionsArray}
            limit={groupsUserNotPartOfListLimitValue}
          />
        </RenderIf>

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

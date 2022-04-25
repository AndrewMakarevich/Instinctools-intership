import UserGroupService from '../../../service/userGroupService';
import userGroupActions from './actions';

export const getUserGroupsThunk = (userId, filterObject, page, limit) => {
  return async (dispatch) => {
    const response = await UserGroupService.getUserGroups(
      userId,
      filterObject,
      page,
      limit
    );

    dispatch({ type: userGroupActions.getUserGroups, payload: response.data });
  };
};

export const getGroupUsersThunk = (groupId, filterObject, page, limit) => {
  return async (dispatch) => {
    const response = await UserGroupService.getGroupUsers(
      groupId,
      filterObject,
      page,
      limit
    );

    dispatch({ type: userGroupActions.getGroupUsers, payload: response.data });
  };
};

export const getGroupsUserNotParticipateInThunk = (
  userId,
  filterObject,
  page,
  limit
) => {
  return async (dispatch) => {
    const response = await UserGroupService.getGroupsUserNotParticipateIn(
      userId,
      filterObject,
      page,
      limit
    );
    dispatch({
      type: userGroupActions.getGroupsUserNotParticipateIn,
      payload: response.data,
    });
  };
};

export const getNotGroupMembersThunk = (groupId, filterObject, page, limit) => {
  return async (dispatch) => {
    const response = await UserGroupService.getNotGroupMembers(
      groupId,
      filterObject,
      page,
      limit
    );
    dispatch({
      type: userGroupActions.getNotGroupMembers,
      payload: response.data,
    });
  };
};

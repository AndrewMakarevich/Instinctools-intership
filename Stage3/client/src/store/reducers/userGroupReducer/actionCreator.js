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

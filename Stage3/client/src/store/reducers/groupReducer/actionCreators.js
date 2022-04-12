import GroupService from '../../../service/groupService';
import groupActions from './actions';

export const getGroupsThunk = (queryParams) => async (dispatch) => {
  try {
    const { data } = await GroupService.getGroups(queryParams);

    return dispatch({ type: groupActions.getGroups, payload: data });
  } catch (e) {
    return alert(e.response.data.message);
  }
};

export const getGroupThunk = (groupName) => async (dispatch) => {
  const response = await GroupService.getGroup(groupName);

  return dispatch({ type: groupActions.getGroup, payload: response.data });
};

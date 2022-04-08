import GroupService from '../../../service/groupService';
import groupActions from './actions';

const getGroups = (queryParams) => async (dispatch) => {
  try {
    const { data } = await GroupService.getGroups(queryParams);
    return dispatch({ type: groupActions.getGroups, payload: data });
  } catch (e) {
    return alert(e.response.data.message);
  }
};

export default getGroups;

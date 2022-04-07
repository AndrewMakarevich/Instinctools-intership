import GroupService from "../../../service/groupService";
import groupActions from "./actions";

const getGroups = () => {
  return async (dispatch) => {
    try {
      const { data } = await GroupService.getGroups();
      return dispatch({ type: groupActions.getGroups, payload: data });
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}

export { getGroups };
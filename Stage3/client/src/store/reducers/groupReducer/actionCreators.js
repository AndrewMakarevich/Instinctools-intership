import GroupService from "../../../service/groupService";
import groupActions from "./actions";

const getGroups = () => {
  return async (dispatch) => {
    const { data } = await GroupService.getGroups();
    return dispatch({ type: groupActions.getGroups, payload: data })
  }
}

export { getGroups };
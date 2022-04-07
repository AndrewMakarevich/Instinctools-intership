import UserService from "../../../service/userService";
import userActions from "./actions";

const getUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await UserService.getUsers();
      dispatch({ type: userActions.getUsers, payload: data });
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export { getUsers };
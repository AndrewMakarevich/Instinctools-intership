import UserService from '../../../service/userService';
import userActions from './actions';

const getUsers = (queryParams) => async (dispatch) => {
  try {
    console.log(queryParams);
    const { data } = await UserService.getUsers(queryParams);
    dispatch({ type: userActions.getUsers, payload: data });
  } catch (e) {
    alert(e.response.data.message);
  }
};

export default getUsers;

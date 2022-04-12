import UserService from '../../../service/userService';
import userActions from './actions';

export const getUsersThunk = (queryParams) => async (dispatch) => {
  try {
    const { data } = await UserService.getUsers(queryParams);

    dispatch({ type: userActions.getUsers, payload: data });
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const getUserThunk = (username) => async (dispatch) => {
  const response = await UserService.getUser(username);
  dispatch({ type: userActions.getUser, payload: response.data });
};

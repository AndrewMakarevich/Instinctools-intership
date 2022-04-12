import userActions from './actions';

const defaultState = {
  users: [],
  user: null,
  count: 0,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case userActions.getUsers:
      return {
        ...state,
        users: action.payload.rows,
        count: action.payload.count,
      };
    case userActions.getUser:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

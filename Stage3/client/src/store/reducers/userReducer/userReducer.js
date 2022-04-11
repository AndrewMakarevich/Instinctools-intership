import userActions from './actions';

const defaultState = {
  users: [],
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
    default:
      return state;
  }
};

export default userReducer;

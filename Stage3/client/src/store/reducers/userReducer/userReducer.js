import userActions from "./actions";

const defaultState = {
  users: []
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case userActions.getUsers:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userReducer;
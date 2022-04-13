import userGroupActions from './actions';

const defaultState = {
  userGroups: [],
  count: 0,
};

const userGroupReducer = (state = defaultState, action) => {
  switch (action.type) {
    case userGroupActions.getUserGroups:
      return {
        ...state,
        userGroups: action.payload.rows,
        count: action.payload.count,
      };
    default:
      return state;
  }
};

export default userGroupReducer;

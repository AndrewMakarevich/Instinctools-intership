import userGroupActions from './actions';

const defaultState = {
  userGroups: [],
  groupUsers: [],
  groupsUserNotParticipateIn: [],
  notGroupMembers: [],
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
    case userGroupActions.getGroupUsers:
      return {
        ...state,
        groupUsers: action.payload.rows,
        count: action.payload.count,
      };
    case userGroupActions.getGroupsUserNotParticipateIn:
      return {
        ...state,
        groupsUserNotParticipateIn: action.payload.rows,
        count: action.payload.count,
      };
    case userGroupActions.getNotGroupMembers:
      return {
        ...state,
        notGroupMembers: action.payload.rows,
        count: action.payload.count,
      };
    default:
      return state;
  }
};

export default userGroupReducer;

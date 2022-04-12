import groupActions from './actions';

const defaultState = {
  groups: [],
  group: null,
  count: 0,
};

const groupReducer = (state = defaultState, action) => {
  switch (action.type) {
    case groupActions.getGroups:
      return {
        ...state,
        groups: action.payload.rows,
        count: action.payload.count,
      };
    case groupActions.getGroup:
      return {
        ...state,
        group: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;

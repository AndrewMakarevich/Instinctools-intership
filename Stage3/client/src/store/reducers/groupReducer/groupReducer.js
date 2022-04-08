import groupActions from './actions';

const defaultState = {
  groups: [],
  count: 0,
};

const groupReducer = (state = defaultState, action) => {
  switch (action.type) {
    case groupActions.getGroups:
      return { ...state, groups: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default groupReducer;

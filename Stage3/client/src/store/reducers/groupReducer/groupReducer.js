import store from "../../store";
import groupActions from "./actions";


const defaultState = {
  groups: []
};

const groupReducer = (state = defaultState, action) => {
  switch (action.type) {
    case groupActions.getGroups:
      return { ...store, groups: action.payload };
    default:
      return state;
  }

}

export default groupReducer;
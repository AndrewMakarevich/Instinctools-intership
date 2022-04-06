import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import groupReducer from "./reducers/groupReducer/groupReducer";


const rootReducer = combineReducers({
  groupReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import groupReducer from "./reducers/groupReducer/groupReducer";
import userReducer from "./reducers/userReducer/userReducer";


const rootReducer = combineReducers({
  groupReducer,
  userReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
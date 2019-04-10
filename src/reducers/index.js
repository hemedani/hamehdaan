import { combineReducers } from "redux";

import authReducer from "./auth_reducer";
import centers from "./centers_rc";

const rootReducer = combineReducers({
  auth: authReducer,
  centers
});

export default rootReducer;

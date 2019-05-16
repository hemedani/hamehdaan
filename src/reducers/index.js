import { combineReducers } from "redux";

import auth from "./auth_reducer";
import centers from "./centers_rc";
import parishes from "./parishes_rc";
import searches from "./search_rc";

const rootReducer = combineReducers({ auth, centers, parishes, searches });

export default rootReducer;

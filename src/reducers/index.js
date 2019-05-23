import { combineReducers } from "redux";

import auth from "./auth_reducer";
import centers from "./centers_rc";
import parishes from "./parishes_rc";
import searches from "./search_rc";
import reports from "./reports_rc";

const rootReducer = combineReducers({ auth, centers, parishes, searches, reports });

export default rootReducer;

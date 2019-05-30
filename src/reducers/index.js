import { combineReducers } from "redux";

import auth from "./auth_reducer";
import centers from "./centers_rc";
import center from "./center_rc";
import parishes from "./parishes_rc";
import rastes from "./rastes_rc";
import searches from "./search_rc";
import reports from "./reports_rc";

const rootReducer = combineReducers({ auth, centers, center, parishes, rastes, searches, reports });

export default rootReducer;

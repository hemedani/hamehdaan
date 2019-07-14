import { combineReducers } from "redux";

import auth from "./auth/AuthReducer";
import centers from "./centers/CentersReducer";
import center from "./center/CenterReducer";
import parishes from "./parish/ParishReducer";
import rastes from "./raste/RasteReducer";
import searches from "./searchAct/SearchReducer";
import reports from "./report/ReportReducer";
import forms from "./form/FormReducer";

const rootReducer = combineReducers({
  auth,
  centers,
  center,
  parishes,
  rastes,
  searches,
  reports,
  forms
});

export default rootReducer;

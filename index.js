/**
 * @format
 */

import { I18nManager, AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
I18nManager.forceRTL(true);
// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => App);

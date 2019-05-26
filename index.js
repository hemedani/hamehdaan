/**
 * @format
 */

import { I18nManager, AppRegistry } from "react-native";
I18nManager.forceRTL(true);

import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

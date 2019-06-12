/**
 * @format
 */

import { AppRegistry } from "react-native";
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";

import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

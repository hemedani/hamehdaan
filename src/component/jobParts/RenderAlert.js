import React from "react";
import { TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

const alertAnimation = require("../../img/animations/delete-alert.json");
const tickAnimation = require("../../img/animations/check.json");

const RenderAlert = ({ pressFunc, tick, top }) => (
  <TouchableOpacity
    style={{
      position: "absolute",
      end: tick ? 10 : 2,
      top: top ? (tick ? 10 : 2) : null,
      width: tick ? 31 : 51
    }}
    onPress={pressFunc}
  >
    <LottieView
      style={{ width: tick ? 31 : 50, height: tick ? 31 : 50 }}
      source={tick ? tickAnimation : alertAnimation}
      autoPlay
      loop={tick ? false : true}
    />
  </TouchableOpacity>
);

export default RenderAlert;

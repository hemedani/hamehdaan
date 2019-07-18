import React from "react";
import { TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

const alertAnimation = require("../../img/animations/delete-alert.json");

const RenderAlert = ({ pressFunc }) => (
  <TouchableOpacity
    style={{
      position: "absolute",
      end: 2,
      width: 51
    }}
    onPress={pressFunc}
  >
    <LottieView style={{ width: 50, height: 50 }} source={alertAnimation} autoPlay loop />
  </TouchableOpacity>
);

export default RenderAlert;

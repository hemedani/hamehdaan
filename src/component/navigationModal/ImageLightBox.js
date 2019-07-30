import React from "react";
import { View, TouchableWithoutFeedback, Dimensions, StyleSheet } from "react-native";

import FitImage from "react-native-fit-image";
import { RU } from "../../actions/RootTypes";

const ImageLightBox = ({ navigation }) => {
  const image = navigation.getParam("image", "someString");
  const goingBack = () => navigation.goBack();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableWithoutFeedback onPress={goingBack}>
        <View
          style={{
            position: "absolute",
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 0
          }}
        />
      </TouchableWithoutFeedback>
      <FitImage indicatorColor="white" indicatorSize="large" source={{ uri: `${RU}/pic/800/${image}` }} />
    </View>
  );
};

export default ImageLightBox;

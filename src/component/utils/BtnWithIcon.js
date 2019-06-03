import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";

const BtnWithIcon = ({ job, navigate, path, title }) => {
  const handleOnPress = () => navigate(path, { job });
  return (
    <TouchableOpacity style={btnStyles.touchableStyle}>
      <Icon name="close-circle" type="antdesign" color="#517fa4" />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  touchableStyle: {
    flex: 1,
    backgroundColor: teamcheColors.cornFlowerBlue
  }
});

export default BtnWithIcon;

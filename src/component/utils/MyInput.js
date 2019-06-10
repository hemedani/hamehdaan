import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";

const MyInput = ({ value, name, onChange, label, ...rest }) => {
  const _handleChange = newVal => onChange(name, newVal);
  value = value ? value.toString() : "";
  return (
    <View style={myInputStyles.root}>
      {label && <Text style={[teamcheStyle.textBase, myInputStyles.myInpLabel]}>{label}</Text>}
      <TextInput
        style={[teamcheStyle.textBase, myInputStyles.textInp]}
        {...rest}
        value={value}
        onChangeText={_handleChange}
        placeholder={label}
      />
    </View>
  );
};

export const myInputStyles = StyleSheet.create({
  root: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 10
  },
  myInpLabel: {
    paddingStart: 15,
    color: teamcheColors.dark
  },
  textInp: {
    height: 38,
    width: "100%",
    borderColor: teamcheColors.lightPink,
    backgroundColor: teamcheColors.lightGray,
    borderWidth: 0.6,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginEnd: 10,
    textAlign: "right"
  }
});

export default MyInput;

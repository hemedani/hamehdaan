import { StyleSheet } from "react-native";

export const teamcheColors = {
  purple: "rgb(112, 26, 146)",
  gray: "rgb(216, 216, 216)",
  lightGray: "#EDEEEF",
  darkerGray: "rgb(179, 179, 179)",
  cornFlowerBlue: "#5187D1",
  seaFoam: "#6BBFAB"
};

export default StyleSheet.create({
  textBase: {
    writingDirection: "rtl",
    fontFamily: "Shabnam-FD",
    fontSize: 13
  },
  textTitr: {
    fontSize: 20,
    fontFamily: "Shabnam-Bold-FD",
    textAlign: "center",
    marginBottom: 15
  }
});

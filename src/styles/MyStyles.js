import { StyleSheet } from "react-native";

export const teamcheColors = {
  purple: "rgb(112, 26, 146)",
  gray: "rgb(216, 216, 216)",
  lightGray: "#EDEEEF",
  darkerGray: "rgb(179, 179, 179)",
  dark: "rgb(37, 33, 33)",
  cornFlowerBlue: "#5187D1",
  royal: "#002fa4",
  seaFoam: "#6BBFAB",
  dullRed: "#B34334",
  lightPink: "rgb(237, 238, 239)"
};

const teamcheStyle = StyleSheet.create({
  textBase: {
    writingDirection: "rtl",
    fontFamily: "Shabnam-FD",
    fontSize: 12
  },
  textTitr: {
    fontSize: 20,
    fontFamily: "Shabnam-Bold-FD",
    textAlign: "center",
    marginBottom: 15
  }
});

export default teamcheStyle;

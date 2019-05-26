import React from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions, StyleSheet } from "react-native";

import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";

const BaseModalNavigation = ({ headerTxt, goBack, children }) => {
  const goingBack = () => goBack(null);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableWithoutFeedback onPress={goingBack}>
        <View
          style={{
            position: "absolute",
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 0
          }}
        />
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: "#fff", zIndex: 1 }}>
        <View style={headerBarStyle.headerContainerStyle}>
          <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr, { color: teamcheColors.lightPink, paddingTop: 10 }]}>
            {headerTxt}
          </Text>
          <Icon
            containerStyle={headerBarStyle.closeIconStyle}
            name="close"
            raised
            type="font-awesome"
            size={13}
            onPress={goingBack}
          />
        </View>

        <View style={bodyStyle.bodyContainer}>
          {children}
          <View style={{ height: 3, backgroundColor: teamcheColors.royal }} />
        </View>
      </View>
    </View>
  );
};

const headerBarStyle = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: teamcheColors.royal,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 20
  },
  closeIconStyle: {}
});

const bodyStyle = StyleSheet.create({
  bodyContainer: {
    flexDirection: "column",
    minHeight: 100,
    maxHeight: 403,
    zIndex: 2
  }
});

export default BaseModalNavigation;

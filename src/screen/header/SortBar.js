import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import MyStyles, { teamcheColors } from "../../styles/MyStyles";
export const SORT_BAR_HEIGHT = 45;

class SortBar extends React.PureComponent {
  state = {
    phone: ""
  };

  handlePhoneChange(phone) {
    this.setState({ phone });
  }
  render() {
    return (
      <View
        style={{
          height: SORT_BAR_HEIGHT,
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 4
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            type="outline"
            rightIcon={{ color: "white", name: "envira", type: "font-awesome" }}
            buttonStyle={{
              borderColor: teamcheColors.purple,
              marginHorizontal: 5
            }}
            titleStyle={{
              color: teamcheColors.purple,
              fontFamily: "Shabnam-FD",
              fontSize: 12,
              padding: 0
            }}
            title="مرتب سازی"
          />
        </View>
        <View style={{ borderStartWidth: 1, borderStartColor: teamcheColors.darkerGray }} />
      </View>
    );
  }
}

export default SortBar;

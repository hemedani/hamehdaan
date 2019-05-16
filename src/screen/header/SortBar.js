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
            icon={{ color: "white", name: "sort", type: "font-awesome", size: 14 }}
            buttonStyle={{
              borderColor: teamcheColors.lightPink,
              marginHorizontal: 5
            }}
            titleStyle={{
              color: teamcheColors.lightPink,
              fontFamily: "Shabnam-FD",
              fontSize: 12,
              padding: 0
            }}
            title="مرتب سازی"
          />
        </View>
        <View style={{ borderStartWidth: 1, borderStartColor: teamcheColors.lightPink }} />
      </View>
    );
  }
}

export default SortBar;

import React from "react";
import { View, Text } from "react-native";

class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: "تنظیمات",
    labelStyle: {
      fontFamily: "Shabnam-FD"
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>تنظیمات</Text>
      </View>
    );
  }
}

export default SettingsScreen;

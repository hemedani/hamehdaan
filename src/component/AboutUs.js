import React from "react";
import { View, Text } from "react-native";

class AboutUsScreen extends React.PureComponent {
  static navigationOptions = {
    title: "درباره ما"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>درباره ما</Text>
      </View>
    );
  }
}
export default AboutUsScreen;

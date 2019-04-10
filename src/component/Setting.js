import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { singoutUser } from "../actions";

class SettingsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handeSignOut = this.handeSignOut.bind(this);
  }
  static navigationOptions = {
    title: "تنظیمات",
    labelStyle: {
      fontFamily: "Shabnam-FD"
    }
  };
  async handeSignOut() {
    await this.props.singoutUser();
    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>تنظیمات</Text>

        <Button
          style={{
            fontFamily: "Shabnam-FD"
          }}
          title="خروج"
          onPress={this.handeSignOut}
        />
      </View>
    );
  }
}
export default connect(
  null,
  { singoutUser }
)(SettingsScreen);

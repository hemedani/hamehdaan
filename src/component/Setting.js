import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { singoutUser } from "../actions";
import { Avatar, Button, Divider } from "react-native-elements";
import { teamcheColors } from "../styles/MyStyles";

class SettingsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }
  static navigationOptions = {
    title: "تنظیمات",
    labelStyle: {
      fontFamily: "Shabnam-FD"
    }
  };
  async handleSignOut() {
    await this.props.singoutUser();
    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 60 }}>
        <View style={{ flex: 2, justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <Avatar
            size="xlarge"
            title="CR"
            rounded
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
            }}
            showEditButton
          />
          <Divider style={{ width: "100%" }} />
        </View>
        <View style={{ flex: 3, padding: 15, width: "100%" }}>
          <Button
            titleStyle={{
              fontFamily: "Shabnam-FD"
            }}
            buttonStyle={{
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            icon={{
              name: "close",
              size: 15,
              type: "antdesign",
              color: "white"
            }}
            title="خروج"
            onPress={this.handleSignOut}
          />
        </View>
      </View>
    );
  }
}
export default connect(
  null,
  { singoutUser }
)(SettingsScreen);

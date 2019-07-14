import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { singoutUser } from "../actions";
import { Avatar, Button, Divider } from "react-native-elements";
import teamcheStyle, { teamcheColors } from "../styles/MyStyles";
import { RU } from "../actions/RootTypes";

const defaultUser = require("../img/default-user.jpg");
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
  // user.pic ? `${RU}/pic/500/${user.pic}` : defaultUser
  render() {
    const { user } = this.props.auth;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <Avatar
            size="xlarge"
            title={"HM"}
            rounded
            source={
              user.pic ? { uri: `${RU}/pic/500/${user.pic}` } : defaultUser
            }
            showEditButton
          />
          {user.familyName && (
            <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr]}>
              {user.name} {user.familyName}
            </Text>
          )}
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
              marginBottom: 15
            }}
            icon={{
              name: "book",
              size: 15,
              type: "antdesign",
              color: "white"
            }}
            title="بازرسی ها‍"
            onPress={() => this.props.navigation.navigate("CenterReports")}
          />
          <Button
            titleStyle={{
              fontFamily: "Shabnam-FD"
            }}
            buttonStyle={{
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            buttonStyle={{
              backgroundColor: teamcheColors.dullRed
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

const msp = ({ auth }) => ({ auth });
export default connect(
  msp,
  { singoutUser }
)(SettingsScreen);

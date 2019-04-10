import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { singoutUser } from "../actions";

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handeSignOut = this.handeSignOut.bind(this);
  }
  async handeSignOut() {
    const signout = await this.props.singoutUser();
    console.log("==================");
    console.log("this.props and sign out", this.props, signout);
    console.log("==================");

    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Menu Screen</Text>

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
)(Menu);

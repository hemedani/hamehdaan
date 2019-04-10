import React from "react";
import { View, Text, Button } from "react-native";

class DetailsScreen extends React.Component {
  componentDidMount() {}
  render() {
    const itemId = this.props.navigation.getParam("_id", "NO-ID");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Button title="Go to Details... again" onPress={() => this.props.navigation.push("Details")} />
        <Button title="Go to Home" onPress={() => this.props.navigation.navigate("Home")} />
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export default DetailsScreen;

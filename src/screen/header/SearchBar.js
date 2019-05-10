import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

export const SEARCHBAR_HEIGHT = 40;

class SearchBar extends React.PureComponent {
  state = {
    phone: ""
  };

  handlePhoneChange(phone) {
    this.setState({ phone });
  }
  render() {
    return (
      <View style={{ height: SEARCHBAR_HEIGHT }} >
        <Input placeholder="INPUT WITH ICON" leftIcon={{ type: "font-awesome", name: "chevron-left" }} />
      </View>
    );
  }
}

export default SearchBar;

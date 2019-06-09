import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";

export const SEARCHBAR_HEIGHT = 45;

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
  }

  handleTextChange(text) {
    this.props.handleSearchTextChange(text);
  }
  handleCenterSearch() {
    this.props.handleCenterSearch();
  }
  render() {
    return (
      <View style={searchBarStyles.viewContainer}>
        <TextInput
          style={[teamcheStyle.textBase, searchBarStyles.textInp]}
          onChangeText={this.handleTextChange}
          value={this.props.textValue}
          onSubmitEditing={this.handleCenterSearch}
          placeholder="یک عنوان یا آدرس را جستجو کنید ..."
        />
        <Icon
          containerStyle={searchBarStyles.iconContainer}
          name="search"
          type="font-awesome"
          color={teamcheColors.lightPink}
          onPress={this.handleCenterSearch}
        />
      </View>
    );
  }
}

const searchBarStyles = StyleSheet.create({
  viewContainer: {
    height: SEARCHBAR_HEIGHT,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  textInp: {
    height: 38,
    width: Dimensions.get("window").width - 70,
    borderColor: teamcheColors.lightPink,
    backgroundColor: teamcheColors.lightGray,
    borderWidth: 0.3,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginEnd: 10,
    textAlign: "right"
  },
  iconContainer: {}
});

export default SearchBar;

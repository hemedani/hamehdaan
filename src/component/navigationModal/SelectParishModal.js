import React from "react";
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Dimensions, FlatList } from "react-native";
import { connect } from "react-redux";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";
import {
  getParishes,
  cleanCenters,
  getCenters,
  setSelectedParish,
  handleCenterSearch,
  handleSearchTextChange,
  clearSelectedParish,
  cleanParishes
} from "../../actions";
import BaseModalNavigation from "./BaseModalNavigation";

const colors = [teamcheColors.gray, teamcheColors.lightGray];

const renderSeparator = () => (
  <View
    style={{
      height: 0.5,
      backgroundColor: teamcheColors.purple
    }}
  />
);

const RenderParishItem = ({ item, index, setParish, handleCenterSearch, goBack }) => {
  const handleParishSelect = async () => {
    await setParish(item);
    handleCenterSearch();
    goBack();
  };
  return (
    <TouchableOpacity
      onPress={handleParishSelect}
      style={[bodyStyle.flatItemContainer, { backgroundColor: colors[index % colors.length] }]}
    >
      <Text style={[teamcheStyle.textBase, bodyStyle.itemText]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

class SelectParishModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      path: ""
    };
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
    this.handleInpText = this.handleInpText.bind(this);
    this.setParish = this.setParish.bind(this);
    this.handleParishSearch = this.handleParishSearch.bind(this);
  }

  async componentDidMount() {
    await this.props.cleanParishes();
    this.props.getParishes();
  }

  handleInpText(path) {
    this.setState({ path });
  }

  async handleCenterSearch() {
    await this.props.cleanCenters();
    this.props.getCenters(this.props.searches.query);
  }

  async handleParishSearch() {
    const { path } = this.state;
    await this.props.cleanParishes();
    this.props.getParishes({ path });
  }

  setParish(parish) {
    this.props.setSelectedParish(parish);
  }
  render() {
    const { parishes } = this.props;
    return (
      <BaseModalNavigation headerTxt="انتخاب محله" goBack={this.props.navigation.goBack}>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={bodyStyle.bodyContainer}>
            <View style={searchBarStyles.searchViewContainer}>
              <TextInput
                style={[teamcheStyle.textBase, searchBarStyles.textInp]}
                placeholder="یک محله را جستجو کنید ..."
                onChangeText={this.handleInpText}
                value={this.state.path}
                onSubmitEditing={this.handleParishSearch}
              />
              <Icon
                containerStyle={searchBarStyles.iconContainer}
                name="search"
                type="font-awesome"
                color={teamcheColors.cornFlowerBlue}
                onPress={this.handleParishSearch}
              />
            </View>
            <FlatList
              style={bodyStyle.flatContainer}
              data={parishes.parishes}
              ItemSeparatorComponent={renderSeparator}
              keyExtractor={item => item._id}
              renderItem={({ item, index }) => (
                <RenderParishItem
                  item={item}
                  index={index}
                  setParish={this.setParish}
                  handleCenterSearch={this.handleCenterSearch}
                  goBack={this.props.navigation.goBack}
                />
              )}
            />
            <View style={{ height: 3, backgroundColor: teamcheColors.royal }} />
          </View>
        </View>
      </BaseModalNavigation>
    );
  }
}

export const searchBarStyles = StyleSheet.create({
  searchViewContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 3
  },
  textInp: {
    height: 38,
    width: Dimensions.get("window").width - 110,
    borderColor: teamcheColors.lightPink,
    backgroundColor: teamcheColors.lightGray,
    borderWidth: 0.3,
    borderRadius: 3,
    paddingHorizontal: 10,
    textAlign: "right",
    marginEnd: 10
  },
  iconContainer: {}
});

export const bodyStyle = StyleSheet.create({
  bodyContainer: {
    flexDirection: "column"
  },
  flatContainer: {
    height: 400,
    backgroundColor: teamcheColors.lightGray
  },
  flatItemContainer: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  itemText: {
    fontSize: 13
  }
});

const msp = ({ parishes, searches }) => ({ parishes, searches });

export default connect(
  msp,
  {
    getParishes,
    cleanCenters,
    getCenters,
    setSelectedParish,
    handleCenterSearch,
    handleSearchTextChange,
    clearSelectedParish,
    cleanParishes
  }
)(SelectParishModal);

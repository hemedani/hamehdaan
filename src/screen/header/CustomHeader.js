import React from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import Location, { LOCATION_HEIGHT } from "./Location";
import {
  getParishes,
  cleanCenters,
  setSelectedParish,
  handleSearchTextChange,
  getCenters,
  clearSelectedParish,
  setSortQuery,
  cleanSortQuery,
  removeRasteFromQuery
} from "../../actions";
import SearchBar, { SEARCHBAR_HEIGHT } from "./SearchBar";
import SortBar, { SORT_BAR_HEIGHT } from "./SortBar";
import { teamcheColors } from "../../styles/MyStyles";

const APPBAR_HEIGHT = LOCATION_HEIGHT + SEARCHBAR_HEIGHT;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 40 : 0;

// TODO implement two btn for filter by raste and etehadiye in search bar ==================
// TODO implement a ability for turn-on location for in android ==================
class CustomHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
  }

  async handleCenterSearch() {
    await this.props.cleanCenters();
    this.props.getCenters(this.props.searches.query);
  }

  render() {
    const {
      handleSearchTextChange,
      searches,
      getCenters,
      clearSelectedParish,
      removeRasteFromQuery,

      setSortQuery,
      cleanSortQuery
    } = this.props;
    return (
      <View
        style={{
          height: APPBAR_HEIGHT + STATUSBAR_HEIGHT + SORT_BAR_HEIGHT + 12,
          paddingTop: STATUSBAR_HEIGHT + 12,
          paddingBottom: 5,
          justifyContent: "flex-end",
          backgroundColor: teamcheColors.purple
        }}
      >
        <Location
          fullPath={this.props.searches.selectedParish.fullPath}
          handleCenterSearch={this.handleCenterSearch}
          clearSelectedParish={clearSelectedParish}
          navigation={this.props.navigation}
        />
        <SearchBar
          handleSearchTextChange={handleSearchTextChange}
          handleCenterSearch={this.handleCenterSearch}
          textValue={searches.text}
          getCenters={getCenters}
        />
        <SortBar
          setSortQuery={setSortQuery}
          cleanSortQuery={cleanSortQuery}
          searches={searches}
          handleCenterSearch={this.handleCenterSearch}
          navigate={this.props.navigation.navigate}
          removeRasteFromQuery={removeRasteFromQuery}
        />
      </View>
    );
  }
}

const msp = ({ searches }) => ({ searches });

export default connect(
  msp,
  {
    getParishes,
    cleanCenters,
    setSelectedParish,
    handleSearchTextChange,
    getCenters,
    clearSelectedParish,
    setSortQuery,
    cleanSortQuery,
    removeRasteFromQuery
  }
)(CustomHeader);

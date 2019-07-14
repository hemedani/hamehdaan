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
  clearGuildStatusFromQuery,
  setSortQuery,
  cleanSortQuery,
  removeRasteFromQuery
} from "../../actions";
import SearchBar, { SEARCHBAR_HEIGHT } from "./SearchBar";
import SortBar, { SORT_BAR_HEIGHT } from "./SortBar";
import { teamcheColors } from "../../styles/MyStyles";

const APP_BAR_HEIGHT = LOCATION_HEIGHT + SEARCHBAR_HEIGHT;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 40 : 0;

export const CUSTOM_HEADER_HEIGHT = APP_BAR_HEIGHT + STATUSBAR_HEIGHT + SORT_BAR_HEIGHT + 12;

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
      clearGuildStatusFromQuery,

      setSortQuery,
      cleanSortQuery
    } = this.props;
    return (
      <View
        style={{
          height: CUSTOM_HEADER_HEIGHT,
          paddingTop: STATUSBAR_HEIGHT + 12,
          paddingBottom: 5,
          justifyContent: "flex-end",
          backgroundColor: teamcheColors.purple
        }}
      >
        <Location
          fullPath={this.props.searches.selectedParish.fullPath}
          guildStatus={this.props.searches.query.guildStatus}
          clearGuildStatusFromQuery={clearGuildStatusFromQuery}
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
    clearGuildStatusFromQuery,
    setSortQuery,
    cleanSortQuery,
    removeRasteFromQuery
  }
)(CustomHeader);

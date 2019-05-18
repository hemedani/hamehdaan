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
  cleanParishes,
  setNearByQuery,
  setSortQuery,
  cleanSortQuery
} from "../../actions";
import SearchBar, { SEARCHBAR_HEIGHT } from "./SearchBar";
import SortBar, { SORT_BAR_HEIGHT } from "./SortBar";
import { teamcheColors } from "../../styles/MyStyles";

const APPBAR_HEIGHT = LOCATION_HEIGHT + SEARCHBAR_HEIGHT;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 40 : 0;

class CustomHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
    this.setParish = this.setParish.bind(this);
  }

  setParish(parish) {
    this.props.setSelectedParish(parish);
  }

  handleCenterSearch() {
    this.props.cleanCenters();
    this.props.getCenters(this.props.searches.query);
  }

  render() {
    const {
      getParishes,
      cleanParishes,
      parishes,
      handleSearchTextChange,
      searches,
      getCenters,
      clearSelectedParish,

      setSortQuery,
      cleanSortQuery
    } = this.props;
    return (
      <View
        style={{
          height: APPBAR_HEIGHT + STATUSBAR_HEIGHT + SORT_BAR_HEIGHT + 5,
          paddingTop: STATUSBAR_HEIGHT + 5,
          paddingBottom: 5,
          justifyContent: "flex-end",
          backgroundColor: teamcheColors.purple
        }}
      >
        <Location
          getParishes={getParishes}
          handleCenterSearch={this.handleCenterSearch}
          cleanParishes={cleanParishes}
          setParish={this.setParish}
          setNearByQuery={this.props.setNearByQuery}
          parishes={parishes}
          searches={searches}
          clearSelectedParish={clearSelectedParish}
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
        />
      </View>
    );
  }
}

const msp = ({ parishes, searches }) => ({ parishes, searches });

export default connect(
  msp,
  {
    getParishes,
    cleanCenters,
    setSelectedParish,
    handleSearchTextChange,
    getCenters,
    cleanParishes,
    clearSelectedParish,
    setNearByQuery,

    setSortQuery,
    cleanSortQuery
  }
)(CustomHeader);

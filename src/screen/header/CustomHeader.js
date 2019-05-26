import React from "react";
import { View, Platform, Alert } from "react-native";
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
    this.setParish = this.setParish.bind(this);
  }

  // componentDidMount() {
  //   console.log("==================");
  //   console.log("this.props", this.props);
  //   console.log("==================");
  // }

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
      removeRasteFromQuery,

      setSortQuery,
      cleanSortQuery
    } = this.props;
    return (
      <View
        style={{
          height: APPBAR_HEIGHT + STATUSBAR_HEIGHT + SORT_BAR_HEIGHT + 15,
          paddingTop: STATUSBAR_HEIGHT + 15,
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
          navigate={this.props.navigation.navigate}
          removeRasteFromQuery={removeRasteFromQuery}
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
    removeRasteFromQuery,

    setSortQuery,
    cleanSortQuery
  }
)(CustomHeader);

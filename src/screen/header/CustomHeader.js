import React from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import { teamcheColors } from "../../styles/MyStyles";
import Location, { LOCATION_HEIGHT } from "./Location";

import { getParishes, cleanCenters, setSelectedParish } from "../../actions";
import SearchBar, { SEARCHBAR_HEIGHT } from "./SearchBar";
import SortBar, { SORT_BAR_HEIGHT } from "./SortBar";

const APPBAR_HEIGHT = LOCATION_HEIGHT + SEARCHBAR_HEIGHT;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

class CustomHeader extends React.PureComponent {
  render() {
    const { getParishes, cleanParishes, setSelectedParish, parishes } = this.props;
    return (
      <View
        style={{
          height: APPBAR_HEIGHT + STATUSBAR_HEIGHT + SORT_BAR_HEIGHT + 2,
          marginTop: STATUSBAR_HEIGHT,
          justifyContent: "flex-end"
        }}
      >
        <Location
          getParishes={getParishes}
          cleanParishes={cleanParishes}
          setSelectedParish={setSelectedParish}
          parishes={parishes}
        />
        <SearchBar />
        <SortBar />
      </View>
    );
  }
}

const msp = ({ parishes }) => ({ parishes });

export default connect(
  msp,
  { getParishes, cleanCenters, setSelectedParish }
)(CustomHeader);

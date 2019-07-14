import React from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Placeholder, { Line, Media, ImageContent } from "rn-placeholder";

import {
  getCenters,
  cleanCenters,
  increaseQueryPage,
  setCenter,
  setNearByQuery
} from "../actions";

import { teamcheColors } from "../styles/MyStyles";
import Job from "./Job";
import IconNearBy from "./utils/IconNearBy";
import { CUSTOM_HEADER_HEIGHT } from "../screen/header/CustomHeader";

// TODO most be create a good rn-placeholder ==================
const DEFAULT_HEIGHT = 49;
const COMPACT_HEIGHT = 29;

const TAB_BAR_HEIGHT = Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT;

const REAL_HEIGHT = TAB_BAR_HEIGHT + CUSTOM_HEADER_HEIGHT;

class ListJobsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
    this.continueGetCenter = this.continueGetCenter.bind(this);
  }

  componentDidMount() {
    this.handleCenterSearch();
  }

  async handleCenterSearch() {
    await this.props.cleanCenters();
    this.props.getCenters(this.props.searches.query);
  }

  async continueGetCenter() {
    if (this.props.searches.reachEnd) {
      return;
    } else {
      await this.props.increaseQueryPage();
      this.props.getCenters(this.props.searches.query);
    }
  }

  renderPlaceholder() {
    const { centerLoading } = this.props.centers;
    return (
      <Placeholder
        isReady={!centerLoading}
        animation="fade"
        renderLeft={() => <Media />}
      >
        <Line width="70%" />
        <Line />
        <Line />
        <Line width="30%" />
      </Placeholder>
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 0.5,
          width: "80%",
          backgroundColor: teamcheColors.dark,
          marginLeft: "20%"
        }}
      />
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          minHeight: Dimensions.get("window").height - REAL_HEIGHT - 54
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={teamcheColors.purple}
        />
        <FlatList
          style={{ backgroundColor: teamcheColors.lightGray }}
          data={this.props.centers.centers}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Job
              item={item}
              path="Details"
              navigate={this.props.navigation.navigate}
              setCenter={this.props.setCenter}
            />
          )}
          refreshing={this.props.centers.centerLoading}
          onRefresh={this.handleCenterSearch}
          onEndReached={this.continueGetCenter}
          progressViewOffset={250}
        />
        {this.renderPlaceholder()}
        <IconNearBy
          handleCenterSearch={this.handleCenterSearch}
          searches={this.props.searches}
          setNearByQuery={this.props.setNearByQuery}
        />
      </SafeAreaView>
    );
  }
}

const msp = ({ auth, centers, searches }) => ({ auth, centers, searches });

export default connect(
  msp,
  { getCenters, cleanCenters, increaseQueryPage, setCenter, setNearByQuery }
)(ListJobsScreen);

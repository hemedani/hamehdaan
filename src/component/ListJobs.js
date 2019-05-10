import React from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";

import { getCenters, cleanCenters } from "../actions";

import { teamcheColors } from "../styles/MyStyles";
import Job from "./Job";

class ListJobsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
  }

  componentDidMount() {
    this.props.cleanCenters();
    this.props.getCenters({ etehadiye: this.props.auth.user.officerEt });
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 0.3,
          width: "80%",
          backgroundColor: teamcheColors.dark,
          marginLeft: "20%"
        }}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={{ backgroundColor: teamcheColors.lightGray }}
        data={this.props.centers.centers}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Job item={item} path="Details" navigate={this.props.navigation.navigate} />}
      />
    );
  }
}

const msp = ({ auth, centers }) => ({ auth, centers });

export default connect(
  msp,
  { getCenters, cleanCenters }
)(ListJobsScreen);

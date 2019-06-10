import React from "react";
import { connect } from "react-redux";
import { View, FlatList } from "react-native";

import { getReports } from "../actions";
import { teamcheColors } from "../styles/MyStyles";
import Report from "./Report";

class CenterReports extends React.PureComponent {
  static navigationOptions = {
    title: "گزارش های صنف"
  };
  componentDidMount() {
    const _id = this.props.navigation.getParam("_id", null);
    this.props.getReports({ center: _id });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          style={{ backgroundColor: teamcheColors.lightGray, width: "100%" }}
          data={this.props.reports.reports}
          keyExtractor={item => item._id}
          refreshing={this.props.reports.getReportsLoading}
          renderItem={({ item, index }) => <Report item={item} index={index} navigate={this.props.navigation.navigate} />}
        />
      </View>
    );
  }
}
const msp = ({ reports }) => ({ reports });
export default connect(
  msp,
  { getReports }
)(CenterReports);

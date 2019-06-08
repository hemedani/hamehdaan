import React from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, FlatList } from "react-native";

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
          renderItem={({ item, index }) => <Report item={item} index={index} navigate={this.props.navigation.navigate} />}
        />
        {this.props.reports.getReportsLoading && (
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: teamcheColors.lightPink,
              borderRadius: 40,
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size="small" color={teamcheColors.purple} />
          </View>
        )}
      </View>
    );
  }
}
const msp = ({ reports }) => ({ reports });
export default connect(
  msp,
  { getReports }
)(CenterReports);

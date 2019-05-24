import React from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, Text } from "react-native";

import { getReportById } from "../../actions";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { detailsStyles } from "../Details";
import { Divider } from "react-native-elements";

class DetailReportModal extends React.PureComponent {
  componentDidMount() {
    const _id = this.props.navigation.getParam("_id", "");
    this.props.getReportById(_id);
  }

  render() {
    const { selectedReport, getReportsLoading } = this.props.reports;
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={[detailsStyles.nameContainer, { marginTop: 5 }]}>
          <View style={detailsStyles.nameContainerTitr}>
            <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr]}>اطلاعات گزارش</Text>
            <Divider />
          </View>
          {getReportsLoading && (
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: teamcheColors.purple,
                borderRadius: 40,
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <ActivityIndicator size="small" color={teamcheColors.lightPink} />
            </View>
          )}
          {selectedReport.creator && selectedReport.creator.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>
                نام بازرس : {selectedReport.creator.name} {selectedReport.creator.familyName}
              </Text>
            </View>
          )}
          {selectedReport.center && selectedReport.center.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>نام صنف : {selectedReport.center.name}</Text>
            </View>
          )}
          {selectedReport.raste && selectedReport.raste.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>رسته : {selectedReport.raste.name}</Text>
            </View>
          )}
          {selectedReport.etehadiye && selectedReport.etehadiye.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>اتحادیه : {selectedReport.etehadiye.name}</Text>
            </View>
          )}
          {selectedReport.otaghAsnaf && selectedReport.otaghAsnaf.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>اتاق اصناف : {selectedReport.otaghAsnaf.name}</Text>
            </View>
          )}
          {selectedReport.otaghBazargani && selectedReport.otaghBazargani.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>اتاق بازرگانی : {selectedReport.otaghBazargani.name}</Text>
            </View>
          )}

          {selectedReport.state && selectedReport.state.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>نام استان صنف : {selectedReport.state.name}</Text>
            </View>
          )}
          {selectedReport.city && selectedReport.city.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>نام شهر صنف : {selectedReport.city.name}</Text>
            </View>
          )}
          {selectedReport.parish && selectedReport.parish.name && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>نام محله صنف : {selectedReport.parish.name}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const msp = ({ reports }) => ({ reports });
export default connect(
  msp,
  { getReportById }
)(DetailReportModal);

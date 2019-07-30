import React from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";

import { getReportById } from "../../actions";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { detailsStyles } from "../Details";
import moment from "moment-jalaali";
import BaseModalNavigation from "./BaseModalNavigation";

// TODO check isOwnerPresent is presented not falser to show in detail ==================
class DetailReportModal extends React.PureComponent {
  componentDidMount() {
    const _id = this.props.navigation.getParam("_id", "");
    this.props.getReportById(_id);
  }

  render() {
    const { selectedReport, getReportsLoading } = this.props.reports;
    const {
      fileNumber,
      clause,
      isOwnerPresent,
      numberOfEmployee,
      bossEtProve,
      officersEtCommissionProve,
      officerEtProve,
      secondOfficerEtProve
    } = selectedReport;
    return (
      <BaseModalNavigation headerTxt="جزئیات بازرسی" goBack={this.props.navigation.goBack}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
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
          {selectedReport.subject && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>موضوع بازرسی : {selectedReport.subject}</Text>
            </View>
          )}
          {selectedReport.text && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>متن بازرسی : {selectedReport.text}</Text>
            </View>
          )}
          {fileNumber && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>شماره پرونده : {fileNumber}</Text>
            </View>
          )}
          {clause && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>اخطار ماده : {clause}</Text>
            </View>
          )}
          {isOwnerPresent !== null && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>
                در زمان بازرسی متقاضی حضور {isOwnerPresent ? "داشته" : "نداشته"} است
              </Text>
            </View>
          )}
          {numberOfEmployee && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>تعداد کارمندان : {numberOfEmployee} نفر</Text>
            </View>
          )}

          <View style={detailsStyles.addressContainer}>
            <Text style={teamcheStyle.textBase}>
              بازرسی در حال حاضر مورد تایید رئیس اتحادیه قرار {bossEtProve ? "گرفته" : "نگرفته"} است
            </Text>
          </View>
          <View style={detailsStyles.addressContainer}>
            <Text style={teamcheStyle.textBase}>
              بازرسی در حال حاضر مورد تایید کمیسیون بازرسی قرار {officersEtCommissionProve ? "گرفته" : "نگرفته"} است
            </Text>
          </View>
          <View style={detailsStyles.addressContainer}>
            <Text style={teamcheStyle.textBase}>
              بازرسی در حال حاضر مورد تایید خود بازرس {officerEtProve ? "گرفته" : "نگرفته"} است
            </Text>
          </View>
          <View style={detailsStyles.addressContainer}>
            <Text style={teamcheStyle.textBase}>
              بازرسی در حال حاضر مورد تایید بازرس دوم قرار {secondOfficerEtProve ? "گرفته" : "نگرفته"} است
            </Text>
          </View>

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
          {selectedReport.createdAt && (
            <View style={detailsStyles.addressContainer}>
              <Text style={teamcheStyle.textBase}>
                تاریخ ثبت : {moment(selectedReport.createdAt).format("jYYYY/jM/jD -- HH:mm")}
              </Text>
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
        </ScrollView>
      </BaseModalNavigation>
    );
  }
}
const msp = ({ reports }) => ({ reports });
export default connect(
  msp,
  { getReportById }
)(DetailReportModal);

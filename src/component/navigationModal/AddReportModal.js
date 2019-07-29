import React from "react";
import { TextInput, View, StyleSheet, Switch, Text } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

import { showMessage } from "react-native-flash-message";

import { addReport } from "../../actions";

import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { ADD_REPORT } from "../../actions/report/ReportTypes";
import BaseModalNavigation from "./BaseModalNavigation";

// TODO must be reCreate this class maybe use react hook and function component ==================
class AddReportModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      subject: "",
      numberOfEmployee: "",
      isOwnerPresent: false,
      clause: "",
      fileNumber: ""
    };
    this.handleInpText = this.handleInpText.bind(this);
    this.handleSubmitReport = this.handleSubmitReport.bind(this);
  }
  handleInpText(value, fieldName) {
    this.setState({ [fieldName]: value });
  }
  handleSubmitReport() {
    const { center } = this.props.center;
    const { text, subject, numberOfEmployee, isOwnerPresent, clause, fileNumber } = this.state;
    const reportDetail = {
      text,
      subject,
      numberOfEmployee,
      isOwnerPresent,
      clause,
      fileNumber,
      raste: center.raste._id ? center.raste._id : center.raste,
      etehadiye: center.etehadiye._id ? center.etehadiye._id : center.etehadiye,
      otaghAsnaf: center.otaghAsnaf._id ? center.otaghAsnaf._id : center.otaghAsnaf,
      otaghBazargani: center.otaghBazargani._id ? center.otaghBazargani._id : center.otaghBazargani,
      state: center.state._id ? center.state._id : center.state,
      city: center.city._id ? center.city._id : center.city,
      parish: center.parish._id ? center.parish._id : center.parish,
      center: center._id
    };
    this.props.addReport(reportDetail).then(resp => {
      if (resp.type === ADD_REPORT) {
        this.setState({ text: "" });
        showMessage({
          message: "ثبت بازرسی",
          description: "بازرسی با موفقیت ثبت شد",
          type: "success",
          backgroundColor: teamcheColors.seaFoam,
          color: teamcheColors.lightPink,
          icon: "success"
        });
        this.props.navigation.goBack();
      }
    });
  }
  render() {
    const { reports } = this.props;
    const { text, subject, isOwnerPresent, numberOfEmployee, fileNumber, clause } = this.state;
    const { handleSubmitReport, handleInpText } = this;
    return (
      <BaseModalNavigation headerTxt="ثبت بازرسی" goBack={this.props.navigation.goBack}>
        <View style={reportStyle.container}>
          <TextInput
            style={[teamcheStyle.textBase, reportStyle.inp]}
            placeholder="موضوع بازرسی "
            onChangeText={value => handleInpText(value, "subject")}
            value={subject}
          />
          <TextInput
            style={[teamcheStyle.textBase, reportStyle.inp]}
            placeholder="شماره پرونده"
            keyboardType="numeric"
            onChangeText={value => handleInpText(value, "fileNumber")}
            value={fileNumber}
            onSubmitEditing={handleSubmitReport}
          />
          <TextInput
            multiline
            numberOfLines={5}
            style={[teamcheStyle.textBase, reportStyle.textInp]}
            placeholder="لطفاْ توضیخات بازرسی را یادداشت کنید ..."
            onChangeText={value => handleInpText(value, "text")}
            value={text}
            onSubmitEditing={handleSubmitReport}
          />
          <TextInput
            style={[teamcheStyle.textBase, reportStyle.inp]}
            placeholder="تعداد کارکنان ..."
            keyboardType="numeric"
            onChangeText={value => handleInpText(value, "numberOfEmployee")}
            value={numberOfEmployee}
            onSubmitEditing={handleSubmitReport}
          />
          <TextInput
            style={[teamcheStyle.textBase, reportStyle.inp]}
            placeholder="ماده ۲۶، ۲۷ یا ۲۸"
            keyboardType="numeric"
            onChangeText={value => handleInpText(value, "clause")}
            value={clause}
            onSubmitEditing={handleSubmitReport}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 10 }}
          >
            <Text style={teamcheStyle.textBase}>در زمان بازرسی متقاضی حضور داشت ؟</Text>
            <Switch onChange={() => this.setState({ isOwnerPresent: !isOwnerPresent })} value={isOwnerPresent} />
          </View>
          <Button
            buttonStyle={{
              borderWidth: 1,
              borderColor: "#fff",
              // borderRadius: 50,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "rgb(112, 26, 146)"
            }}
            titleStyle={{
              fontFamily: "Shabnam-FD"
            }}
            onPress={handleSubmitReport}
            loading={reports.addReportLoading}
            title="ثبت بازرسی"
          />
        </View>
      </BaseModalNavigation>
    );
  }
}
const reportStyle = StyleSheet.create({
  container: { minHeight: 200, backgroundColor: "#fff", padding: 10 },
  textInp: {
    backgroundColor: teamcheColors.lightGray,
    minHeight: 120,
    marginBottom: 15,
    padding: 15,
    textAlign: "right"
  },
  inp: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: teamcheColors.lightGray,
    textAlign: "right"
  }
});

const msp = ({ center, reports }) => ({ center, reports });

export default connect(
  msp,
  { addReport }
)(AddReportModal);

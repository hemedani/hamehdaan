import React from "react";
import { View, ScrollView, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { FormGenerator } from "react-reactive-form";

import { addReport } from "../../actions";

import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { ADD_REPORT } from "../../actions/report/ReportTypes";
import BaseModalNavigation from "./BaseModalNavigation";
import { formStyles } from "./AddCenterModal";
import MyInput, { MySwitch, myInputStyles } from "../utils/MyInput";

const fieldConfig = {
  controls: {
    subject: {
      render: MyInput,
      meta: { label: "موضوع بازرسی" }
    },
    text: {
      render: MyInput,
      meta: { label: "توضیخات بازرسی ", multiline: true, numberOfLines: 5 }
    },
    fileNumber: {
      render: MyInput,
      meta: { label: "شماره پرونده", keyboardType: "number-pad" }
    },
    numberOfEmployee: {
      render: MyInput,
      meta: { label: "تعداد کارکنان ...", keyboardType: "number-pad" }
    },

    clause: {
      render: MyInput,
      meta: { label: "ماده ۲۶، ۲۷ یا ۲۸", keyboardType: "number-pad" }
    }
    // isOwnerPresent: {
    //   render: MySwitch,
    //   meta: { label: "در زمان بازرسی متقاضی حضور داشت ؟" }
    // }
  }
};

// TODO must be reCreate this class maybe use react hook and function component ==================
class AddReportModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOwnerPresent: false
    };
    this.handleSubmitReport = this.handleSubmitReport.bind(this);
    this.setForm = this.setForm.bind(this);
  }
  setForm(form) {
    this.upForm = form;
  }
  handleSubmitReport() {
    const { center } = this.props.center;
    const { isOwnerPresent } = this.state;
    const reportDetail = {
      ...this.upForm.value,
      isOwnerPresent,
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
    const { handleSubmitReport } = this;
    return (
      <BaseModalNavigation headerTxt="ثبت بازرسی" goBack={this.props.navigation.goBack}>
        <ScrollView style={formStyles.parentContainer}>
          <View style={formStyles.contentWrapper}>
            <View style={formStyles.inputWrapper}>
              <FormGenerator onMount={this.setForm} fieldConfig={fieldConfig} />
              <View style={myInputStyles.switchText}>
                <Text style={teamcheStyle.textBase}>در زمان بازرسی متقاضی حضور داشت ؟</Text>
                <Switch
                  value={this.state.isOwnerPresent}
                  onChange={() => this.setState({ isOwnerPresent: !this.state.isOwnerPresent })}
                />
              </View>
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
        </ScrollView>
      </BaseModalNavigation>
    );
  }
}

const msp = ({ center, reports }) => ({ center, reports });

export default connect(
  msp,
  { addReport }
)(AddReportModal);

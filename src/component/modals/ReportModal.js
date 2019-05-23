import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import BaseModal from "./BaseModal";
import { Button } from "react-native-elements";

// TODO I'm not a big fan of this Toast --react-native-toast-native-- whenever i can must be replaced with another modules ==================
import Toast from "react-native-toast-native";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { ADD_REPORT } from "../../types";

const styles = {
  backgroundColor: teamcheColors.seaFoam,
  width: 300,
  height: Platform.OS === "ios" ? 50 : 100,
  color: teamcheColors.lightPink,
  fontSize: 15,
  borderRadius: 15,
  fontWeight: "bold",
  yOffset: 40
};
class ReportModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleInpText = this.handleInpText.bind(this);
    this.handleSubmitReport = this.handleSubmitReport.bind(this);
  }
  handleInpText(text) {
    this.setState({ text });
  }
  handleSubmitReport() {
    const reportDetail = {
      text: this.state.text,
      raste: this.props.job.raste._id ? this.props.job.raste._id : this.props.job.raste,
      etehadiye: this.props.job.etehadiye._id ? this.props.job.etehadiye._id : this.props.job.etehadiye,
      otaghAsnaf: this.props.job.otaghAsnaf._id ? this.props.job.otaghAsnaf._id : this.props.job.otaghAsnaf,
      otaghBazargani: this.props.job.otaghBazargani._id ? this.props.job.otaghBazargani._id : this.props.job.otaghBazargani,
      state: this.props.job.state._id ? this.props.job.state._id : this.props.job.state,
      city: this.props.job.city._id ? this.props.job.city._id : this.props.job.city,
      parish: this.props.job.parish._id ? this.props.job.parish._id : this.props.job.parish,
      center: this.props.job._id
    };
    this.props.addReport(reportDetail).then(resp => {
      if (resp.type === ADD_REPORT) {
        this.setState({ text: "" });
        Toast.show("بازرسی با موفقیت ثبت شد", Toast.LONG, Toast.TOP, styles);
        this.props.toggleModal();
      }
    });
  }
  render() {
    const { isModalVisible, toggleModal, reports } = this.props;
    const { text } = this.state;
    const { handleSubmitReport, handleInpText } = this;
    return (
      <BaseModal isModalVisible={isModalVisible} header="ثبت بازرسی" toggleModal={toggleModal}>
        <View style={reportStyle.container}>
          <TextInput
            multiline
            numberOfLines={5}
            style={[teamcheStyle.textBase, reportStyle.textInp]}
            placeholder="لطفاْ توضیخات بازرسی را یادداشت کنید ..."
            onChangeText={handleInpText}
            value={text}
            onSubmitEditing={handleSubmitReport}
          />
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
      </BaseModal>
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
  }
});

export default ReportModal;

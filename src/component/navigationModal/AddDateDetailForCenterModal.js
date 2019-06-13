import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";

import BaseModalNavigation from "./BaseModalNavigation";

import { updateProtectedCenter } from "../../actions";
import FlatBtn from "../utils/FlatBtn";
import MyDateInput from "../utils/MyDateInput";

class AddBusinessesDetailForCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      membershipFeeDate: null,
      issueDate: null,
      expirationDate: null,
      ownerBirthDate: null
    };
    this._onSubmit = this._onSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const { membershipFeeDate, issueDate, expirationDate, ownerBirthDate } = this.props.center.center;

    if (membershipFeeDate) this.setState({ membershipFeeDate });
    if (issueDate) this.setState({ issueDate });
    if (expirationDate) this.setState({ expirationDate });
    if (ownerBirthDate) this.setState({ ownerBirthDate });
  }

  async _onSubmit() {
    const { membershipFeeDate, issueDate, expirationDate, ownerBirthDate } = this.state;
    let updateObj = { _id: this.props.center.center._id };
    if (membershipFeeDate) updateObj.membershipFeeDate = membershipFeeDate;
    if (issueDate) updateObj.issueDate = issueDate;
    if (expirationDate) updateObj.expirationDate = expirationDate;
    if (ownerBirthDate) updateObj.ownerBirthDate = ownerBirthDate;
    await this.props.updateProtectedCenter(updateObj);
    this.props.navigation.goBack();
  }

  handleDateChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    const { membershipFeeDate, issueDate, expirationDate, ownerBirthDate } = this.state;
    return (
      <BaseModalNavigation headerTxt="افزودن جزئیات پروانه کسب" goBack={this.props.navigation.goBack}>
        <View>
          <ScrollView style={styles.parentContainer}>
            <View style={styles.contentWrapper}>
              <View style={styles.inputWrapper}>
                <MyDateInput
                  label="تاریخ اتمام حق عضویت"
                  value={membershipFeeDate}
                  onChange={this.handleDateChange}
                  name="membershipFeeDate"
                />
                <MyDateInput
                  label="تاریخ صدور پروانه کسب"
                  value={issueDate}
                  onChange={this.handleDateChange}
                  name="issueDate"
                />
                <MyDateInput
                  label="تاریخ انقضاء پروانه کسب"
                  value={expirationDate}
                  onChange={this.handleDateChange}
                  name="expirationDate"
                />
                <MyDateInput
                  label="تاریخ تولد صاحب پروانه"
                  value={ownerBirthDate}
                  onChange={this.handleDateChange}
                  name="ownerBirthDate"
                  minDate="1300/01/01"
                />
              </View>
              <View style={styles.inputWrapper}>
                <FlatBtn onPress={this._onSubmit} title="بروزرسانی" loading={this.props.center.updateProtectedLoading} />
              </View>
            </View>
          </ScrollView>
        </View>
      </BaseModalNavigation>
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    height: Dimensions.get("screen").height - 200,
    width: "100%"
  },
  contentWrapper: {
    width: "100%",
    padding: 15,
    paddingBottom: 260
  },
  inputWrapper: {
    marginBottom: 10
  }
});

const msp = ({ center }) => ({ center });

export default connect(
  msp,
  { updateProtectedCenter }
)(AddBusinessesDetailForCenterModal);

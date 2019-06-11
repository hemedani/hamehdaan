import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { FormGenerator } from "react-reactive-form";

import BaseModalNavigation from "./BaseModalNavigation";

import { updateProtectedCenter } from "../../actions";
import MyInput from "../utils/MyInput";
import FlatBtn from "../utils/FlatBtn";
import MyDateInput from "../utils/MyDateInput";

const fieldConfig = {
  controls: {
    guildId: {
      render: MyInput,
      meta: { label: "شناسه صنف", keyboardType: "number-pad" }
    },
    name: {
      render: MyInput,
      meta: { label: "نام صنف" }
    },
    discount: {
      render: MyInput,
      meta: { label: "تخفیف صنف", keyboardType: "number-pad" }
    },
    description: {
      render: MyInput,
      meta: { label: "توضیحات صنف" }
    },
    telegram: {
      render: MyInput,
      meta: { label: "تلگرام صنف" }
    },
    instagram: {
      render: MyInput,
      meta: { label: "اینستگرام صنف" }
    },
    email: {
      render: MyInput,
      meta: { label: "ایمیل صنف" }
    },
    website: {
      render: MyInput,
      meta: { label: "وبسایت صنف" }
    },
    personType: {
      render: MyInput,
      meta: { label: "نوع شخص" }
    },
    activityType: {
      render: MyInput,
      meta: { label: "نوع فعالیت" }
    },
    isicCode: {
      render: MyInput,
      meta: { label: "کد آیسیک", keyboardType: "number-pad" }
    },
    postalCode: {
      render: MyInput,
      meta: { label: "کد پستی", keyboardType: "number-pad" }
    },
    guildOwnerName: {
      render: MyInput,
      meta: { label: "نام صاحب پروانه" }
    },
    guildOwnerFamily: {
      render: MyInput,
      meta: { label: "نام خانوادگی صاحب پروانه" }
    },
    identificationCode: {
      render: MyInput,
      meta: { label: "شماره شناسنامه صاحب پروانه", keyboardType: "number-pad" }
    },
    nationalCode: {
      render: MyInput,
      meta: { label: "کد ملی صاحب پروانه", keyboardType: "number-pad" }
    },
    ownerFatherName: {
      render: MyInput,
      meta: { label: "نام پدر صاحب پروانه" }
    },
    waterPlaque: {
      render: MyInput,
      meta: { label: "پلاک آبی", keyboardType: "number-pad" }
    },
    registrationPlaque: {
      render: MyInput,
      meta: { label: "پلاک ثبتی", keyboardType: "number-pad" }
    }
  }
};

class AddDetailForCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      membershipFeeDate: null,
      issueDate: null,
      expirationDate: null,
      ownerBirthDate: null
    };
    this._onSubmit = this._onSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const {
      name,
      discount,
      description,
      telegram,
      instagram,
      email,
      website,
      guildId,
      personType,
      activityType,
      isicCode,
      postalCode,
      guildOwnerName,
      guildOwnerFamily,
      identificationCode,
      nationalCode,
      ownerFatherName,
      waterPlaque,
      registrationPlaque,

      membershipFeeDate,
      issueDate,
      expirationDate,
      ownerBirthDate
    } = this.props.center.center;
    if (name) this.upForm.controls.name.setValue(name.toString());
    if (discount) this.upForm.controls.discount.setValue(discount.toString());
    if (description) this.upForm.controls.description.setValue(description.toString());
    if (telegram) this.upForm.controls.telegram.setValue(telegram.toString());
    if (instagram) this.upForm.controls.instagram.setValue(instagram.toString());
    if (email) this.upForm.controls.email.setValue(email.toString());
    if (website) this.upForm.controls.website.setValue(website.toString());
    if (guildId) this.upForm.controls.guildId.setValue(guildId.toString());
    if (personType) this.upForm.controls.personType.setValue(personType.toString());
    if (activityType) this.upForm.controls.activityType.setValue(activityType.toString());
    if (isicCode) this.upForm.controls.isicCode.setValue(isicCode.toString());
    if (postalCode) this.upForm.controls.postalCode.setValue(postalCode.toString());
    if (guildOwnerName) this.upForm.controls.guildOwnerName.setValue(guildOwnerName.toString());
    if (guildOwnerFamily) this.upForm.controls.guildOwnerFamily.setValue(guildOwnerFamily.toString());
    if (identificationCode) this.upForm.controls.identificationCode.setValue(identificationCode.toString());
    if (nationalCode) this.upForm.controls.nationalCode.setValue(nationalCode.toString());
    if (ownerFatherName) this.upForm.controls.ownerFatherName.setValue(ownerFatherName.toString());
    if (waterPlaque) this.upForm.controls.waterPlaque.setValue(waterPlaque.toString());
    if (registrationPlaque) this.upForm.controls.registrationPlaque.setValue(registrationPlaque.toString());

    if (membershipFeeDate) this.setState({ membershipFeeDate });
    if (issueDate) this.setState({ issueDate });
    if (expirationDate) this.setState({ expirationDate });
    if (ownerBirthDate) this.setState({ ownerBirthDate });
  }

  async _onSubmit() {
    let updateObj = { _id: this.props.center.center._id, ...this.upForm.value };
    const { membershipFeeDate, issueDate, expirationDate, ownerBirthDate } = this.state;
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

  setForm(form) {
    this.upForm = form;
  }

  render() {
    const { membershipFeeDate, issueDate, expirationDate, ownerBirthDate } = this.state;
    return (
      <BaseModalNavigation headerTxt="افزودن جزئیات به صنف" goBack={this.props.navigation.goBack}>
        <View>
          <ScrollView style={styles.parentContainer}>
            <View style={styles.contentWrapper}>
              <View style={styles.inputWrapper}>
                <FormGenerator onMount={this.setForm} fieldConfig={fieldConfig} />
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
)(AddDetailForCenterModal);

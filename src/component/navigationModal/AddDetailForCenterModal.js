import React, { PureComponent } from "react";
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";

import BaseModalNavigation from "./BaseModalNavigation";

import { updateProtectedCenter } from "../../actions";
import MyInput from "../utils/MyInput";
import FlatBtn from "../utils/FlatBtn";
import MyDateInput from "../utils/MyDateInput";

class AddDetailForCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }
  async _onSubmit(values) {
    await this.props.updateProtectedCenter({ ...values, _id: this.props.center.center._id });
    this.props.navigation.goBack();
  }

  render() {
    const {
      name = "",
      discount = "",
      description = "",
      telegram = "",
      instagram = "",
      email = "",
      website = "",

      guildId = "",
      issueDate = null,
      expirationDate = null,
      personType = "",
      activityType = "",
      isicCode = "",
      postalCode = "",

      guildOwnerName = "",
      guildOwnerFamily = "",
      identificationCode = "",
      nationalCode = "",
      ownerFatherName = "",
      ownerBirthDate = null,

      waterPlaque = "",
      registrationPlaque = "",

      membershipFeeDate = null
    } = this.props.center.center;

    return (
      <BaseModalNavigation headerTxt="افزودن جزئیات به صنف" goBack={this.props.navigation.goBack}>
        <KeyboardAvoidingView>
          <ScrollView style={styles.parentContainer}>
            <Formik
              initialValues={{
                name,
                discount,
                description,
                telegram,
                instagram,
                email,
                website,

                guildId,
                issueDate,
                expirationDate,
                personType,
                activityType,
                isicCode,
                postalCode,

                guildOwnerName,
                guildOwnerFamily,
                identificationCode,
                nationalCode,
                ownerFatherName,
                ownerBirthDate,

                waterPlaque,
                registrationPlaque,

                membershipFeeDate
              }}
              onSubmit={this._onSubmit}
              render={({ values, handleSubmit, setFieldValue }) => (
                <View style={styles.contentWrapper}>
                  <View style={styles.inputWrapper}>
                    <MyInput
                      label="شناسه صنف"
                      value={values.guildId}
                      onChange={setFieldValue}
                      name="guildId"
                      keyboardType="number-pad"
                    />
                    <MyInput label="نام صنف" value={values.name} onChange={setFieldValue} name="name" />

                    <MyInput
                      label="تخفیف صنف"
                      value={values.discount}
                      onChange={setFieldValue}
                      name="discount"
                      keyboardType="number-pad"
                    />
                    <MyInput label="توضیحات صنف" value={values.description} onChange={setFieldValue} name="description" />
                    <MyInput
                      label="تلگرام صنف"
                      value={values.telegram}
                      onChange={setFieldValue}
                      name="telegram"
                      keyboardType="email-address"
                    />
                    <MyInput
                      label="اینستگرام صنف"
                      value={values.instagram}
                      onChange={setFieldValue}
                      name="instagram"
                      keyboardType="email-address"
                    />
                    <MyInput
                      label="ایمیل صنف"
                      value={values.email}
                      onChange={setFieldValue}
                      name="email"
                      keyboardType="email-address"
                    />
                    <MyInput
                      label="وبسایت صنف"
                      value={values.website}
                      onChange={setFieldValue}
                      name="website"
                      keyboardType="email-address"
                    />

                    <MyInput label="نوع شخص" value={values.personType} onChange={setFieldValue} name="personType" />
                    <MyInput label="نوع فعالیت" value={values.activityType} onChange={setFieldValue} name="activityType" />
                    <MyInput
                      label="کد آیسیک"
                      value={values.isicCode}
                      onChange={setFieldValue}
                      name="isicCode"
                      keyboardType="number-pad"
                    />
                    <MyInput
                      label="کد پستی"
                      value={values.postalCode}
                      onChange={setFieldValue}
                      name="postalCode"
                      keyboardType="number-pad"
                    />
                    <MyInput
                      label="نام صاحب پروانه"
                      value={values.guildOwnerName}
                      onChange={setFieldValue}
                      name="guildOwnerName"
                    />
                    <MyInput
                      label="نام خانوادگی صاحب پروانه"
                      value={values.guildOwnerFamily}
                      onChange={setFieldValue}
                      name="guildOwnerFamily"
                    />
                    <MyInput
                      label="شماره شناسنامه صاحب پروانه"
                      value={values.identificationCode}
                      onChange={setFieldValue}
                      name="identificationCode"
                      keyboardType="number-pad"
                    />
                    <MyInput
                      label="کد ملی صاحب پروانه  "
                      value={values.nationalCode}
                      onChange={setFieldValue}
                      name="nationalCode"
                      keyboardType="number-pad"
                    />
                    <MyInput
                      label="نام پدر صاحب پروانه"
                      value={values.ownerFatherName}
                      onChange={setFieldValue}
                      name="ownerFatherName"
                    />
                    <MyInput
                      label="پلاک آبی"
                      value={values.waterPlaque}
                      onChange={setFieldValue}
                      name="waterPlaque"
                      keyboardType="number-pad"
                    />
                    <MyInput
                      label="پلاک ثبتی"
                      value={values.registrationPlaque}
                      onChange={setFieldValue}
                      name="registrationPlaque"
                      keyboardType="number-pad"
                    />

                    <MyDateInput
                      label="تاریخ اتمام حق عضویت"
                      value={values.membershipFeeDate}
                      setFieldValue={setFieldValue}
                      name="membershipFeeDate"
                    />
                    <MyDateInput
                      label="تاریخ صدور پروانه کسب"
                      value={values.issueDate}
                      setFieldValue={setFieldValue}
                      name="issueDate"
                    />
                    <MyDateInput
                      label="تاریخ انقضاء پروانه کسب"
                      value={values.expirationDate}
                      setFieldValue={setFieldValue}
                      name="expirationDate"
                    />
                    <MyDateInput
                      label="تاریخ تولد صاحب پروانه"
                      value={values.ownerBirthDate}
                      setFieldValue={setFieldValue}
                      name="ownerBirthDate"
                      minDate="1300/01/01"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <FlatBtn onPress={handleSubmit} title="بروزرسانی" loading={this.props.center.updateProtectedLoading} />
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </KeyboardAvoidingView>
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

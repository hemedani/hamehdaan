import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { FormGenerator } from "react-reactive-form";

import BaseModalNavigation from "./BaseModalNavigation";

import { updateProtectedCenter } from "../../actions";
import MyInput from "../utils/MyInput";
import FlatBtn from "../utils/FlatBtn";

const fieldConfig = {
  controls: {
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
    guildOwnerPhoneNumber: {
      render: MyInput,
      meta: { label: "شماره تلفن همراه", keyboardType: "number-pad" }
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

class AddBusinessesDetailForCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  componentDidMount() {
    const {
      guildOwnerPhoneNumber,
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
      registrationPlaque
    } = this.props.center.center;

    if (guildOwnerPhoneNumber) this.upForm.controls.guildOwnerPhoneNumber.setValue(guildOwnerPhoneNumber.toString());
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
  }

  async _onSubmit() {
    let updateObj = { _id: this.props.center.center._id, ...this.upForm.value };
    await this.props.updateProtectedCenter(updateObj);
    this.props.navigation.goBack();
  }

  setForm(form) {
    this.upForm = form;
  }

  render() {
    return (
      <BaseModalNavigation headerTxt="افزودن جزئیات پروانه کسب" goBack={this.props.navigation.goBack}>
        <View>
          <ScrollView style={styles.parentContainer}>
            <View style={styles.contentWrapper}>
              <View style={styles.inputWrapper}>
                <FormGenerator onMount={this.setForm} fieldConfig={fieldConfig} />
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

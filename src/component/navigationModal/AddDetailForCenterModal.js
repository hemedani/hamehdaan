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
    }
  }
};

class AddDetailForCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  componentDidMount() {
    const { name, discount, description, telegram, instagram, email, website } = this.props.center.center;
    if (name) this.upForm.controls.name.setValue(name.toString());
    if (discount) this.upForm.controls.discount.setValue(discount.toString());
    if (description) this.upForm.controls.description.setValue(description.toString());
    if (telegram) this.upForm.controls.telegram.setValue(telegram.toString());
    if (instagram) this.upForm.controls.instagram.setValue(instagram.toString());
    if (email) this.upForm.controls.email.setValue(email.toString());
    if (website) this.upForm.controls.website.setValue(website.toString());
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
      <BaseModalNavigation headerTxt="افزودن جزئیات به صنف" goBack={this.props.navigation.goBack}>
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
)(AddDetailForCenterModal);

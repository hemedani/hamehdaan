import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet, Dimensions, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import { FormGenerator } from "react-reactive-form";

import BaseModalNavigation from "./BaseModalNavigation";

import { addCenter, submitAddCenterForm, clearAddCenterForm } from "../../actions";
import MyInput from "../utils/MyInput";
import FlatBtn from "../utils/FlatBtn";
import { iconNearByStyles } from "../utils/IconNearBy";
import { Icon } from "react-native-elements";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";

const fieldConfig = {
  controls: {
    name: {
      render: MyInput,
      meta: { label: "نام صنف" }
    },
    personType: {
      render: MyInput,
      meta: { label: "نوع شخص" }
    },
    activityType: {
      render: MyInput,
      meta: { label: "نوع فعالیت" }
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
    ownerFatherName: {
      render: MyInput,
      meta: { label: "نام پدر صاحب پروانه" }
    },
    nationalCode: {
      render: MyInput,
      meta: { label: "کد ملی صاحب پروانه", keyboardType: "number-pad" }
    },
    guildOwnerPhoneNumber: {
      render: MyInput,
      meta: { label: "شماره تلفن همراه", keyboardType: "number-pad" }
    },
    text: {
      render: MyInput,
      meta: { label: "آدرس" }
    }
  }
};

class AddCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      getDirections: false,
      lat: null,
      lng: null
    };
    this._onSubmit = this._onSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
    this._goToSelectRaste = this._goToSelectRaste.bind(this);
    this._goToSelectParish = this._goToSelectParish.bind(this);
    this.findCoordinates = this.findCoordinates.bind(this);
  }

  componentDidMount() {
    this.props.clearAddCenterForm();
    this.findCoordinates();
  }

  findCoordinates() {
    this.setState({ getDirections: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          getDirections: false
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // TODO the submit method is not completed specially error handling section ==================

  async _onSubmit() {
    await this.props.submitAddCenterForm();

    if (this.props.forms.addCenterForm.errors.notAnyErr) {
      const { lat, lng } = this.state;
      const value = {
        ...this.upForm.value,
        raste: this.props.forms.addCenterForm.selectedRaste._id,
        parish: this.props.forms.addCenterForm.selectedParish._id,
        address: {
          parish: this.props.forms.addCenterForm.selectedParish.name,
          text: this.upForm.value.text
        },
        lat,
        lng
      };
      await this.props.addCenter(value);
      this.props.navigation.goBack();
    } else {
      return;
    }
  }
  _goToSelectRaste() {
    this.props.navigation.push("SelectRasteModal", { setAddCenterForm: true });
  }
  _goToSelectParish() {
    this.props.navigation.push("SelectParishModal", { setAddCenterForm: true });
  }

  setForm(form) {
    this.upForm = form;
  }

  render() {
    const {
      centers,
      navigation,
      forms: {
        addCenterForm: { selectedRaste, selectedParish, errors }
      }
    } = this.props;
    return (
      <BaseModalNavigation headerTxt="افزودن صنف و اعمال ماده ۲۷" goBack={navigation.goBack}>
        <View>
          <ScrollView style={styles.parentContainer}>
            <View style={styles.contentWrapper}>
              <View style={styles.inputWrapper}>
                <FormGenerator onMount={this.setForm} fieldConfig={fieldConfig} />
              </View>
              <View style={{ justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", marginBottom: 15 }}>
                <Text style={teamcheStyle.textBase}>
                  {this.state.getDirections ? "در حال دریافت موقعیت شما" : "موقعیت شما دریافت شد"}
                </Text>
                <View
                  style={[
                    iconNearByStyles.circleStyle,
                    {
                      backgroundColor: this.state.getDirections ? teamcheColors.purple : teamcheColors.royal
                    }
                  ]}
                >
                  {this.state.getDirections ? (
                    <ActivityIndicator size="small" color={teamcheColors.lightPink} />
                  ) : (
                    <Icon
                      name="check"
                      type="evilicon"
                      size={30}
                      color={teamcheColors.lightPink}
                      onPress={this.findCoordinates}
                    />
                  )}
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <FlatBtn
                  bgColor={selectedRaste ? teamcheColors.royal : teamcheColors.lightPink}
                  btnColor={selectedRaste ? teamcheColors.lightPink : teamcheColors.royal}
                  borColor={teamcheColors.royal}
                  onPress={this._goToSelectRaste}
                  title={selectedRaste ? selectedRaste.name : "انتخاب رسته"}
                />
                <FlatBtn
                  bgColor={selectedParish ? teamcheColors.royal : teamcheColors.lightPink}
                  btnColor={selectedParish ? teamcheColors.lightPink : teamcheColors.royal}
                  borColor={teamcheColors.royal}
                  onPress={this._goToSelectParish}
                  title={selectedParish ? selectedParish.name : "انتخاب محله"}
                />

                {errors.msg.length > 0 && (
                  <View style={{ marginBottom: 5, marginStart: 5 }}>
                    {errors.msg.map((err, i) => (
                      <Text key={i} style={[teamcheStyle.textBase, { color: teamcheColors.dullRed }]}>
                        {"\u2022" + " " + err}
                      </Text>
                    ))}
                  </View>
                )}
                <FlatBtn onPress={this._onSubmit} title="اضافه کردن صنف" loading={centers.addCenterLoad} />
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

const msp = ({ centers, forms }) => ({ centers, forms });

export default connect(
  msp,
  { addCenter, submitAddCenterForm, clearAddCenterForm }
)(AddCenterModal);

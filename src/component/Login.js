import React from "react";
import {
  View,
  ImageBackground,
  Text,
  AppState,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, Button } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle-rtl";
import moment from "moment";
import { Hideo } from "react-native-textinput-effects-pr";
import CodeInput from "react-native-confirmation-code-field";

import {
  getItem,
  removeItem,
  signWithMob,
  stopAuthTimer,
  setAuthTimerLeft,
  coutDownAuthTimer,
  sendCode
} from "../actions";

import { AUTH_USER } from "../actions/auth/AuthTypes";
import { teamcheColors } from "../styles/MyStyles";

const backImg = require("../img/back.png");
class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      phone: ""
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.onSendPhone = this.onSendPhone.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handlerOnFulfill = this.handlerOnFulfill.bind(this);
    this.clearCode = this.clearCode.bind(this);
  }
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      const { stopAuthTimer, setAuthTimerLeft, coutDownAuthTimer } = this.props;

      const codeTimer = await getItem("acceptCodeTimer");
      if (codeTimer) {
        let authTimerDate = await getItem("AuthTimerDate");
        const authTimer = moment(authTimerDate);
        // Alert.alert("authTimerDate", authTimerDate);
        const diffrence = moment().diff(authTimer, "seconds");

        if (!diffrence || diffrence > 90) {
          await removeItem("acceptCodeTimer");
          await removeItem("authTimerDate");
          stopAuthTimer();
        } else {
          const timesLeft = Math.abs(90 - diffrence);
          setAuthTimerLeft(timesLeft);
          coutDownAuthTimer();
        }
      }
    }
    this.setState({ appState: nextAppState });
  };

  handleText() {
    if (this.props.auth.authTimer > 0 && this.props.auth.user.phone) {
      return (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Shabnam-FD",
            textAlign: "center",
            marginBottom: 15,
            color: teamcheColors.purple
          }}
        >
          شماره شما : {this.props.auth.user.phone}
        </Text>
      );
    } else {
      return null;
    }
  }

  handlePhoneChange(phone) {
    this.setState({ phone });
  }

  onSendPhone() {
    this.props.signWithMob({ phone: this.state.phone });
  }

  field = React.createRef();

  clearCode() {
    const { current } = this.field;

    if (current) {
      current.clear();
      current.focus();
    }
  }
  async handlerOnFulfill(code) {
    // Alert.alert("code", code);
    const sended = await this.props.sendCode({
      phone: this.props.auth.user.phone,
      code
    });

    if (sended.type === AUTH_USER) {
      this.props.navigation.navigate("App");
    } else {
      this.clearCode();
    }
  }

  render() {
    return (
      <ImageBackground
        source={backImg}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAvoidingView
          style={{ flex: 3, justifyContent: "center" }}
          behavior="padding"
          enabled
        >
          <Card
            title="ورود"
            containerStyle={{
              borderColor: "rgb(255, 255, 255)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              minHeight: 200
            }}
            dividerStyle={{
              backgroundColor: teamcheColors.purple
            }}
            titleStyle={{
              fontSize: 16,
              fontFamily: "Shabnam-Bold-FD",
              color: teamcheColors.purple
              // textShadowOffset: { width: 2, height: 2 },
              // textShadowColor: "#fff",
              // textShadowRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Shabnam-FD",
                direction: "rtl",
                textAlign: "center",
                marginBottom: 15,
                color: teamcheColors.purple
                // textShadowOffset: { width: 2, height: 2 },
                // textShadowColor: "#fff",
                // textShadowRadius: 10
              }}
            >
              {this.props.auth.authMsg}
            </Text>
            {this.handleText()}
            {this.props.auth.authTimer > 0 ? (
              <View>
                <CodeInput
                  ref={this.field}
                  autoFocus
                  onFulfill={this.handlerOnFulfill}
                  codeLength={4}
                  keyboardType="numeric"
                />
                <View style={{ marginTop: 52, alignItems: "center" }}>
                  <ProgressCircle
                    percent={(this.props.auth.authTimer * 100) / 90}
                    radius={50}
                    borderWidth={5}
                    color="#3399FF"
                    shadowColor="rgba(255, 110, 124, 1)"
                    bgColor="rgba(255, 255, 255, 0.9)"
                  >
                    <Text style={{ fontSize: 12, fontFamily: "Shabnam-FD" }}>
                      {this.props.auth.authTimer} ثانیه
                    </Text>
                  </ProgressCircle>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ height: 55 }}>
                  <Hideo
                    iconClass={Icon}
                    iconName={"phone"}
                    iconColor={"white"}
                    // this is used as backgroundColor of icon container view.
                    inputStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontFamily: "Shabnam-FD",
                      // borderTopRightRadius: 20,
                      // borderBottomRightRadius: 20,
                      borderWidth: 0.5,
                      borderStartWidth: 0,
                      borderColor: teamcheColors.purple
                    }}
                    labelStyle={{
                      backgroundColor: teamcheColors.purple
                      // borderTopLeftRadius: 20,
                      // borderBottomLeftRadius: 20,
                      // borderWidth: 1,
                      // borderColor: "#fff"
                    }}
                    name="phone"
                    placeholder="شماره تلفن"
                    value={this.state.phone}
                    onChangeText={this.handlePhoneChange}
                    keyboardType={"phone-pad"}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <Button
                  // containerStyle={{
                  //   width: "95%",
                  //   marginTop: 5,
                  //   marginLeft: 10
                  // }}
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    // borderRadius: 50,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    backgroundColor: teamcheColors.purple
                  }}
                  titleStyle={{
                    fontFamily: "Shabnam-FD"
                  }}
                  onPress={this.onSendPhone}
                  loading={this.props.auth.loginLoading}
                  title="ورود"
                />
              </View>
            )}
          </Card>
        </KeyboardAvoidingView>

        {/* {this.props.auth.authTimer > 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

          </View>
        )} */}
      </ImageBackground>
    );
  }
}

const msp = ({ auth }) => ({ auth });

export default connect(
  msp,
  { signWithMob, stopAuthTimer, setAuthTimerLeft, coutDownAuthTimer, sendCode }
)(LoginScreen);

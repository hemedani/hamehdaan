import React from "react";
import { View, ImageBackground, Text, AppState, Alert } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, Button } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";
import moment from "moment";
import { Hideo } from "react-native-textinput-effects-pr";
import CodeInput from "react-native-confirmation-code-field";

import { getItem, removeItem, signWithMob, stopAuthTimer, setAuthTimerLeft, coutDownAuthTimer, sendCode } from "../actions";

import { AUTH_USER } from "../types";

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
  }
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
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
            fontFamily: "Shabnam-Bold-FD",
            textAlign: "center",
            marginBottom: 5,
            color: "rgb(112, 26, 146)",
            textShadowOffset: { width: 2, height: 2 },
            textShadowColor: "#fff",
            textShadowRadius: 10
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
  async handlerOnFulfill(code) {
    // Alert.alert("code", code);
    const sended = await this.props.sendCode({ phone: this.props.auth.user.phone, code });
    console.log("==================");
    console.log("sended from handlerOnFulfill", sended);
    console.log("==================");

    if (sended.type === AUTH_USER) {
      this.props.navigation.navigate("App");
    }
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ width: "100%", height: "100%" }}>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Card
            title="ورود"
            containerStyle={{
              borderWidth: 2,
              borderColor: "#fff",
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              minHeight: 200
            }}
            dividerStyle={{
              borderColor: "rgb(255, 255, 255)",
              borderWidth: 1
            }}
            titleStyle={{
              fontSize: 16,
              fontFamily: "Shabnam-Bold-FD",
              color: "rgb(112, 26, 146)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowColor: "#fff",
              textShadowRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Shabnam-Bold-FD",
                direction: "rtl",
                textAlign: "center",
                marginBottom: 5,
                color: "rgb(112, 26, 146)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowColor: "#fff",
                textShadowRadius: 10
              }}
            >
              {this.props.auth.authMsg}
            </Text>
            {this.handleText()}
            {this.props.auth.authTimer > 0 ? (
              <View>
                <CodeInput autoFocus onFulfill={this.handlerOnFulfill} codeLength={4} keyboardType="numeric" />
                <View style={{ marginTop: 52, alignItems: "center" }}>
                  <ProgressCircle
                    percent={(this.props.auth.authTimer * 100) / 90}
                    radius={50}
                    borderWidth={5}
                    color="#3399FF"
                    shadowColor="rgba(255, 110, 124, 1)"
                    bgColor="rgba(255, 255, 255, 0.9)"
                  >
                    <Text style={{ fontSize: 12, fontFamily: "Shabnam-FD" }}>{this.props.auth.authTimer} ثانیه</Text>
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
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      borderWidth: 2,
                      borderLeftWidth: 0,
                      borderColor: "#fff"
                    }}
                    labelStyle={{
                      backgroundColor: "rgb(112, 26, 146)",
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderWidth: 2,
                      borderColor: "#fff"
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
                  containerStyle={{
                    width: "95%",
                    marginTop: 5,
                    marginLeft: 10
                  }}
                  buttonStyle={{
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 50,
                    backgroundColor: "rgb(112, 26, 146)"
                  }}
                  titleStyle={{
                    fontFamily: "Shabnam-FD"
                  }}
                  onPress={this.onSendPhone}
                  raised
                  title="ورود"
                />
              </View>
            )}
          </Card>
        </View>

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

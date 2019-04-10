import React from "react";
import { View, Text, ImageBackground, Image, Alert } from "react-native";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import LottieView from "lottie-react-native";
import {
  getToken,
  getItem,
  removeItem,
  getStoreUser,
  getOwn,
  coutDownAuthTimer,
  stopAuthTimer,
  setAuthTimerLeft,
  setCacheUser
} from "../actions/index";
import moment from "moment";

const backImg = require("../img/back-02.jpg");
const hamedanLogo = require("../img/hamedan-logo.png");
const sailsAnimation = require("../img/animations/sails.json");
// const happyDostAnimation = require("../img/animations/happy-dots.json");
// const LiquiedLogo = require("../img/animations/liquid-logo-animation.json");
// const isometricMall = require("../img/animations/isometric-mall.json");
// const yAnimate = require("../img/animations/bienvenida-boceto.json");
// const fishAnimation = require("../img/animations/fish-animation.json");

class WelcomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  async componentDidMount() {
    // Alert.alert("auth", JSON.stringify(this.props.auth, null, 2));
    const { navigation, getOwn, stopAuthTimer, setAuthTimerLeft, coutDownAuthTimer, setCacheUser } = this.props;
    this.timer = path => setTimeout(() => navigation.navigate(path), 150);
    const token = await getToken();
    // Alert.alert("token", JSON.stringify(token, null, 2));
    if (token) {
      getOwn().then(() => this.timer("App"));
    } else {
      const codeTimer = await getItem("acceptCodeTimer");
      if (codeTimer) {
        let authTimerDate = await getItem("AuthTimerDate");
        const authTimer = moment(authTimerDate);
        const diffrence = moment().diff(authTimer, "seconds");
        if (!diffrence || diffrence > 90) {
          await removeItem("acceptCodeTimer");
          await removeItem("authTimerDate");
          stopAuthTimer();
        } else {
          setCacheUser();
          const timesLeft = Math.abs(90 - diffrence);
          setAuthTimerLeft(timesLeft);
          coutDownAuthTimer();
        }
      }
      this.timer("Auth");
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ width: "100%", height: "100%" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Card
            title="خوش آمدید"
            containerStyle={{
              borderWidth: 2,
              borderColor: "#fff",
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 1)"
            }}
            dividerStyle={{
              borderColor: "rgb(255, 255, 255)",
              borderWidth: 1
            }}
            titleStyle={{
              fontFamily: "Shabnam-FD",
              color: "rgb(112, 26, 146)"
            }}
          >
            <View style={{ height: 200 }}>
              <LottieView source={sailsAnimation} autoPlay loop />
            </View>
            <Text style={{ fontFamily: "Shabnam-FD", alignSelf: "center", textAlign: "center" }}>
              به جامع ترین نرم افزار کسب و کار همدان خوش آمدید
            </Text>
          </Card>
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 5
          }}
        >
          <Image source={hamedanLogo} style={{ width: 90, height: 110, position: "absolute", bottom: 0 }} />
        </View>
      </ImageBackground>
    );
  }
}

const msp = ({ auth }) => ({ auth });

export default connect(
  msp,
  { getOwn, coutDownAuthTimer, stopAuthTimer, setAuthTimerLeft, setCacheUser }
)(WelcomeScreen);

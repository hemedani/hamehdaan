import React from "react";
import { View, ImageBackground, Image, Dimensions } from "react-native";
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
} from "../actions";
import moment from "moment";

const backImg = require("../img/back-02.jpg");
const hamedanLogo = require("../img/hamedan-logo.png");
const wordLocation = require("../img/animations/world-animation2.json");

class WelcomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    // this.state = {
    //   progress: new Animated.Value(0)
    // };
  }
  async componentDidMount() {
    // Alert.alert("auth", JSON.stringify(this.props.auth, null, 2));

    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 5000,
    //   easing: Easing.linear
    // }).start();

    const {
      navigation,
      getOwn,
      stopAuthTimer,
      setAuthTimerLeft,
      coutDownAuthTimer,
      setCacheUser
    } = this.props;
    this.timer = path => setTimeout(() => navigation.navigate(path), 1950);
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
      <ImageBackground
        source={backImg}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <Card
            title="خوش آمدید"
            containerStyle={{
              borderWidth: 2,
              borderColor: "#fff",
              borderWidth: 0,
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 0)"
            }}
            dividerStyle={{
              borderColor: "rgb(255, 255, 255)",
              borderWidth: 1
            }}
            titleStyle={{
              fontFamily: "Shabnam-FD",
              color: "rgb(112, 26, 146)"
            }}
          > */}
          {/* <View style={{ width: Dimensions.get("window").width - 200, height: Dimensions.get("window").height - 200 }}> */}
          <LottieView
            style={{ width: 400, height: 400 }}
            source={wordLocation}
            autoPlay
            loop
            // progress={this.state.progress}
          />
          {/* </View> */}
          {/* <Text style={{ fontFamily: "Shabnam-FD", alignSelf: "center", textAlign: "center" }}>
              به جامع ترین نرم افزار کسب و کار همدان خوش آمدید
            </Text>
          </Card> */}
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 5
          }}
        >
          <Image
            source={hamedanLogo}
            style={{ width: 90, height: 110, position: "absolute", bottom: 0 }}
          />
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

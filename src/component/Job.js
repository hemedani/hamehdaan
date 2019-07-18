import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import moment from "moment-jalaali";
import { teamcheColors } from "../styles/MyStyles";
import { RU } from "../actions/RootTypes";
import calcStatusWithDate from "./jobParts/CalcStatusWithDate";
import RenderAlert from "./jobParts/RenderAlert";

export default ({ item, path, navigate, setCenter }) => {
  // const handleOnPress = () => navigate(path, { job: item });
  const handleOnPress = async () => {
    await setCenter(item);
    return navigate(path);
  };
  const isShowAlert = item => {
    let isShow = false;
    const renderDiff = (itemTime, validDate) => {
      const diff = moment().diff(moment(itemTime), "days");
      if (diff > validDate) isShow = true;
    };
    if (item.membershipFeeDate) renderDiff(item.membershipFeeDate, 365);
    if (item.guildStatus === "warning27" && item.warning27Date) renderDiff(item.warning27Date, 2);
    return isShow;
  };
  pressAlertFunc = () => {
    navigate("DetailAlertModal", { item });
  };

  return (
    <TouchableOpacity style={styles.touchableOpacityContainer} onPress={handleOnPress}>
      <Image
        style={{ width: 50, height: 50, flex: 2, borderRadius: 5 }}
        source={{
          uri: `${RU}/pic/240/${item.pics.length > 0 ? item.pics[0] : item.etPic}`
        }}
      />
      <View style={{ flex: 8, padding: 5, paddingLeft: 10 }}>
        <Text
          style={{
            marginBottom: 5,
            writingDirection: "rtl",
            fontFamily: "Shabnam-FD",
            fontSize: 18,
            color: "rgb(0, 0, 0)"
          }}
        >
          {item.name}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {item.expirationDate && (
            <View
              style={{
                backgroundColor: teamcheColors.purple,
                marginBottom: 2,
                color: "white",
                padding: 5,
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  writingDirection: "rtl",
                  fontFamily: "Shabnam-Light-FD",
                  fontSize: 10,
                  color: "white"
                }}
              >
                تاریخ انقضاء : {moment(item.expirationDate).format("jYYYY/jM/jD")}
              </Text>
            </View>
          )}
          {item.membershipFeeDate && (
            <View
              style={{
                backgroundColor: teamcheColors.royal,
                marginBottom: 2,
                marginLeft: 10,
                color: "white",
                padding: 5,
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  writingDirection: "rtl",
                  fontFamily: "Shabnam-Light-FD",
                  fontSize: 10,
                  color: "white"
                }}
              >
                حق عضویت : {moment(item.membershipFeeDate).format("jYYYY/jM/jD")}
              </Text>
            </View>
          )}

          <View
            style={{
              backgroundColor: teamcheColors.cornFlowerBlue,
              marginBottom: 2,
              marginLeft: 10,
              color: "white",
              padding: 5,
              borderRadius: 4
            }}
          >
            <Text
              style={{
                writingDirection: "rtl",
                fontFamily: "Shabnam-Light-FD",
                fontSize: 10,
                color: "white"
              }}
            >
              وضعیت : {calcStatusWithDate(item)}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginBottom: 10,
            writingDirection: "rtl",
            fontFamily: "Shabnam-Light-FD",
            fontSize: 12,
            color: "rgb(145, 151, 158)"
          }}
        >
          آدرس : {item.address.city} {item.address.parish} {item.address.text}
        </Text>
      </View>

      {isShowAlert(item) && <RenderAlert pressFunc={pressAlertFunc} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  cardContainer: {
    width: Dimensions.get("screen").width - 30,
    borderWidth: 2,
    borderColor: "rgb(112, 26, 146)",
    borderRadius: 10,
    backgroundColor: "#fff",
    minHeight: 200,
    paddingTop: 5,
    marginTop: 15
  },
  touchableOpacityContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  title: {},
  slide: {
    height: 160
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 5,
    height: 160
  },
  cardDetail: {
    padding: 10
  }
});

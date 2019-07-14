import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { teamcheColors } from "../styles/MyStyles";
import { RU } from "../actions/RootTypes";
import moment from "moment-jalaali";
import { guildStatusEnToFa } from "./utils/Filters";

export default ({ item, path, navigate, setCenter }) => {
  // const handleOnPress = () => navigate(path, { job: item });
  const handleOnPress = async () => {
    await setCenter(item);
    return navigate(path);
  };
  const calcStatusWithDate = item => {
    let returnedStatus = "";
    if (item.guildStatus === "warning27")
      item.warning27Date
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.warning27Date).format("jYYYY/jM/jD")}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "shutdownPromise")
      item.shutdownPromiseDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.shutdownPromiseDate).format(
            "jYYYY/jM/jD"
          )}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "applicant")
      item.applicantDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.applicantDate).format("jYYYY/jM/jD")}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "offerDoc")
      item.offerDocDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.offerDocDate).format("jYYYY/jM/jD")}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "commissionConfirm")
      item.commissionConfirmDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.commissionConfirmDate).format(
            "jYYYY/jM/jD"
          )}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "directorAccept")
      item.directorAcceptDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.directorAcceptDate).format(
            "jYYYY/jM/jD"
          )}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "docInquiry")
      item.docInquiryDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.docInquiryDate).format("jYYYY/jM/jD")}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "paySettle")
      item.paySettleDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.paySettleDate).format("jYYYY/jM/jD")}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "payElectronicCard")
      item.payElectronicCardDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.payElectronicCardDate).format(
            "jYYYY/jM/jD"
          )}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "issueLicense")
      item.issueLicenseDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.issueLicenseDate).format(
            "jYYYY/jM/jD"
          )}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "receiveLicense")
      item.receiveLicenseDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.receiveLicenseDate).format(
            "jYYYY/jM/jD"
          )}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    if (item.guildStatus === "plump")
      item.plumpDate
        ? (returnedStatus = `${guildStatusEnToFa(
            item.guildStatus
          )} - در تاریخ : ${moment(item.plumpDate).format("jYYYY/jM/jD")}`)
        : (returnedStatus = guildStatusEnToFa(item.guildStatus));

    return returnedStatus;
  };
  return (
    <TouchableOpacity
      style={styles.touchableOpacityContainer}
      onPress={handleOnPress}
    >
      <Image
        style={{ width: 50, height: 50, flex: 2, borderRadius: 5 }}
        source={{
          uri: `${RU}/pic/240/${
            item.pics.length > 0 ? item.pics[0] : item.etPic
          }`
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
                تاریخ انقضاء :{" "}
                {moment(item.expirationDate).format("jYYYY/jM/jD")}
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
                حق عضویت :{" "}
                {moment(item.membershipFeeDate).format("jYYYY/jM/jD")}
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

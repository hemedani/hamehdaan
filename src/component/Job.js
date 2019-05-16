import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { teamcheColors } from "../styles/MyStyles";
import { RU } from "../types";
import moment from "moment-jalaali";

export default ({ item, path, navigate }) => {
  const handleOnPress = () => navigate(path, { job: item });
  return (
    <TouchableOpacity style={styles.touchableOpacityContainer} onPress={handleOnPress}>
      <Image style={{ width: 50, height: 50, flex: 2, borderRadius: 5 }} source={{ uri: `${RU}/pic/800/${item.pics[0]}` }} />
      <View style={{ flex: 8, padding: 5, paddingLeft: 10 }}>
        <Text style={{ marginBottom: 5, writingDirection: "rtl", fontFamily: "Shabnam-FD", fontSize: 18 }}>{item.name}</Text>
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
                تاریخ انقضا : {moment(item.expirationDate).format("jYYYY/jM/jD")}
              </Text>
            </View>
          )}
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

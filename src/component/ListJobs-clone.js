import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import MyCarousel from "./carousel/MyCarousel";

import { getCenters, cleanCenters } from "../actions";

import ButtonPerple from "./utils/ButtonPerple";
import { RU } from "../actions/RootTypes";
import { teamcheColors } from "../styles/MyStyles";

class ListJobsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
  }
  static navigationOptions = {
    title: "صنف ها",
    titleStyle: {
      fontFamily: "Shabnam-FD"
    }
  };

  componentDidMount() {
    this.props.cleanCenters();
    this.props.getCenters({ etehadiye: this.props.auth.user.etOrganization });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d8d8d8"
        }}
      >
        {/* {this.props.centers.centerLoading ? (
          <Text>Sallam</Text>
        ) : (
          <ScrollView style={{ paddingBottom: 50 }}>
            <FlatList
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={{
                flex: 1,
                alignItems: "center"
              }}
              data={this.props.centers.centers}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <MyCarousel pics={item.pics} />
                  <View style={styles.cardDetail}>
                    <Text style={{ marginBottom: 2, writingDirection: "rtl", fontFamily: "Shabnam-FD", fontSize: 18 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        marginBottom: 10,
                        writingDirection: "rtl",
                        fontFamily: "Shabnam-FD",
                        fontSize: 12,
                        color: "rgb(145, 151, 158)"
                      }}
                    >
                      آدرس : {item.address.city} {item.address.parish} {item.address.text}
                    </Text>
                    <ButtonPerple path="Details" job={item} navigate={this.props.navigation.navigate} title="بیشتر" />
                  </View>
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </ScrollView>
        )} */}
        <ScrollView style={{ paddingBottom: 50 }}>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              flex: 1,
              alignItems: "center"
            }}
            data={this.props.centers.centers}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.touchableOpacityContainer}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: `${RU}/pic/800/${item.pics[0]}` }}
                />
                <View>
                  <Text
                    style={{
                      marginBottom: 2,
                      writingDirection: "rtl",
                      fontFamily: "Shabnam-FD",
                      fontSize: 18
                    }}
                  >
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        backgroundColor: teamcheColors.cornFlowerBlue,
                        marginBottom: 2,
                        writingDirection: "rtl",
                        fontFamily: "Shabnam-FD",
                        fontSize: 18,
                        color: "white"
                      }}
                    >
                      تاریخ انقضا : ۰۸/۰۹/۱۳۹۸
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginBottom: 10,
                      writingDirection: "rtl",
                      fontFamily: "Shabnam-FD",
                      fontSize: 12,
                      color: "rgb(145, 151, 158)"
                    }}
                  >
                    آدرس : {item.address.city} {item.address.parish}{" "}
                    {item.address.text}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        </ScrollView>
      </View>
    );
  }
}

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
    backgroundColor: "white"
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

const msp = ({ auth, centers }) => ({ auth, centers });

export default connect(
  msp,
  { getCenters, cleanCenters }
)(ListJobsScreen);

import React from "react";
import { View, StyleSheet, Text, FlatList, Alert, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import MyCarousel from "./carousel/MyCarousel";

import { getCenters, cleanCenters } from "../actions";

import ButtonPerple from "./utils/ButtonPerple";

class ListJobsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
  }
  static navigationOptions = {
    title: "خانه",
    titleStyle: {
      fontFamily: "Shabnam-FD"
    }
  };

  componentDidMount() {
    this.props.getCenters({ etehadiye: this.props.auth.user.officerEt });
    this.props.cleanCenters();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#d8d8d8" }}>
        {this.props.centers.centerLoading ? (
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
                    <Text style={{ marginBottom: 2, textAlign: "right", fontFamily: "Shabnam-FD", fontSize: 18 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        marginBottom: 10,
                        textAlign: "right",
                        fontFamily: "Shabnam-FD",
                        fontSize: 12,
                        color: "rgb(145, 151, 158)"
                      }}
                    >
                      آدرس : {item.address.city} {item.address.parish} {item.address.text}
                    </Text>
                    <ButtonPerple path="Details" _id={item._id} navigate={this.props.navigation.navigate} title="بیشتر" />
                  </View>
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </ScrollView>
        )}
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

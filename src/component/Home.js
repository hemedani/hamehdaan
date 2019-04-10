import React from "react";
import { View, StyleSheet, Text, FlatList, Alert, Image, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import SideMenu from "react-native-side-menu";
import Carousel from "react-native-snap-carousel";

import { getCenters } from "../actions";
import { Card, Button } from "react-native-elements";
import { RU } from "../types";

import Menu from "./Menu";

class HomeScreen extends React.PureComponent {
  componentDidMount() {
    this.props.getCenters({ etehadiye: this.props.auth.user.officerEt });
    // Alert.alert("This.props.centers", JSON.stringify(this.props.centers, null, 2));
    // Alert.alert("This.props.auth", JSON.stringify(this.props.auth, null, 2));
  }
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={{ uri: `${RU}/pic/800/${item}` }} />
      </View>
    );
  }

  render() {
    return (
      // <SideMenu menuPosition="right" menu={<Menu navigation={this.props.navigation} />}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#d8d8d8" }}>
        {this.props.centers.centerLoading ? (
          <Text>Sallam</Text>
        ) : (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              flex: 1,
              alignItems: "center"
            }}
            data={this.props.centers.centers}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  data={item.pics}
                  renderItem={this._renderItem}
                  sliderWidth={Dimensions.get("screen").width - 35}
                  itemWidth={Dimensions.get("screen").width - 50}
                />
                <View style={styles.cardDetail}>
                  <Text style={{ marginBottom: 10, direction: "rtl", textAlign: "right" }}>
                    {item.address.city} {item.address.parish} {item.address.Text}
                  </Text>
                  <Button
                    icon={{ name: "view-compact" }}
                    backgroundColor="#03A9F4"
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    titleStyle={{
                      fontFamily: "Shabnam-FD"
                    }}
                    title="بیشتر"
                  />
                </View>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        )}
      </View>
      // </SideMenu>
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
    borderColor: "#fff",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    minHeight: 200,
    paddingTop: 5
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
    height: 150
  },
  cardDetail: {
    padding: 10
  }
});

const msp = ({ auth, centers }) => ({ auth, centers });

export default connect(
  msp,
  { getCenters }
)(HomeScreen);

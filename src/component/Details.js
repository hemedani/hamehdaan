import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Divider, Button } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import Ionicons from "react-native-vector-icons/Ionicons";

import MapModal from "./modals/MapModal";
import PhoneCallModal from "./modals/PhoneCallModal";
import ReportModal from "./modals/ReportModal";

import CarouselStyle, { colors } from "../styles/CarouselStyle";
import teamcheStyles, { teamcheColors } from "../styles/MyStyles";

import { RU } from "../types";

const SLIDER_1_FIRST_ITEM = 0;
class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      mapModalVisible: false,
      phonesModalVisible: false,
      reportModalVisible: false,
      yOffset: 0
    };
    this.backBtnPress = this.backBtnPress.bind(this);
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.togglePhonesModal = this.togglePhonesModal.bind(this);
    this.toggleReportModal = this.toggleReportModal.bind(this);
    this.setYOffset = this.setYOffset.bind(this);
  }
  componentDidMount() {
    const job = this.props.navigation.getParam("job", null);
    if (job) {
      this.setState({
        region: {
          latitude: job.location.coordinates[1],
          longitude: job.location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
    }
  }

  static navigationOptions = {
    headerMode: "none",
    header: null
  };

  _renderItem({ item, index }) {
    return (
      // <SliderEntry data={item} even={(index + 1) % 2 === 0} />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${item}'`);
        }}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: `${RU}/pic/800/${item}` }} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }
  backBtnPress() {
    this.props.navigation.goBack();
  }
  toggleMapModal() {
    this.setState({ mapModalVisible: !this.state.mapModalVisible });
  }
  toggleReportModal() {
    this.setState({ reportModalVisible: !this.state.reportModalVisible });
  }
  togglePhonesModal() {
    this.setState({ phonesModalVisible: !this.state.phonesModalVisible });
  }

  setYOffset(e) {
    this.setState({ yOffset: e.nativeEvent.contentOffset.y });
  }

  render() {
    const job = this.props.navigation.getParam("job", {});
    return (
      <View style={{ flex: 1 }}>
        {this.state.yOffset > 10 && (
          <View style={styles.hiddenHeader}>
            <TouchableOpacity style={[styles.backBtn, { flexDirection: "row" }]} onPress={this.backBtnPress}>
              <Ionicons name={"ios-arrow-forward"} size={30} color={teamcheColors.cornFlowerBlue} />
              <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr, { color: teamcheColors.cornFlowerBlue }]}>
                بازگشت
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView style={styles.pageContainer} onScroll={this.setYOffset}>
          <TouchableOpacity style={styles.backBtn} onPress={this.backBtnPress}>
            <Ionicons name={"ios-arrow-forward"} size={30} color={"white"} />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={styles.sliderContainer}>
              <Carousel
                ref={c => (this._slider1Ref = c)}
                data={job.pics}
                renderItem={this._renderItem}
                onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
                sliderWidth={Dimensions.get("screen").width}
                itemWidth={Dimensions.get("screen").width}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                inactiveSlideShift={2}
                containerCustomStyle={styles.containerCustomStyle}
                contentContainerCustomStyle={styles.contentContainerCustomStyle}
              />
              <Pagination
                dotsLength={job.pics.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotContainerStyle={CarouselStyle.paginationDotContainer}
                dotColor={teamcheColors.purple}
                dotStyle={styles.paginationDot}
                inactiveDotColor={"white"}
                inactiveDotOpacity={1}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
            </View>
            <View style={styles.nameCotainer}>
              <View style={styles.nameCotainerTitr}>
                <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr]}>{job.name}</Text>
                <Divider />
              </View>
              <View style={styles.discountContainer}>
                <AnimatedCircularProgress
                  size={120}
                  width={7}
                  fill={job.discount}
                  tintColor={teamcheColors.purple}
                  backgroundColor="#00e0ff"
                  duration={1000}
                >
                  {fill => <Text style={teamcheStyles.textBase}>{Math.round(fill)} درصد تخفیف </Text>}
                </AnimatedCircularProgress>
              </View>
              <View style={styles.addressContainer}>
                <Text style={teamcheStyles.textBase}>
                  آدرس : {job.address.city} {job.address.parish} {job.address.text}
                </Text>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.detailsBtns}>
                <Button
                  icon={{ name: "phone", color: "white" }}
                  buttonStyle={{
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 5,
                    backgroundColor: teamcheColors.cornFlowerBlue
                  }}
                  titleStyle={{
                    fontFamily: "Shabnam-FD",
                    fontSize: 15
                  }}
                  title={"تماس سریع"}
                  onPress={this.togglePhonesModal}
                />
                <Button
                  icon={{ name: "directions", color: "white" }}
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 5,
                    backgroundColor: teamcheColors.seaFoam
                  }}
                  titleStyle={{
                    fontFamily: "Shabnam-FD",
                    fontSize: 15
                  }}
                  title={"مسیریابی"}
                  onPress={this.toggleMapModal}
                />
              </View>
              {/* <View style={styles.mapView}>
                <MapView style={styles.map} region={this.state.region}>
                  <Marker
                    coordinate={this.state.region}
                    title={job.name}
                    description={`آدرس : ${job.address.city} ${job.address.parish} ${job.address.text}`}
                    centerOffset={{ x: 0, y: -20 }}
                  >
                    <Image source={require("../img/marker/marker-destination.png")} style={{ width: 27, height: 40 }} />
                  </Marker>
                </MapView>
              </View> */}
              <Text>detail container</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.reportBtnContainer}>
          <Button
            raised
            icon={{ name: "report", color: "white" }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 5,
              height: 40,
              backgroundColor: teamcheColors.purple
            }}
            titleStyle={{
              fontFamily: "Shabnam-FD",
              fontSize: 15
            }}
            title={"ثبت بازرسی"}
            onPress={this.toggleReportModal}
          />
          <Button
            raised
            icon={{ name: "comment", color: "white" }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 5,
              height: 40,
              backgroundColor: teamcheColors.cornFlowerBlue
            }}
            titleStyle={{
              fontFamily: "Shabnam-FD",
              fontSize: 15
            }}
            title={"ثبت اطلاعات"}
            onPress={this.toggleReportModal}
          />
        </View>
        <MapModal toggleModal={this.toggleMapModal} isModalVisible={this.state.mapModalVisible} job={job} />
        <ReportModal toggleModal={this.toggleReportModal} isModalVisible={this.state.reportModalVisible} />
        <PhoneCallModal
          toggleModal={this.togglePhonesModal}
          isModalVisible={this.state.phonesModalVisible}
          phone={job.phone}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: teamcheColors.gray,
    flex: 1
  },
  hiddenHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 85,
    width: Dimensions.get("screen").width,
    backgroundColor: "white",
    zIndex: 999
  },
  sliderContainer: {
    height: Dimensions.get("screen").height / 2.5
  },
  containerCustomStyle: {
    overflow: "visible"
  },
  contentContainerCustomStyle: {
    overflow: "visible"
  },
  slideInnerContainer: {
    width: Dimensions.get("screen").width,
    flex: 1
  },
  imageContainer: {
    width: Dimensions.get("screen").width,
    flex: 1,
    backgroundColor: "white"
  },
  paginationContainer: {
    position: "absolute",
    top: Dimensions.get("screen").height / 2.5 - 100,
    width: Dimensions.get("screen").width,
    zIndex: 999,
    alignItems: "center"
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderColor: teamcheColors.lightGray,
    borderWidth: 1,
    borderRadius: 10
  },
  nameCotainer: {
    width: Dimensions.get("screen").width - 50,
    marginTop: -50,
    borderRadius: 10,
    minHeight: 200,
    padding: 10,
    paddingTop: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: teamcheColors.darkerGray
  },
  discountContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  nameCotainerTitr: {
    height: 40,
    marginBottom: 10
  },
  addressContainer: {
    marginTop: 10,
    backgroundColor: teamcheColors.lightGray,
    padding: 5,
    borderRadius: 5
  },
  detailContainer: {
    minHeight: 500
  },
  detailsBtns: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: -15
  },
  mapView: {
    height: 200,
    width: Dimensions.get("screen").width - 50,
    borderRadius: 10,
    minHeight: 200,
    padding: 10,
    paddingTop: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: teamcheColors.darkerGray,
    marginVertical: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    position: "absolute"
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 30,
    zIndex: 99999
  },
  reportBtnContainer: {
    position: "absolute",
    bottom: 3,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default DetailsScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Divider, Button } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment-jalaali";

import MapModal from "./modals/MapModal";
import PhoneCallModal from "./modals/PhoneCallModal";
import ReportModal from "./modals/ReportModal";

import CarouselStyle, { colors } from "../styles/CarouselStyle";
import teamcheStyles, { teamcheColors } from "../styles/MyStyles";

import { RU } from "../types";
import Axios from "axios";

const SLIDER_1_FIRST_ITEM = 0;
class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      getJob: false,
      job: null,
      mapModalVisible: false,
      phonesModalVisible: false,
      reportModalVisible: false
    };
    this.backBtnPress = this.backBtnPress.bind(this);
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.togglePhonesModal = this.togglePhonesModal.bind(this);
    this.toggleReportModal = this.toggleReportModal.bind(this);
  }
  componentDidMount() {
    const job = this.props.navigation.getParam("job", {});
    this.setState({ getJob: true, job });
    Axios.get(`${RU}/center`, { params: { _id: job._id } })
      .then(resp => this.setState({ getJob: false, job: resp.data.center }))
      .catch(err => this.setState({ getJob: false }));
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerTitle: <Text style={{ color: "white", fontSize: 18 }}>Test</Text>,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 }
    };
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
          <Image source={{ uri: `${RU}/pic/500/${item}` }} style={styles.image} />
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

  render() {
    const job = this.state.job ? this.state.job : this.props.navigation.getParam("job", {});
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.pageContainer}>
          <View style={{ alignItems: "center", paddingBottom: 60 }}>
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
                  containerStyle={{
                    flex: 1
                  }}
                  buttonStyle={{
                    borderTopEndRadius: 0,
                    borderBottomEndRadius: 0,
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
                  containerStyle={{
                    flex: 1
                  }}
                  icon={{ name: "directions", color: "white" }}
                  buttonStyle={{
                    borderTopStartRadius: 0,
                    borderBottomStartRadius: 0,
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
              <TouchableOpacity style={styles.mapView} onPress={this.toggleMapModal}>
                <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: `${RU}/pic/maps/${job.staticMap}` }} />
              </TouchableOpacity>

              <View style={[styles.nameCotainer, { marginTop: 5 }]}>
                <View style={styles.nameCotainerTitr}>
                  <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr]}>اطلاعات پروانه</Text>
                  <Divider />
                </View>

                {this.state.getJob && (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: teamcheColors.purple,
                      borderRadius: 40,
                      justifyContent: "center",
                      alignSelf: "center"
                    }}
                  >
                    <ActivityIndicator size="small" color={teamcheColors.lightPink} />
                  </View>
                )}
                {job.otaghBazargani && job.otaghBazargani.name && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>اتاق بازرگانی : {job.otaghBazargani.name}</Text>
                  </View>
                )}
                {job.otaghAsnaf.name && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>اتاق اصناف : {job.otaghAsnaf.name}</Text>
                  </View>
                )}

                {job.etehadiye.name && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>اتحادیه : {job.etehadiye.name}</Text>
                  </View>
                )}
                {job.raste.name && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>رسته : {job.raste.name}</Text>
                  </View>
                )}
                {job.guildId && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>شناسه صنفی : {job.guildId}</Text>
                  </View>
                )}
                {job.issueDate && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      تاریخ صدور پروانه : {moment(job.issueDate).format("jYYYY/jM/jD")}
                    </Text>
                  </View>
                )}
                {job.expirationDate && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      تاریخ انقضاء پروانه : {moment(job.expirationDate).format("jYYYY/jM/jD")}
                    </Text>
                  </View>
                )}
                <View style={styles.addressContainer}>
                  <Text style={teamcheStyles.textBase}>مباشر : {job.steward ? "دارد" : "ندارد"}</Text>
                </View>
                {job.personType && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>نوع شخص : {job.personType}</Text>
                  </View>
                )}
                {job.activityType && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>نوع فعالیت : {job.activityType}</Text>
                  </View>
                )}
                {job.isicCode && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>کد آیسیک : {job.isicCode}</Text>
                  </View>
                )}
                {job.postalCode && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>کد پستی : {job.postalCode}</Text>
                  </View>
                )}
              </View>

              <View style={[styles.nameCotainer, { marginTop: 5 }]}>
                <View style={styles.nameCotainerTitr}>
                  <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr]}>اطلاعات</Text>
                  <Divider />
                </View>

                {job.workShift && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      ساعت کار : از ساعت {job.workShift[0]} تا {job.workShift[1]}
                    </Text>
                  </View>
                )}
                {job.phone.length > 0 && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>تلفن ها : {job.phone.map(ph => `${ph}, `)}</Text>
                  </View>
                )}
                {job.description && (
                  <View style={styles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>توضیحات : {job.description}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.reportBtnContainer}>
          <Button
            icon={{ name: "report", color: "white" }}
            containerStyle={{
              width: "50%"
            }}
            buttonStyle={{
              borderRadius: 0,
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
            icon={{ name: "comment", color: "white" }}
            containerStyle={{
              width: "50%"
            }}
            buttonStyle={{
              borderRadius: 0,
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
        <View>
          <MapModal toggleModal={this.toggleMapModal} isModalVisible={this.state.mapModalVisible} job={job} />
          <ReportModal toggleModal={this.toggleReportModal} isModalVisible={this.state.reportModalVisible} />
          <PhoneCallModal
            toggleModal={this.togglePhonesModal}
            isModalVisible={this.state.phonesModalVisible}
            phone={job.phone}
          />
        </View>
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
    marginTop: 10
  },
  mapView: {
    height: 200,
    width: Dimensions.get("screen").width - 50,
    borderRadius: 10,
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

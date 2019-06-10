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
import { connect } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Divider, Button } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment-jalaali";

import { addReport, getCenter, cleanCenter, setLocation, setLocationLoad } from "../actions";

import CarouselStyle from "../styles/CarouselStyle";
import teamcheStyles, { teamcheColors } from "../styles/MyStyles";

import { RU } from "../types";

const SLIDER_1_FIRST_ITEM = 0;
class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      getJob: false,
      center: null,
      reportModalVisible: false,
      setLocation: false
    };
    this.backBtnPress = this.backBtnPress.bind(this);
    this.getMapDirection = this.getMapDirection.bind(this);
    this.getPhoneCallModal = this.getPhoneCallModal.bind(this);
    this.addPhotoModal = this.addPhotoModal.bind(this);
    this.addReportModal = this.addReportModal.bind(this);
    this.addDetailForCenter = this.addDetailForCenter.bind(this);
    this.setLocationForJob = this.setLocationForJob.bind(this);
  }
  componentDidMount() {
    this.props.getCenter(this.props.center.center._id);
  }

  componentWillUnmount() {
    this.props.cleanCenter();
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
        style={detailsStyles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${item}'`);
        }}
      >
        <View style={detailsStyles.imageContainer}>
          <Image source={{ uri: `${RU}/pic/500/${item}` }} style={detailsStyles.image} />
        </View>
      </TouchableOpacity>
    );
  }
  backBtnPress() {
    this.props.navigation.goBack();
  }
  getMapDirection() {
    const { center } = this.props.center;
    this.props.navigation.navigate("MapDirectionModal", { center });
  }
  getPhoneCallModal() {
    const { center } = this.props.center;
    this.props.navigation.navigate("PhoneCallModal", { phone: center.phone });
  }
  addPhotoModal() {
    const { center } = this.props.center;
    this.props.navigation.navigate("AddPhotoToCenter", { center: center });
  }
  addReportModal() {
    this.props.navigation.navigate("AddReportModal");
  }
  addDetailForCenter() {
    this.props.navigation.navigate("AddDetailForCenterModal");
  }

  setLocationForJob() {
    this.props.setLocationLoad();
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.props.setLocation({ _id: this.props.center.center._id, lat: latitude, lng: longitude });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { center, centerLoad, picLoading, locationLoad } = this.props.center;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={detailsStyles.pageContainer}>
          <View style={{ alignItems: "center", paddingBottom: 60 }}>
            <View style={detailsStyles.sliderContainer}>
              <Carousel
                ref={c => (this._slider1Ref = c)}
                data={center.pics}
                renderItem={this._renderItem}
                onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
                sliderWidth={Dimensions.get("screen").width}
                itemWidth={Dimensions.get("screen").width}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                inactiveSlideShift={2}
                containerCustomStyle={detailsStyles.containerCustomStyle}
                contentContainerCustomStyle={detailsStyles.contentContainerCustomStyle}
              />
              <Pagination
                dotsLength={center.pics.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                containerStyle={detailsStyles.paginationContainer}
                dotContainerStyle={CarouselStyle.paginationDotContainer}
                dotColor={teamcheColors.purple}
                dotStyle={detailsStyles.paginationDot}
                inactiveDotColor={"white"}
                inactiveDotOpacity={1}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
            </View>
            <View style={detailsStyles.nameContainer}>
              <View style={detailsStyles.nameContainerTitr}>
                <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr]}>{center.name}</Text>
                <Divider />
              </View>
              <View style={detailsStyles.discountContainer}>
                <AnimatedCircularProgress
                  size={120}
                  width={7}
                  fill={center.discount}
                  tintColor={teamcheColors.purple}
                  backgroundColor="#00e0ff"
                  duration={1000}
                >
                  {fill => <Text style={teamcheStyles.textBase}>{Math.round(fill)} درصد تخفیف </Text>}
                </AnimatedCircularProgress>
              </View>
              <View style={detailsStyles.addressContainer}>
                <Text style={teamcheStyles.textBase}>
                  آدرس : {center.address.city} {center.address.parish} {center.address.text}
                </Text>
              </View>
            </View>
            <View style={detailsStyles.detailContainer}>
              <View style={detailsStyles.detailsBtns}>
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
                  onPress={this.getPhoneCallModal}
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
                  onPress={this.getMapDirection}
                />
              </View>
              <TouchableOpacity style={detailsStyles.mapView} onPress={this.getMapDirection}>
                <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: `${RU}/pic/maps/${center.staticMap}` }} />
              </TouchableOpacity>

              <View style={[detailsStyles.nameContainer, { marginTop: 5 }]}>
                <View style={detailsStyles.nameContainerTitr}>
                  <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr]}>اطلاعات پروانه</Text>
                  <Divider />
                </View>

                {centerLoad && (
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
                {center.otaghBazargani && center.otaghBazargani.name && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>اتاق بازرگانی : {center.otaghBazargani.name}</Text>
                  </View>
                )}
                {center.otaghAsnaf.name && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>اتاق اصناف : {center.otaghAsnaf.name}</Text>
                  </View>
                )}

                {center.etehadiye.name && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>اتحادیه : {center.etehadiye.name}</Text>
                  </View>
                )}
                {center.raste.name && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>رسته : {center.raste.name}</Text>
                  </View>
                )}

                {!!center.guildId && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>شناسه صنفی : {center.guildId}</Text>
                  </View>
                )}
                {center.issueDate && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      تاریخ صدور پروانه : {moment(center.issueDate).format("jYYYY/jM/jD")}
                    </Text>
                  </View>
                )}
                {center.expirationDate && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      تاریخ انقضاء پروانه : {moment(center.expirationDate).format("jYYYY/jM/jD")}
                    </Text>
                  </View>
                )}
                <View style={detailsStyles.addressContainer}>
                  <Text style={teamcheStyles.textBase}>مباشر : {center.steward ? "دارد" : "ندارد"}</Text>
                </View>
                {!!center.personType && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>نوع شخص : {center.personType}</Text>
                  </View>
                )}
                {!!center.activityType && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>نوع فعالیت : {center.activityType}</Text>
                  </View>
                )}
                {!!center.isicCode && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>کد آیسیک : {center.isicCode}</Text>
                  </View>
                )}
                {!!center.postalCode && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>کد پستی : {center.postalCode}</Text>
                  </View>
                )}

                {!!center.guildOwnerName && !!center.guildOwnerFamily && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      نام صاحب پروانه : {center.guildOwnerName} {center.guildOwnerFamily}
                    </Text>
                  </View>
                )}
                {!!center.identificationCode && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>شماره شناسنامه صاحب پروانه : {center.identificationCode}</Text>
                  </View>
                )}
                {!!center.nationalCode && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>کد ملی صاحب پروانه : {center.nationalCode}</Text>
                  </View>
                )}
                {!!center.ownerFatherName && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>نام پدر صاحب پروانه : {center.ownerFatherName}</Text>
                  </View>
                )}
                {center.ownerBirthDate && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      تاریخ تولد صاحب پروانه : {moment(center.ownerBirthDate).format("jYYYY/jM/jD")}
                    </Text>
                  </View>
                )}
                {!!center.waterPlaque && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>پلاک آبی : {center.waterPlaque}</Text>
                  </View>
                )}
                {!!center.registrationPlaque && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>پلاک ثبتی : {center.registrationPlaque}</Text>
                  </View>
                )}
                {center.membershipFeeDate && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      تاریخ آخرین پرداخت حق عضویت : {moment(center.membershipFeeDate).format("jYYYY/jM/jD")}
                    </Text>
                  </View>
                )}
              </View>

              <View style={detailsStyles.detailsBtns}>
                <Button
                  containerStyle={{
                    flex: 1
                  }}
                  icon={{
                    name: "exclamation",
                    type: "evilicon",
                    color: "white"
                  }}
                  buttonStyle={{
                    backgroundColor: teamcheColors.cornFlowerBlue
                  }}
                  titleStyle={{
                    fontFamily: "Shabnam-FD",
                    fontSize: 15
                  }}
                  title={"گزارش ها"}
                  onPress={() => this.props.navigation.navigate("CenterReports", { _id: center._id })}
                />
              </View>

              <View style={[detailsStyles.nameContainer, { marginTop: 5 }]}>
                <View style={detailsStyles.nameContainerTitr}>
                  <Text style={[teamcheStyles.textBase, teamcheStyles.textTitr]}>اطلاعات</Text>
                  <Divider />
                </View>

                {center.workShift && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>
                      ساعت کار : از ساعت {center.workShift[0]} تا {center.workShift[1]}
                    </Text>
                  </View>
                )}
                {center.phone.length > 0 && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>تلفن ها : {center.phone.map(ph => `${ph}, `)}</Text>
                  </View>
                )}
                {center.description && (
                  <View style={detailsStyles.addressContainer}>
                    <Text style={teamcheStyles.textBase}>توضیحات : {center.description}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={detailsStyles.reportBtnContainer}>
          <Button
            icon={{
              name: "exclamation",
              type: "evilicon",
              color: "white"
            }}
            containerStyle={{
              flex: 1
            }}
            buttonStyle={{
              borderRadius: 0,
              height: 40,
              backgroundColor: teamcheColors.purple
            }}
            onPress={this.addReportModal}
          />
          <Button
            icon={{ name: "location", type: "evilicon", color: "white" }}
            containerStyle={{
              flex: 1
            }}
            buttonStyle={{
              borderRadius: 0,
              height: 40,
              backgroundColor: teamcheColors.royal
            }}
            loading={locationLoad}
            onPress={this.setLocationForJob}
          />
          <Button
            icon={{ name: "camera", type: "evilicon", color: "white" }}
            containerStyle={{
              flex: 1
            }}
            buttonStyle={{
              borderRadius: 0,
              height: 40,
              backgroundColor: teamcheColors.seaFoam
            }}
            onPress={this.addPhotoModal}
          />
          <Button
            icon={{ name: "pencil", type: "evilicon", color: "white" }}
            containerStyle={{
              flex: 1
            }}
            buttonStyle={{
              borderRadius: 0,
              height: 40,
              backgroundColor: teamcheColors.cornFlowerBlue
            }}
            onPress={this.addDetailForCenter}
          />
        </View>
      </View>
    );
  }
}

export const detailsStyles = StyleSheet.create({
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
  nameContainer: {
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
  nameContainerTitr: {
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
    bottom: 0,
    width: Dimensions.get("screen").width,
    flexDirection: "row"
  }
});

const msp = ({ reports, center }) => ({ reports, center });

export default connect(
  msp,
  { addReport, getCenter, cleanCenter, setLocation, setLocationLoad }
)(DetailsScreen);

import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import ProcessPolyline from "@mapbox/polyline";
import axios from "axios";

import MapView, { Marker, Polyline } from "react-native-maps";
import { Button } from "react-native-elements";
import { Popup } from "react-native-map-link";

import { DIRECTION_API_KEY } from "../../actions/RootReducers";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import BaseModalNavigation from "./BaseModalNavigation";
export default class MapDirectionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 34.777143,
        longitude: 48.527305,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      location: {
        latitude: 34.777143,
        longitude: 48.527305
      },
      getDirections: false,
      getCoords: false,
      coords: [],
      isMapLinkModalVisible: false
    };
    this.findCoordinates = this.findCoordinates.bind(this);
    this.toggleMapLinkModal = this.toggleMapLinkModal.bind(this);
  }
  componentDidMount() {
    this.findCoordinates();
    const center = this.props.navigation.getParam("center", {});
    if (center) {
      this.setState({
        region: {
          ...this.state.region,
          latitude: center.location.coordinates[1],
          longitude: center.location.coordinates[0]
        }
      });
    }
  }

  async getDirections(startLoc, destinationLoc) {
    this.setState({ getCoords: true });
    try {
      const getCoords = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${DIRECTION_API_KEY}`
      );
      const points = ProcessPolyline.decode(
        getCoords.data.routes[0].overview_polyline.points
      );
      const coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords, getCoords: false });
    } catch (error) {
      this.setState({ getCoords: false });
      return error;
    }
  }

  findCoordinates() {
    this.setState({ getDirections: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          getDirections: false
        });

        const center = this.props.navigation.getParam("center", {});

        this.getDirections(
          `${position.coords.latitude},${position.coords.longitude}`,
          `${center.location.coordinates[1]},${center.location.coordinates[0]}`
        );
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  toggleMapLinkModal() {
    this.setState({ isMapLinkModalVisible: !this.state.isMapLinkModalVisible });
  }
  renderActivityIndicator(txt) {
    return (
      <View
        style={{
          flex: 1,
          height: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: teamcheColors.lightPink,
            borderRadius: 40,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="small" color={teamcheColors.purple} />
        </View>
        {txt && (
          <Text style={[teamcheStyle.textBase, { marginStart: 5 }]}>{txt}</Text>
        )}
      </View>
    );
  }
  render() {
    const center = this.props.navigation.getParam("center", {});
    return (
      <BaseModalNavigation
        headerTxt="مسیریابی"
        goBack={this.props.navigation.goBack}
      >
        <View style={styles.parentContainer}>
          {this.state.getDirections ? (
            this.renderActivityIndicator("در حال دریافت موقعیت")
          ) : (
            <View style={styles.container}>
              <View style={styles.mapView}>
                <MapView
                  style={styles.map}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  showsCompass={true}
                  zoomEnabled={true}
                  region={this.state.region}
                >
                  <Marker
                    coordinate={this.state.region}
                    title={center.name}
                    description={`آدرس : ${center.address.city} ${
                      center.address.parish
                    } ${center.address.text}`}
                    centerOffset={{ x: 0, y: -20 }}
                  >
                    <Image
                      source={require("../../img/marker/marker-destination.png")}
                      style={{ width: 27, height: 40 }}
                    />
                  </Marker>
                  {this.state.location && (
                    <Marker
                      coordinate={this.state.location}
                      title={"موقعیت شما"}
                      centerOffset={{ x: 0, y: -20 }}
                    >
                      <Image
                        source={require("../../img/marker/marker-origin.png")}
                        style={{ width: 27, height: 40 }}
                      />
                    </Marker>
                  )}
                  {this.state.coords.length > 0 && (
                    <Polyline
                      coordinates={this.state.coords}
                      strokeWidth={2}
                      strokeColor="red"
                    />
                  )}
                </MapView>
              </View>
              <View style={styles.btnsContainer}>
                {this.state.getCoords ? (
                  this.renderActivityIndicator("در حال دریافت مسیر")
                ) : (
                  <Button
                    icon={{ name: "map", color: "white" }}
                    containerStyle={{
                      flex: 1
                    }}
                    buttonStyle={{
                      borderRadius: 0,
                      backgroundColor: teamcheColors.royal
                    }}
                    titleStyle={{
                      fontFamily: "Shabnam-FD",
                      fontSize: 15
                    }}
                    title={"دریافت مسیر"}
                    onPress={this.findCoordinates}
                  />
                )}

                <Button
                  icon={{ name: "directions", color: "white" }}
                  containerStyle={{
                    flex: 1
                  }}
                  buttonStyle={{
                    borderRadius: 0,
                    backgroundColor: teamcheColors.seaFoam
                  }}
                  titleStyle={{
                    fontFamily: "Shabnam-FD",
                    fontSize: 15
                  }}
                  title={"مسیریابی از"}
                  onPress={this.toggleMapLinkModal}
                />
              </View>
            </View>
          )}

          <Popup
            isVisible={this.state.isMapLinkModalVisible}
            onCancelPressed={this.toggleMapLinkModal}
            onAppPressed={this.toggleMapLinkModal}
            onBackButtonPressed={this.toggleMapLinkModal}
            modalProps={{
              animationIn: "slideInUp"
            }}
            options={{
              latitude: center.location.coordinates[1],
              longitude: center.location.coordinates[0],
              sourceLatitude: this.state.location.latitude,
              sourceLongitude: this.state.location.longitude,
              alwaysIncludeGoogle: true,
              dialogTitle: "مسیریابی از نقشه های زیر", // optional (default: 'Open in Maps')
              dialogMessage:
                "میتوانید با کلیک بر روی این برنامه ها در صورت نصب مسیریابی را در آنها ادامه دهید",
              cancelText: "بازگشت"
            }}
          />
        </View>
      </BaseModalNavigation>
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    minHeight: 250
  },
  mapView: {
    width: Dimensions.get("screen").width - 50,
    height: 350,
    backgroundColor: "white"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  btnsContainer: {
    flexDirection: "row"
  }
});

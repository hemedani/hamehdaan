import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
import Modal from "react-native-modal";
import ProccessPolyline from "@mapbox/polyline";
import axios from "axios";

import MapView, { Marker, Polyline } from "react-native-maps";
import { Button } from "react-native-elements";
import { Popup } from "react-native-map-link";

import { DIRECTION_API_KEY } from "../../types";
import { teamcheColors } from "../../styles/MyStyles";
export default class MapModal extends Component {
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
      coords: [],
      isMapLinkModalVisible: false
    };
    this.findCoordinates = this.findCoordinates.bind(this);
    this.toggleMapLinkModal = this.toggleMapLinkModal.bind(this);
  }
  componentDidMount() {
    this.findCoordinates();
    const job = this.props.job;
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
  async getDirections(startLoc, destinationLoc) {
    try {
      const getCoord = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${DIRECTION_API_KEY}`
      );
      const points = ProccessPolyline.decode(getCoord.data.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
    } catch (error) {
      return error;
    }
  }

  findCoordinates() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
        const job = this.props.job;

        this.getDirections(
          `${position.coords.latitude},${position.coords.longitude}`,
          `${job.location.coordinates[1]},${job.location.coordinates[0]}`
        );
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  toggleMapLinkModal() {
    this.setState({ isMapLinkModalVisible: !this.state.isMapLinkModalVisible });
  }
  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
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
                title={this.props.job.name}
                description={`آدرس : ${this.props.job.address.city} ${this.props.job.address.parish} ${
                  this.props.job.address.text
                }`}
                centerOffset={{ x: 0, y: -20 }}
              >
                <Image source={require("../../img/marker/marker-destination.png")} style={{ width: 27, height: 40 }} />
              </Marker>
              {this.state.location && (
                <Marker coordinate={this.state.location} title={"موقعیت شما"} centerOffset={{ x: 0, y: -20 }}>
                  <Image source={require("../../img/marker/marker-origin.png")} style={{ width: 27, height: 40 }} />
                </Marker>
              )}
              {this.state.coords.length > 0 && (
                <Polyline coordinates={this.state.coords} strokeWidth={2} strokeColor="red" />
              )}
            </MapView>
          </View>
          <View style={styles.btnsContainer}>
            <Button
              icon={{ name: "clear", color: "white" }}
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 10,
                backgroundColor: teamcheColors.dullRed
              }}
              titleStyle={{
                fontFamily: "Shabnam-FD",
                fontSize: 15
              }}
              title={"بازگشت"}
              onPress={this.props.toggleModal}
            />
            <Button
              icon={{ name: "directions", color: "white" }}
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 10,
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
        <Popup
          isVisible={this.state.isMapLinkModalVisible}
          onCancelPressed={this.toggleMapLinkModal}
          onAppPressed={this.toggleMapLinkModal}
          onBackButtonPressed={this.toggleMapLinkModal}
          modalProps={{
            animationIn: "slideInUp"
          }}
          options={{
            latitude: this.props.job.location.coordinates[1],
            longitude: this.props.job.location.coordinates[0],
            sourceLatitude: this.state.location.latitude,
            sourceLongitude: this.state.location.longitude,
            alwaysIncludeGoogle: true,
            dialogTitle: "مسیریابی از نقشه های زیر", // optional (default: 'Open in Maps')
            dialogMessage: "میتوانید با کلیک بر روی این برنامه ها در صورت نصب مسیریابی را در آنها ادامه دهید",
            cancelText: "بازگشت"
          }}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1,
    backgroundColor: "white"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  btnsContainer: {
    height: 80,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

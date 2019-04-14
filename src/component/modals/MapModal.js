import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
// import GetLocation from 'react-native-get-location'

// GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 15000,
// })
// .then(location => {
//     console.log(location);
// })
// .catch(error => {
//     const { code, message } = error;
//     console.warn(code, message);
// })

export default class MapModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
    this.findCoordinates = this.findCoordinates.bind(this);
  }
  componentDidMount() {
    this.findCoordinates();
  }
  findCoordinates() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Text>Hello!</Text>
          <TouchableOpacity onPress={this.props.toggleModal}>
            <Text>Hide me!</Text>
            <Text>getCurrentPosition is {this.state.location}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

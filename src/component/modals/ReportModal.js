import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export default class ReportModal extends React.PureComponent {
  render() {
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Text>Hello!</Text>
          <TouchableOpacity onPress={this.props.toggleModal}>
            <Text>Hide me!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

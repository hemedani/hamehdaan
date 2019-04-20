import React from "react";
import { Text, TouchableOpacity, View, Linking } from "react-native";
import Modal from "react-native-modal";
import call from "react-native-phone-call";

export default class PhoneCallModal extends React.PureComponent {
  render() {
    const { phone = [] } = this.props;
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Text>Hello!</Text>
          <TouchableOpacity onPress={this.props.toggleModal}>
            <Text>Hide me!</Text>
          </TouchableOpacity>

          <Text>phonesModalVisible!</Text>
          {phone.map(p => (
            <TouchableOpacity key={p} onPress={() => call({ number: `${p}`, prompt: false }).catch(console.error)}>
              <Text>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  }
}

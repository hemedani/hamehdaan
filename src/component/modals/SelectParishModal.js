import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const SelectParishModal = ({ isModalVisible, toggleModal }) => (
  <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
    <View style={{ flex: 1, backgroundColor: "#fff", marginTop: 100 }}>
      <Text>Parish modal!</Text>
      <TouchableOpacity onPress={toggleModal}>
        <Text>close parish modal!</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default SelectParishModal;

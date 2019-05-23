import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";

const BaseModal = ({ toggleModal, isModalVisible, header, children }) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} onBackButtonPress={toggleModal}>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={headerBarStyle.headerContainerStyle}>
          <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr, { color: teamcheColors.lightPink, paddingTop: 10 }]}>
            {header}
          </Text>
          <Icon
            containerStyle={headerBarStyle.closeIconStyle}
            name="close"
            raised
            type="font-awesome"
            size={13}
            onPress={toggleModal}
          />
        </View>

        <View style={bodyStyle.bodyContainer}>
          {children}

          <View style={{ height: 3, backgroundColor: teamcheColors.royal }} />
        </View>
      </View>
    </Modal>
  );
};

const headerBarStyle = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: teamcheColors.royal,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 20
  },
  closeIconStyle: {}
});

const bodyStyle = StyleSheet.create({
  bodyContainer: {
    flexDirection: "column",
    minHeight: 100
  },
  flatContainer: {
    height: 400,
    backgroundColor: teamcheColors.lightGray
  },
  flatItemContainer: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  itemText: {
    fontSize: 13
  }
});

export default BaseModal;

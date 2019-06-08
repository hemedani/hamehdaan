import React from "react";
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import Modal from "react-native-modal";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";

const colors = [teamcheColors.gray, teamcheColors.lightGray];

const RenderSortItem = ({ sort, sortName, index, setSortQuery, handleCenterSearch, toggleModal }) => {
  const handleSortQuery = async () => {
    await setSortQuery({ sort, sortName });
    handleCenterSearch();
    toggleModal();
  };
  return (
    <TouchableOpacity
      onPress={handleSortQuery}
      style={[bodyStyle.flatItemContainer, { backgroundColor: colors[index % colors.length] }]}
    >
      <Text style={[teamcheStyle.textBase, bodyStyle.itemText]}>{sortName}</Text>
    </TouchableOpacity>
  );
};

const SelectSortModal = ({ toggleModal, isModalVisible, handleCenterSearch, setSortQuery }) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} onBackButtonPress={toggleModal}>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={headerBarStyle.headerContainerStyle}>
          <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr, { color: teamcheColors.lightPink, paddingTop: 10 }]}>
            مرتب سازی بر اساس
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
          <RenderSortItem
            sort={{ membershipFeeDate: 1 }}
            sortName="تاریخ اتمام حق عضویت"
            index={0}
            setSortQuery={setSortQuery}
            handleCenterSearch={handleCenterSearch}
            toggleModal={toggleModal}
          />
          <RenderSortItem
            sort={{ expirationDate: 1 }}
            sortName="تاریخ انقضاء پروانه کسب"
            index={1}
            setSortQuery={setSortQuery}
            handleCenterSearch={handleCenterSearch}
            toggleModal={toggleModal}
          />
          <RenderSortItem
            sort={{ name: 1 }}
            sortName="حروف الفبا"
            index={2}
            setSortQuery={setSortQuery}
            handleCenterSearch={handleCenterSearch}
            toggleModal={toggleModal}
          />

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

const searchBarStyles = StyleSheet.create({
  searchViewContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  textInp: {
    height: 38,
    width: Dimensions.get("window").width - 110,
    borderColor: teamcheColors.lightPink,
    backgroundColor: teamcheColors.lightGray,
    borderWidth: 0.3,
    borderRadius: 3,
    paddingHorizontal: 10,
    textAlign: "right",
    marginEnd: 10
  },
  iconContainer: {}
});

const bodyStyle = StyleSheet.create({
  bodyContainer: {
    flexDirection: "column"
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

export default SelectSortModal;

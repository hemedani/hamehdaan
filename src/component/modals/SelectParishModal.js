import React from "react";
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import Modal from "react-native-modal";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";

const colors = [teamcheColors.gray, teamcheColors.lightGray];

const renderSeparator = () => (
  <View
    style={{
      height: 0.5,
      backgroundColor: teamcheColors.purple
    }}
  />
);

const RenderParishItem = ({ item, index, setParish, handleCenterSearch, toggleModal }) => {
  const handleParishSelect = async () => {
    await setParish(item);
    handleCenterSearch();
    toggleModal();
  };
  return (
    <TouchableOpacity
      onPress={handleParishSelect}
      style={[bodyStyle.flatItemContainer, { backgroundColor: colors[index % colors.length] }]}
    >
      <Text style={[teamcheStyle.textBase, bodyStyle.itemText]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const SelectParishModal = ({
  isModalVisible,
  toggleModal,
  parishes,
  inpValue,
  handleInpText,
  handleParishSearch,
  setParish,
  handleCenterSearch
}) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} onBackButtonPress={toggleModal}>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={headerBarStyle.headerContainerStyle}>
          <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr, { color: teamcheColors.lightPink, paddingTop: 10 }]}>
            انتخاب محله
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
          <View style={searchBarStyles.searchViewContainer}>
            <TextInput
              style={[teamcheStyle.textBase, searchBarStyles.textInp]}
              placeholder="یک محله را جستجو کنید ..."
              onChangeText={handleInpText}
              value={inpValue}
              onSubmitEditing={handleParishSearch}
            />
            <Icon
              containerStyle={searchBarStyles.iconContainer}
              name="search"
              type="font-awesome"
              color={teamcheColors.cornFlowerBlue}
              onPress={handleParishSearch}
            />
          </View>
          <FlatList
            style={bodyStyle.flatContainer}
            data={parishes.parishes}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => (
              <RenderParishItem
                item={item}
                index={index}
                setParish={setParish}
                handleCenterSearch={handleCenterSearch}
                toggleModal={toggleModal}
              />
            )}
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

export const searchBarStyles = StyleSheet.create({
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

export const bodyStyle = StyleSheet.create({
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

export default SelectParishModal;

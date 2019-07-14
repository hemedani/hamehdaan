import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { teamcheColors } from "../../styles/MyStyles";
import { Button, Icon } from "react-native-elements";
import { guildStatusEnToFa } from "../../component/utils/Filters";

export const LOCATION_HEIGHT = 40;
class Location extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clearSelectedParish = this.clearSelectedParish.bind(this);
    this.navigateToParishModal = this.navigateToParishModal.bind(this);
    this.navigateToSelectGuildStatusModal = this.navigateToSelectGuildStatusModal.bind(this);
    this.clearGuildStatusFromQuery = this.clearGuildStatusFromQuery.bind(this);
    this.navigateAddCenterModal = this.navigateAddCenterModal.bind(this);
  }

  async clearSelectedParish() {
    await this.props.clearSelectedParish();
    this.props.handleCenterSearch();
  }

  async clearGuildStatusFromQuery() {
    await this.props.clearGuildStatusFromQuery();
    this.props.handleCenterSearch();
  }

  navigateToParishModal() {
    this.props.navigation.navigate("SelectParishModal");
  }
  navigateToSelectGuildStatusModal() {
    this.props.navigation.navigate("SelectGuildStatusModal");
  }
  navigateAddCenterModal() {
    this.props.navigation.navigate("AddCenterModal");
  }

  render() {
    const { fullPath, guildStatus } = this.props;
    return (
      <View style={locationStyle.locationContainer}>
        <ScrollView horizontal directionalLockEnabled>
          <Button
            type="outline"
            icon={{ color: "white", name: "filter", type: "font-awesome", size: 14 }}
            buttonStyle={{
              borderColor: teamcheColors.lightPink,
              marginHorizontal: 2
            }}
            titleStyle={{
              color: teamcheColors.lightPink,
              fontFamily: "Shabnam-FD",
              fontSize: 12,
              padding: 0
            }}
            title={fullPath ? fullPath : "انتخاب موقعیت"}
            onPress={this.navigateToParishModal}
          />
          {fullPath && (
            <Icon
              reverse
              name="close"
              type="font-awesome"
              size={10}
              color={teamcheColors.dullRed}
              onPress={this.clearSelectedParish}
            />
          )}
          <View style={[locationStyle.selectedParishContainer, { marginEnd: 5 }]} />

          <Button
            type="outline"
            icon={{ color: "white", name: "filter", type: "font-awesome", size: 14 }}
            buttonStyle={{
              borderColor: teamcheColors.lightPink,
              marginHorizontal: 2
            }}
            titleStyle={{
              color: teamcheColors.lightPink,
              fontFamily: "Shabnam-FD",
              fontSize: 12,
              padding: 0
            }}
            title={guildStatus ? guildStatusEnToFa(guildStatus) : "انتخاب وضعیت"}
            onPress={this.navigateToSelectGuildStatusModal}
          />
          {guildStatus && (
            <Icon
              reverse
              name="close"
              type="font-awesome"
              size={10}
              color={teamcheColors.dullRed}
              onPress={this.clearGuildStatusFromQuery}
            />
          )}

          <View style={[{ marginEnd: 60 }]} />
        </ScrollView>

        <Icon
          containerStyle={{
            width: 36,
            height: 36,
            borderColor: teamcheColors.lightPink,
            borderTopStartRadius: 4,
            borderBottomStartRadius: 4,
            backgroundColor: "rgba(216, 216, 216, 0.5)",
            borderWidth: 1,
            borderEndWidth: 0,
            position: "absolute",
            end: 0,
            top: 2,
            justifyContent: "center",
            alignItems: "center"
          }}
          iconStyle={{
            width: 35,
            height: 35,
            lineHeight: 35,
            paddingEnd: 9
          }}
          name="plus"
          type="font-awesome"
          size={18}
          color={teamcheColors.lightPink}
          onPress={this.navigateAddCenterModal}
        />
      </View>
    );
  }
}

const locationStyle = StyleSheet.create({
  locationContainer: {
    height: LOCATION_HEIGHT,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15
  },
  selectedParishContainer: {
    height: 35,
    marginStart: 4,
    borderStartWidth: 1,
    borderStartColor: teamcheColors.darkerGray,
    flexDirection: "row",
    alignItems: "center"
  },
  selectedParishText: { marginStart: 6, marginEnd: 30, color: teamcheColors.lightPink }
});

export default Location;

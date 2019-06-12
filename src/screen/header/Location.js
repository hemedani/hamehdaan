import React from "react";
import { View, StyleSheet } from "react-native";
import { teamcheColors } from "../../styles/MyStyles";
import { Button, Icon } from "react-native-elements";

export const LOCATION_HEIGHT = 40;
class Location extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clearSelectedParish = this.clearSelectedParish.bind(this);
    this.navigateToParishModal = this.navigateToParishModal.bind(this);
  }

  async clearSelectedParish() {
    await this.props.clearSelectedParish();
    this.props.handleCenterSearch();
  }

  navigateToParishModal() {
    this.props.navigation.navigate("SelectParishModal");
  }

  render() {
    const { fullPath } = this.props;
    return (
      <View style={locationStyle.locationContainer}>
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
          title={fullPath ? fullPath : "یک موقعیت انتخاب کنید"}
          onPress={this.navigateToParishModal}
        />
        {fullPath && (
          <Icon
            reverse
            name="close"
            type="font-awesome"
            size={8}
            color={teamcheColors.dullRed}
            onPress={this.clearSelectedParish}
          />
        )}
        <View style={locationStyle.selectedParishContainer} />
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

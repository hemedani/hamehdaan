import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";

class IconNearBy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      getNear: false
    };

    this.setNearByQuery = this.setNearByQuery.bind(this);
  }
  setNearByQuery() {
    this.setState({ getNear: true });
    navigator.geolocation.getCurrentPosition(
      async position => {
        await this.props.setNearByQuery(
          this.props.searches.nearSearch
            ? null
            : {
                type: "Point",
                coordinates: [position.coords.longitude, position.coords.latitude]
              }
        );
        this.setState({ getNear: false });
        this.props.handleCenterSearch();
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {
    return (
      <View style={iconNearByStyles.iconNearByContainer}>
        {this.props.searches.nearSearch && (
          <View
            style={{
              backgroundColor: teamcheColors.royal,
              height: 25,
              borderRadius: 5,
              paddingHorizontal: 8,
              paddingEnd: 15,
              marginEnd: -10
            }}
          >
            <Text style={[teamcheStyle.textBase, { color: teamcheColors.lightPink, paddingTop: 3 }]}>اطراف من</Text>
          </View>
        )}

        <View
          style={[
            iconNearByStyles.circleStyle,
            { backgroundColor: this.props.searches.nearSearch ? teamcheColors.royal : teamcheColors.purple }
          ]}
        >
          {this.state.getNear ? (
            <ActivityIndicator size="small" color={teamcheColors.lightPink} />
          ) : (
            <Icon
              name="location"
              type="evilicon"
              size={18}
              iconStyle={{ fontSize: 22 }}
              color={teamcheColors.lightPink}
              onPress={this.setNearByQuery}
            />
          )}
        </View>
      </View>
    );
  }
}

export const iconNearByStyles = StyleSheet.create({
  iconNearByContainer: {
    position: "absolute",
    bottom: 25,
    end: 18,
    flexDirection: "row",
    alignItems: "center"
  },
  circleStyle: {
    width: 43,
    height: 43,
    backgroundColor: teamcheColors.royal,
    borderRadius: 43,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: teamcheColors.lightPink,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  }
});

export default IconNearBy;

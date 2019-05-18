import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MyStyles, { teamcheColors } from "../../styles/MyStyles";
import SelectParishModal from "../../component/modals/SelectParishModal";
import { Button, Icon } from "react-native-elements";

export const LOCATION_HEIGHT = 40;

class Location extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectParishModalVisible: false,
      path: ""
    };
    this.setNearByQuery = this.setNearByQuery.bind(this);
    this.toggleSelectParishModal = this.toggleSelectParishModal.bind(this);
    this.handleInpText = this.handleInpText.bind(this);
    this.handleParishSearch = this.handleParishSearch.bind(this);
    this.clearSelectedParish = this.clearSelectedParish.bind(this);
  }
  componentDidMount() {
    this.props.getParishes();
  }
  setNearByQuery() {
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
        this.props.handleCenterSearch();
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  toggleSelectParishModal() {
    this.props.cleanParishes();
    this.setState({ selectParishModalVisible: !this.state.selectParishModalVisible });
  }
  handleParishSearch() {
    const { path } = this.state;
    this.props.getParishes({ path });
  }
  handleInpText(path) {
    this.setState({ path });
  }
  async clearSelectedParish() {
    await this.props.clearSelectedParish();
    this.props.handleCenterSearch();
  }

  render() {
    const { getParishes, setSelectedParish, parishes, setParish, handleCenterSearch } = this.props;
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
          title={
            this.props.searches.selectedParish.fullPath
              ? this.props.searches.selectedParish.fullPath
              : "یک موقعیت انتخاب کنید"
          }
          onPress={this.toggleSelectParishModal}
        />
        {this.props.searches.selectedParish.fullPath && (
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
        <View style={locationStyle.iconNearByContainer}>
          {this.props.searches.nearSearch && (
            <View
              style={{
                backgroundColor: teamcheColors.royal,
                height: 25,
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingEnd: 15,
                marginEnd: -15
              }}
            >
              <Text style={[MyStyles.textBase, { color: teamcheColors.lightPink, paddingTop: 3 }]}>نزدیکترین ها</Text>
            </View>
          )}
          <Icon
            reverse
            raised
            name="location"
            type="evilicon"
            size={18}
            iconStyle={{ fontSize: 22 }}
            color={this.props.searches.nearSearch ? teamcheColors.royal : teamcheColors.lightPink}
            reverseColor={this.props.searches.nearSearch ? teamcheColors.lightPink : teamcheColors.purple}
            onPress={this.setNearByQuery}
          />
        </View>

        <SelectParishModal
          toggleModal={this.toggleSelectParishModal}
          isModalVisible={this.state.selectParishModalVisible}
          getParishes={getParishes}
          setSelectedParish={setSelectedParish}
          parishes={parishes}
          inpValue={this.state.path}
          handleInpText={this.handleInpText}
          handleParishSearch={this.handleParishSearch}
          handleCenterSearch={handleCenterSearch}
          setParish={setParish}
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
  selectedParishText: { marginStart: 6, marginEnd: 30, color: teamcheColors.lightPink },
  iconNearByContainer: {
    position: "absolute",
    end: 5,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Location;

import React from "react";
import { View, StyleSheet } from "react-native";
import MyStyles, { teamcheColors } from "../../styles/MyStyles";
import SelectParishModal from "../../component/modals/SelectParishModal";
import { Text, Button, Icon } from "react-native-elements";

export const LOCATION_HEIGHT = 40;

class Location extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectParishModalVisible: false,
      path: ""
    };
    this.toggleSelectParishModal = this.toggleSelectParishModal.bind(this);
    this.handleInpText = this.handleInpText.bind(this);
    this.handleParishSearch = this.handleParishSearch.bind(this);
    this.clearSelectedParish = this.clearSelectedParish.bind(this);
  }
  componentDidMount() {
    this.props.getParishes();
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
          title="انتخاب موقعیت"
          onPress={this.toggleSelectParishModal}
        />
        <View style={locationStyle.selectedParishContainer}>
          {this.props.searches.selectedParish.fullPath ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                reverse
                name="close"
                type="font-awesome"
                size={8}
                color={teamcheColors.dullRed}
                onPress={this.clearSelectedParish}
              />
              <Text style={[MyStyles.textBase, locationStyle.selectedParishText, { marginStart: 0 }]}>
                {this.props.searches.selectedParish.fullPath}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={[MyStyles.textBase, locationStyle.selectedParishText]}>یک موقعیت انتخاب کنید</Text>
            </View>
          )}
        </View>
        <Icon
          containerStyle={locationStyle.iconNearByContainer}
          raised
          name="location"
          type="evilicon"
          size={15}
          color={teamcheColors.dullRed}
          // onPress={this.clearSelectedParish}
        />

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
    end: 5
  }
});

export default Location;

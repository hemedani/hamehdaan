import React from "react";
import { View } from "react-native";
import MyStyles, { teamcheColors } from "../../styles/MyStyles";
import SelectParishModal from "../../component/modals/SelectParishModal";
import { Text, Button } from "react-native-elements";

export const LOCATION_HEIGHT = 40;

class Location extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectParishModalVisible: false
    };
    this.toggleSelectParishModal = this.toggleSelectParishModal.bind(this);
  }
  componentDidMount() {
    this.props.getParishes();
  }
  toggleSelectParishModal() {
    this.setState({ selectParishModalVisible: !this.state.selectParishModalVisible });
  }
  render() {
    const { getParishes, cleanParishes, setSelectedParish, parishes } = this.props;
    return (
      <View
        style={{
          height: LOCATION_HEIGHT,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15
        }}
      >
        {/* <Header {...props} /> */}
        <Button
          type="outline"
          rightIcon={{ color: "white", name: "envira", type: "font-awesome" }}
          buttonStyle={{
            borderColor: teamcheColors.purple,
            marginHorizontal: 5
          }}
          titleStyle={{
            color: teamcheColors.purple,
            fontFamily: "Shabnam-FD",
            fontSize: 12,
            padding: 0
          }}
          title="انتخاب موقعیت"
          onPress={this.toggleSelectParishModal}
        />
        <View
          style={{
            height: 35,
            marginStart: 4,
            borderStartWidth: 1,
            borderStartColor: teamcheColors.darkerGray,
            justifyContent: "center"
          }}
        >
          <Text style={[MyStyles.textBase, { marginStart: 10 }]}>
            {this.props.parishes.parishes.length > 0 ? this.props.parishes.parishes[0].fullPath : "یک موقعیت انتخاب کنید"}
          </Text>
        </View>

        <SelectParishModal
          toggleModal={this.toggleSelectParishModal}
          isModalVisible={this.state.selectParishModalVisible}
          getParishes={getParishes}
          cleanParishes={cleanParishes}
          setSelectedParish={setSelectedParish}
          parishes={parishes}
        />
      </View>
    );
  }
}

export default Location;

import React from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text, Image, Alert, FlatList } from "react-native";

import teamcheStyle, { teamcheColors } from "../styles/MyStyles";
import FlatBtn from "./utils/FlatBtn";
import { RU } from "../actions/RootTypes";
import { detailsStyles } from "./Details";

class CenterDocs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderTitle = this.renderTitle.bind(this);
    this.addPhotoModal = this.addPhotoModal.bind(this);
  }
  static navigationOptions = {
    title: "مدارک صنف",
    headerTitleStyle: {
      fontFamily: "Shabnam-FD"
    }
  };
  addPhotoModal() {
    const { center } = this.props.center;
    const whichDoc = this.props.navigation.getParam("whichDoc", "offerDocs");
    this.props.navigation.navigate("AddPhotoToCenter", { center: center, whichPic: whichDoc });
  }

  renderTitle() {
    const whichDoc = this.props.navigation.getParam("whichDoc", "offerDocs");
    if (whichDoc === "offerDocs") {
      return "ارائه شده";
    } else if (whichDoc === "inquiryDocs") {
      return "استعلام شده";
    }
    return "";
  }

  render() {
    const whichDoc = this.props.navigation.getParam("whichDoc", "offerDocs");
    const { offerDocs, inquiryDocs } = this.props.center.center;
    return (
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center" }}>
            <Text style={[teamcheStyle.textBase]}>مدارک {this.renderTitle()} </Text>
          </View>

          <View style={{ width: "90%" }}>
            <FlatBtn title="بارگزاری عکس" onPress={this.addPhotoModal} />
            <View style={{ alignItems: "center" }}>
              <FlatList
                style={{ backgroundColor: teamcheColors.lightGray, width: "100%" }}
                data={whichDoc === "offerDocs" ? offerDocs : inquiryDocs}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <View style={detailsStyles.mapView}>
                    <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: `${RU}/pic/800/${item}` }} />
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const msp = ({ center }) => ({ center });
export default connect(msp)(CenterDocs);

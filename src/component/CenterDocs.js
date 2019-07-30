import React from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text, Image, Alert, FlatList, TouchableOpacity } from "react-native";

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
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 85,
            alignItems: "center",
            backgroundColor: teamcheColors.gray,
            borderBottomColor: teamcheColors.purple,
            borderBottomWidth: 1,
            paddingTop: 45
          }}
        >
          <Text style={[teamcheStyle.textBase, teamcheStyle.textTitr]}>مدارک صنف</Text>
        </View>
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
                    <TouchableOpacity
                      style={detailsStyles.mapView}
                      onPress={() => this.props.navigation.navigate("ImageLightBox", { image: item })}
                    >
                      <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: `${RU}/pic/500/${item}` }} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const msp = ({ center }) => ({ center });
export default connect(msp)(CenterDocs);

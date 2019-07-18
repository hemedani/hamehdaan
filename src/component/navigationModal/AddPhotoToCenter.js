import React, { PureComponent } from "react";
import { View, Text, Platform, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";

import BaseModalNavigation from "./BaseModalNavigation";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import FlatBtn from "../utils/FlatBtn";

import { addPicToCenter } from "../../actions";

class AddPhotoToCenter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }
  componentDidMount() {
    this.handleChoosePhoto();
  }

  handleChoosePhoto() {
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  }
  async handleUpload() {
    const { photo } = this.state;
    if (photo) {
      const file = {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      };
      const whichPic = this.props.navigation.getParam("whichPic", "centerPics");
      const { _id } = this.props.center.center;

      await this.props.addPicToCenter(file, { _id, whichPic });
      this.props.navigation.goBack();
    } else {
      return;
    }
  }
  renderTitle() {
    const whichPic = this.props.navigation.getParam("whichPic", "centerPics");
    if (whichPic === "offerDocs") {
      return "مدارک ارائه شده";
    } else if (whichPic === "inquiryDocs") {
      return "مدارک استعلام شده";
    } else if (whichPic === "centerPics") {
      return "مرکز";
    }
    return "";
  }
  render() {
    const { photo } = this.state;
    return (
      <BaseModalNavigation headerTxt="افزودن عکس به صنف" goBack={this.props.navigation.goBack}>
        <Text style={[teamcheStyle.textBase]}>افزودن عکس به {this.renderTitle()} </Text>
        <View style={styles.parentContainer}>
          {photo && <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300, alignSelf: "center" }} />}
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <FlatBtn title="انتخاب عکس" onPress={this.handleChoosePhoto} bgColor={teamcheColors.purple} />
            <FlatBtn
              title="بارگزاری عکس"
              onPress={this.handleUpload}
              bgColor={teamcheColors.royal}
              loading={this.props.center.picLoading}
            />
          </View>
        </View>
      </BaseModalNavigation>
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    minHeight: 250,
    justifyContent: "flex-end"
  }
});

const msp = ({ center }) => ({ center });

export default connect(
  msp,
  { addPicToCenter }
)(AddPhotoToCenter);

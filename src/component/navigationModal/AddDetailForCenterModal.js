import React, { PureComponent } from "react";
import { View, Text, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";

import BaseModalNavigation from "./BaseModalNavigation";
import PersianDatePicker from "rn-persian-date-picker";

import { addPicToCenter } from "../../actions";

class AddDetailForCenterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null
    };
  }

  render() {
    const { selectedDate } = this.state;
    return (
      <BaseModalNavigation headerTxt="افزودن جزئیات به صنف" goBack={this.props.navigation.goBack}>
        <TouchableOpacity onPress={() => this.picker.showPicker()}>
          <View style={{ height: 80, width: 180, backgroundColor: "red" }}>
            {selectedDate && <Text>{selectedDate.format("jYYYY/jMM/jDD")} </Text>}
          </View>
        </TouchableOpacity>
        <PersianDatePicker
          type="Jalali"
          yearCount={15}
          minDate="1360/08/08"
          onConfirm={selectedDate => this.setState({ selectedDate })}
          ref={ref => (this.picker = ref)}
        />
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
)(AddDetailForCenterModal);

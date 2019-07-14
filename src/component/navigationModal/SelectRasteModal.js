import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";

import {
  cleanCenters,
  getCenters,
  getRastes,
  addRasteToQuery,
  setSelectedRasteForAddCenter
} from "../../actions";

import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";
import BaseModalNavigation from "./BaseModalNavigation";
import { bodyStyle, searchBarStyles } from "./SelectParishModal";

const colors = [teamcheColors.gray, teamcheColors.lightGray];

const RenderRasteItem = ({
  item,
  index,
  setAddCenterForm,
  setSelectedRasteForAddCenter,
  addRasteToQuery,
  handleCenterSearch,
  goBack
}) => {
  const handleRasteSelect = async () => {
    setAddCenterForm
      ? await setSelectedRasteForAddCenter(item)
      : await addRasteToQuery(item);
    handleCenterSearch();
    goBack();
  };
  return (
    <TouchableOpacity
      onPress={handleRasteSelect}
      style={[
        bodyStyle.flatItemContainer,
        { backgroundColor: colors[index % colors.length] }
      ]}
    >
      <Text style={[teamcheStyle.textBase, bodyStyle.itemText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

class SelectRasteModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inpValue: "",
      setAddCenterForm: false
    };
    this.handleInpText = this.handleInpText.bind(this);
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
    this.handleRasteSearch = this.handleRasteSearch.bind(this);
  }
  componentDidMount() {
    this.props.getRastes();
    this.setState({
      setAddCenterForm: this.props.navigation.getParam(
        "setAddCenterForm",
        false
      )
    });
  }
  handleInpText(inpValue) {
    this.setState({ inpValue });
  }

  handleRasteSearch() {
    this.props.getRastes({ name: this.state.inpValue });
  }

  async handleCenterSearch() {
    if (this.state.setAddCenterForm) {
      return;
    } else {
      await this.props.cleanCenters();
      this.props.getCenters(this.props.searches.query);
    }
  }

  render() {
    const {
      rastes: { rastes },
      setSelectedRasteForAddCenter
    } = this.props;
    const { setAddCenterForm } = this.state;
    return (
      <BaseModalNavigation
        headerTxt="انتخاب رسته"
        goBack={this.props.navigation.goBack}
      >
        <View style={searchBarStyles.searchViewContainer}>
          <TextInput
            style={[teamcheStyle.textBase, searchBarStyles.textInp]}
            placeholder="یک محله را جستجو کنید ..."
            onChangeText={this.handleInpText}
            value={this.state.inpValue}
            onSubmitEditing={this.handleRasteSearch}
          />
          <Icon
            containerStyle={searchBarStyles.iconContainer}
            name="search"
            type="font-awesome"
            color={teamcheColors.cornFlowerBlue}
            onPress={this.handleRasteSearch}
          />
        </View>
        <FlatList
          style={bodyStyle.flatContainer}
          data={rastes}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <RenderRasteItem
              item={item}
              index={index}
              setAddCenterForm={setAddCenterForm}
              setSelectedRasteForAddCenter={setSelectedRasteForAddCenter}
              addRasteToQuery={this.props.addRasteToQuery}
              handleCenterSearch={this.handleCenterSearch}
              goBack={this.props.navigation.goBack}
            />
          )}
        />
      </BaseModalNavigation>
    );
  }
}

const msp = ({ rastes, searches }) => ({ rastes, searches });

export default connect(
  msp,
  {
    getRastes,
    addRasteToQuery,
    cleanCenters,
    getCenters,
    setSelectedRasteForAddCenter
  }
)(SelectRasteModal);

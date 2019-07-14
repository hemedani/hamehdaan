import React from "react";
import { connect } from "react-redux";
import { Text, TouchableOpacity, FlatList } from "react-native";

import { cleanCenters, getCenters, addGuildStatusToQuery } from "../../actions";

import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import BaseModalNavigation from "./BaseModalNavigation";
import { bodyStyle } from "./SelectParishModal";
import { guildStatusEnToFa } from "../utils/Filters";

const colors = [teamcheColors.gray, teamcheColors.lightGray];

const guildStatus = [
  "warning27",
  "shutdownPromise",
  "applicant",
  "offerDoc",
  "commissionConfirm",
  "directorAccept",
  "docInquiry",
  "paySettle",
  "payElectronicCard",
  "issueLicense",
  "receiveLicense",
  "plump"
];

const RenderRasteItem = ({
  item,
  index,
  addGuildStatusToQuery,
  handleCenterSearch,
  goBack
}) => {
  const handleSearch = async () => {
    await addGuildStatusToQuery(item);
    handleCenterSearch();
    goBack();
  };
  return (
    <TouchableOpacity
      onPress={handleSearch}
      style={[
        bodyStyle.flatItemContainer,
        { backgroundColor: colors[index % colors.length] }
      ]}
    >
      <Text style={[teamcheStyle.textBase, bodyStyle.itemText]}>
        {guildStatusEnToFa(item)}
      </Text>
    </TouchableOpacity>
  );
};

class SelectGuildStatusModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleCenterSearch = this.handleCenterSearch.bind(this);
  }

  async handleCenterSearch() {
    await this.props.cleanCenters();
    this.props.getCenters(this.props.searches.query);
  }

  render() {
    return (
      <BaseModalNavigation
        headerTxt="انتخاب وضعیت صنف"
        goBack={this.props.navigation.goBack}
      >
        <FlatList
          style={bodyStyle.flatContainer}
          data={guildStatus}
          keyExtractor={item => item}
          renderItem={({ item, index }) => (
            <RenderRasteItem
              item={item}
              index={index}
              addGuildStatusToQuery={this.props.addGuildStatusToQuery}
              handleCenterSearch={this.handleCenterSearch}
              goBack={this.props.navigation.goBack}
            />
          )}
        />
      </BaseModalNavigation>
    );
  }
}

const msp = ({ searches }) => ({ searches });

export default connect(
  msp,
  { addGuildStatusToQuery, cleanCenters, getCenters }
)(SelectGuildStatusModal);

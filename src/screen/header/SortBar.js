import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import MyStyles, { teamcheColors } from "../../styles/MyStyles";
import { Icon } from "react-native-elements";
import SelectSortModal from "../../component/modals/SelectSortModal";

export const SORT_BAR_HEIGHT = 45;
class SortBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectSortModalVisible: false
    };
    this.toggleSelectSortModal = this.toggleSelectSortModal.bind(this);
    this.cleanSortQuery = this.cleanSortQuery.bind(this);
  }

  toggleSelectSortModal() {
    this.setState({ selectSortModalVisible: !this.state.selectSortModalVisible });
  }
  async cleanSortQuery() {
    await this.props.cleanSortQuery();
    this.props.handleCenterSearch();
  }
  render() {
    const {
      searches,
      handleCenterSearch,
      removeRasteFromQuery,

      setSortQuery
    } = this.props;
    return (
      <View
        style={{
          height: SORT_BAR_HEIGHT,
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 4
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            type="outline"
            icon={{ color: "white", name: "sort", type: "font-awesome", size: 14 }}
            buttonStyle={{
              borderColor: teamcheColors.lightPink,
              marginHorizontal: 5
            }}
            titleStyle={{
              color: teamcheColors.lightPink,
              fontFamily: "Shabnam-FD",
              fontSize: 12,
              padding: 0
            }}
            title={searches.sortName ? searches.sortName : "مرتب سازی"}
            onPress={this.toggleSelectSortModal}
          />
          {searches.query.sort && (
            <Icon
              reverse
              name="close"
              type="font-awesome"
              size={8}
              color={teamcheColors.dullRed}
              onPress={this.cleanSortQuery}
            />
          )}
        </View>
        <View style={{ borderStartWidth: 1, borderStartColor: teamcheColors.lightPink }} />
        <ScrollView horizontal={true}>
          <Button
            type="outline"
            icon={{
              name: "plus",
              type: "font-awesome",
              color: "white",
              size: 14
            }}
            buttonStyle={{
              borderColor: teamcheColors.lightPink,
              marginHorizontal: 5
            }}
            titleStyle={{
              color: teamcheColors.lightPink,
              fontFamily: "Shabnam-FD",
              fontSize: 12,
              padding: 0
            }}
            title="رسته"
            onPress={() => this.props.navigate("SelectRasteModal")}
          />
          {searches.rastes.length > 0 &&
            searches.rastes.map(raste => (
              <Button
                key={raste._id}
                type="outline"
                icon={{
                  name: "minus",
                  type: "font-awesome",
                  color: teamcheColors.darkerGray,
                  size: 14
                }}
                buttonStyle={{
                  borderColor: teamcheColors.darkerGray,
                  marginHorizontal: 5
                }}
                titleStyle={{
                  color: teamcheColors.darkerGray,
                  fontFamily: "Shabnam-FD",
                  fontSize: 12,
                  padding: 0
                }}
                title={raste.name}
                onPress={async () => {
                  await removeRasteFromQuery(raste);
                  handleCenterSearch();
                }}
              />
            ))}
        </ScrollView>

        <SelectSortModal
          toggleModal={this.toggleSelectSortModal}
          isModalVisible={this.state.selectSortModalVisible}
          handleCenterSearch={handleCenterSearch}
          setSortQuery={setSortQuery}
        />
      </View>
    );
  }
}

export default SortBar;

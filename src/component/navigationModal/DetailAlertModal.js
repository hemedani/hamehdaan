import React from "react";
import { View, Text, ScrollView } from "react-native";

import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";
import { detailsStyles } from "../Details";
import moment from "moment-jalaali";
import BaseModalNavigation from "./BaseModalNavigation";
import RenderAlert from "../jobParts/RenderAlert";
import { guildStatusEnToFa } from "../utils/Filters";

const RenderItem = ({ itemDate, itemText, validDate }) => (
  <View
    style={[
      detailsStyles.addressContainer,
      {
        marginTop: 0,
        height: 52,
        justifyContent: "center",
        paddingEnd: validDate && moment().diff(moment(itemDate), "days") > validDate ? 45 : 5,
        paddingStart: 5,
        marginBottom: 5,
        borderWidth: 1.4,
        borderColor:
          validDate && moment().diff(moment(itemDate), "days") > validDate
            ? teamcheColors.dullRed
            : teamcheColors.seaFoam
      }
    ]}
  >
    <Text style={teamcheStyle.textBase}>
      {itemText} {moment().diff(moment(itemDate), "days")} روز گذشته است
    </Text>
    {validDate && moment().diff(moment(itemDate), "days") > validDate && <RenderAlert />}
  </View>
);

const DetailAlertModal = ({ navigation }) => {
  const item = navigation.getParam("item", {});
  const {
    membershipFeeDate,
    guildStatus,
    warning27Date,
    createdAt,
    updatedAt,
    issueDate,
    expirationDate,
    shutdownPromiseDate
  } = item;
  return (
    <BaseModalNavigation headerTxt="جزئیات اخطارها" goBack={navigation.goBack}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {createdAt && <RenderItem itemDate={createdAt} itemText="از ثبت این صنف در سامانه " />}
        {updatedAt && <RenderItem itemDate={updatedAt} itemText="از آخرین بروزرسانی این صنف در سامانه " />}
        {issueDate && <RenderItem itemDate={issueDate} itemText="از تاریخ صدور پروانه کسب " />}
        {expirationDate && (
          <RenderItem itemDate={expirationDate} itemText="از تاریخ انقضاء پروانه کسب " validDate={1} />
        )}
        {membershipFeeDate && (
          <RenderItem itemDate={membershipFeeDate} itemText="از آخرین پرداخت حق عضویت" validDate={365} />
        )}
        {guildStatus === "warning27" && warning27Date && (
          <RenderItem
            itemDate={warning27Date}
            itemText={`صنف در ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={10}
          />
        )}
        {guildStatus === "shutdownPromise" && shutdownPromiseDate && (
          <RenderItem
            itemDate={shutdownPromiseDate}
            itemText={`صنف در ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={20}
          />
        )}
      </ScrollView>
    </BaseModalNavigation>
  );
};

export default DetailAlertModal;

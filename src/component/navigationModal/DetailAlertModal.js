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
        paddingEnd: 45,
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
      {itemText} {itemDate && moment().diff(moment(itemDate), "days") + "  روز گذشته است"}
    </Text>
    <RenderAlert tick={validDate && moment().diff(moment(itemDate), "days") > validDate ? false : true} />
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
    shutdownPromiseDate,

    applicantDate,
    offerDocDate,
    commissionConfirmDate,
    directorAcceptDate,
    docInquiryDate,
    paySettleDate,
    payElectronicCardDate,
    issueLicenseDate,
    receiveLicenseDate,
    plumpDate
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
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={10}
          />
        )}
        {guildStatus === "shutdownPromise" && shutdownPromiseDate && (
          <RenderItem
            itemDate={shutdownPromiseDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={20}
          />
        )}
        {guildStatus === "applicant" && applicantDate && (
          <RenderItem
            itemDate={applicantDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={15}
          />
        )}
        {guildStatus === "offerDoc" && offerDocDate && (
          <RenderItem
            itemDate={offerDocDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={15}
          />
        )}
        {guildStatus === "commissionConfirm" && commissionConfirmDate && (
          <RenderItem
            itemDate={commissionConfirmDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={10}
          />
        )}
        {guildStatus === "directorAccept" && directorAcceptDate && (
          <RenderItem
            itemDate={directorAcceptDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={10}
          />
        )}
        {guildStatus === "docInquiry" && docInquiryDate && (
          <RenderItem
            itemDate={docInquiryDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={15}
          />
        )}
        {guildStatus === "paySettle" && paySettleDate && (
          <RenderItem
            itemDate={paySettleDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={5}
          />
        )}
        {guildStatus === "payElectronicCard" && payElectronicCardDate && (
          <RenderItem
            itemDate={payElectronicCardDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={10}
          />
        )}
        {guildStatus === "receiveLicense" && (
          <RenderItem
            itemDate={receiveLicenseDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است ${
              receiveLicenseDate ? "و از تاریخ ثبت این ماده" : ""
            }`}
          />
        )}
        {guildStatus === "issueLicense" && issueLicenseDate && (
          <RenderItem
            itemDate={issueLicenseDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={20}
          />
        )}
        {guildStatus === "plump" && plumpDate && (
          <RenderItem
            itemDate={plumpDate}
            itemText={`صنف در وضعیت ${guildStatusEnToFa(guildStatus)} است و از تاریخ ثبت این ماده`}
            validDate={10}
          />
        )}
        {guildStatus !== "receiveLicense" &&
          guildStatus !== "issueLicense" &&
          moment().diff(moment(createdAt), "days") > 45 && (
            <RenderItem
              itemDate={createdAt}
              itemText={`برای این صنف هنوز پروانه صادر و تحویل نشده است و از تاریخ ثبت اطلاعات آن `}
              validDate={45}
            />
          )}
      </ScrollView>
    </BaseModalNavigation>
  );
};

export default DetailAlertModal;

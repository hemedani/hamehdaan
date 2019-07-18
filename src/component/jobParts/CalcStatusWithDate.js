import moment from "moment-jalaali";
import { guildStatusEnToFa } from "../utils/Filters";

const calcStatusWithDate = item => {
  let returnedStatus = "";
  if (item.guildStatus === "warning27")
    item.warning27Date
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.warning27Date).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "shutdownPromise")
    item.shutdownPromiseDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(
          item.shutdownPromiseDate
        ).format("jYYYY/jM/jD")}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "applicant")
    item.applicantDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.applicantDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "offerDoc")
    item.offerDocDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.offerDocDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "commissionConfirm")
    item.commissionConfirmDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(
          item.commissionConfirmDate
        ).format("jYYYY/jM/jD")}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "directorAccept")
    item.directorAcceptDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.directorAcceptDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "docInquiry")
    item.docInquiryDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.docInquiryDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "paySettle")
    item.paySettleDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.paySettleDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "payElectronicCard")
    item.payElectronicCardDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(
          item.payElectronicCardDate
        ).format("jYYYY/jM/jD")}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "issueLicense")
    item.issueLicenseDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.issueLicenseDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "receiveLicense")
    item.receiveLicenseDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.receiveLicenseDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  if (item.guildStatus === "plump")
    item.plumpDate
      ? (returnedStatus = `${guildStatusEnToFa(item.guildStatus)} - در تاریخ : ${moment(item.plumpDate).format(
          "jYYYY/jM/jD"
        )}`)
      : (returnedStatus = guildStatusEnToFa(item.guildStatus));

  return returnedStatus;
};

export default calcStatusWithDate;

export const guildStatusEnToFa = guildStatus => {
  switch (guildStatus) {
    case "warning27":
      return "اخطار ماده ۲۷";
    case "shutdownPromise":
      return "تعهد جمع آوری";
    case "applicant":
      return "درخواست پروانه";
    case "offerDoc":
      return "ارائه مدارک";
    case "commissionConfirm":
      return "موافقت کمیسیون بازرسی و درجه صنفی";
    case "directorAccept":
      return "موافقت هیأت مدیره";
    case "docInquiry":
      return "استعلام مدارک";
    case "paySettle":
      return "پرداخت فیش های واریزی";
    case "payElectronicCard":
      return "پرداخت فیش الکترونیک";
    case "issueLicense":
      return "صدور پروانه کسب";
    case "receiveLicense":
      return "دریافت پروانه کسب";
    case "plump":
      return "پلمپ";

    default:
      return "";
  }
};

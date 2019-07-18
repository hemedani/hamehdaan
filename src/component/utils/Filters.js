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

    case "name":
      return "نام";
    case "personType":
      return "نوع شخص";
    case "activityType":
      return "نوع فعالیت";
    case "postalCode":
      return "کد پستی";
    case "guildOwnerName":
      return "نام صاحب پروانه";
    case "guildOwnerFamily":
      return "نام خانوادگی صاحب پروانه";
    case "ownerFatherName":
      return "نام پدر صاحب پروانه";
    case "nationalCode":
      return "کد ملی صاحب پروانه";
    case "guildOwnerPhoneNumber":
      return "شماره تلفن همراه";
    case "text":
      return "آدرس";

    default:
      return "";
  }
};

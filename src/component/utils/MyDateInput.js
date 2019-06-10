import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PersianDatePicker from "rn-persian-date-picker";
import moment from "moment-jalaali";
import teamcheStyle from "../../styles/MyStyles";
import { myInputStyles } from "./MyInput";

const MyDateInput = ({ value, label, setFieldValue, name, minDate }) => {
  const handleChangeDate = value => setFieldValue(name, value);
  let picker = null;
  return (
    <View style={myInputStyles.root}>
      {label && <Text style={[teamcheStyle.textBase, myInputStyles.myInpLabel]}>{label}</Text>}
      <TouchableOpacity onPress={() => picker.showPicker()} style={[myInputStyles.textInp, { padding: 10 }]}>
        {value && <Text style={teamcheStyle.textBase}>{moment(value).format("jYYYY/jMM/jDD")} </Text>}
      </TouchableOpacity>
      <PersianDatePicker
        type="Jalali"
        yearCount={15}
        minDate={minDate ? minDate : "1360/01/01"}
        onConfirm={handleChangeDate}
        ref={ref => (picker = ref)}
      />
    </View>
  );
};

export default MyDateInput;

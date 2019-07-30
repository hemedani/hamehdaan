import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { bodyStyle } from "./navigationModal/SelectParishModal";
import teamcheStyle, { teamcheColors } from "../styles/MyStyles";

const colors = [teamcheColors.gray, teamcheColors.lightGray];

const Report = ({ item, index, navigate }) => {
  const handleReportSelect = () => navigate("DetailReportModal", { _id: item._id });
  return (
    <TouchableOpacity
      onPress={handleReportSelect}
      style={[bodyStyle.flatItemContainer, { backgroundColor: colors[index % colors.length] }]}
    >
      <Text style={[teamcheStyle.textBase, bodyStyle.itemText]}>{item.subject}</Text>
    </TouchableOpacity>
  );
};

export default Report;

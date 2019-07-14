import React from "react";
import { Button } from "react-native-elements";
import { teamcheColors } from "../../styles/MyStyles";

const FlatBtn = ({ job, navigate, path, title, icon, onPress, bgColor, loading, btnColor, borColor }) => {
  const handleOnPress = () => (navigate ? navigate(path, { job }) : onPress());
  return (
    <Button
      icon={icon ? { name: icon, type: "evilicon", color: "white" } : null}
      containerStyle={{
        flex: 1,
        marginBottom: 8
      }}
      buttonStyle={{
        borderRadius: 3,
        borderWidth: 1,
        borderColor: borColor ? borColor : teamcheColors.purple,
        height: 40,
        backgroundColor: bgColor ? bgColor : teamcheColors.purple
      }}
      titleStyle={{
        fontFamily: "Shabnam-FD",
        fontSize: 13,
        color: btnColor ? btnColor : teamcheColors.lightPink
      }}
      title={title}
      loading={loading ? loading : null}
      onPress={handleOnPress}
    />
  );
};

export default FlatBtn;

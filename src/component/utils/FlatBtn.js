import React from "react";
import { Button } from "react-native-elements";
import { teamcheColors } from "../../styles/MyStyles";

const FlatBtn = ({ job, navigate, path, title, icon, onPress, bgColor, loading }) => {
  const handleOnPress = () => (navigate ? navigate(path, { job }) : onPress());
  return (
    <Button
      icon={icon ? { name: icon, type: "evilicon", color: "white" } : null}
      containerStyle={{
        flex: 1
      }}
      buttonStyle={{
        borderRadius: 0,
        height: 40,
        backgroundColor: bgColor ? bgColor : teamcheColors.purple
      }}
      titleStyle={{
        fontFamily: "Shabnam-FD",
        fontSize: 13
      }}
      title={title}
      loading={loading ? loading : null}
      onPress={handleOnPress}
    />
  );
};

export default FlatBtn;

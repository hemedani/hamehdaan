import React from "react";
import { Button } from "react-native-elements";

const ButtonPerple = ({ job, navigate, path, title }) => {
  const handleOnPress = () => navigate(path, { job });
  return (
    <Button
      raised
      rightIcon={{ color: "white", name: "envira", type: "font-awesome" }}
      buttonStyle={{
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 50,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: "rgb(112, 26, 146)"
      }}
      titleStyle={{
        fontFamily: "Shabnam-FD"
      }}
      title={title}
      onPress={handleOnPress}
    />
  );
};

export default ButtonPerple;

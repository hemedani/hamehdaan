import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import call from "react-native-phone-call";

import BaseModalNavigation from "./BaseModalNavigation";

const PhoneCallModal = ({ navigation }) => {
  const phone = navigation.getParam("phone", []);
  return (
    <BaseModalNavigation headerTxt="تماس سریع" goBack={navigation.goBack}>
      <View style={styles.parentContainer}>
        {phone.map(p => (
          <TouchableOpacity
            key={p}
            onPress={() =>
              call({ number: `${p}`, prompt: false }).catch(console.error)
            }
          >
            <Text>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BaseModalNavigation>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PhoneCallModal;

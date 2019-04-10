import AsyncStorage from "@react-native-community/async-storage";
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const setItem = async (key, token) => {
  try {
    return await AsyncStorage.setItem(key, token);
  } catch (error) {
    return null;
  }
};

export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const removeItem = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export const getStoreUser = async () => {
  try {
    return await AsyncStorage.getItem("user");
  } catch (error) {
    return null;
  }
};

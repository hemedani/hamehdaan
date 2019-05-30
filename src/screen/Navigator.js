import React from "react";
import { Animated, Easing } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import ListJobsScreen from "../component/ListJobs";
import LoginScreen from "../component/Login";
import WelcomeScreen from "../component/Welcome";
import DetailsScreen from "../component/Details";
import SettingsScreen from "../component/Setting";
import AboutUsScreen from "../component/AboutUs";
import CustomHeader from "./header/CustomHeader";
import { teamcheColors } from "../styles/MyStyles";
import CenterReportsScreen from "../component/CenterReports";
import DetailReportModal from "../component/navigationModal/DetailReportModal";
import SelectRasteModal from "../component/navigationModal/SelectRasteModal";
import MapDirectionModal from "../component/navigationModal/MapDirectionModal";
import PhoneCallModal from "../component/navigationModal/PhoneCallModal";
import AddPhotoToCenter from "../component/navigationModal/AddPhotoToCenter";
import AddReportModal from "../component/navigationModal/AddReportModal";

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-layout.initWidth, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
        outputRange: [0, 1, 1, 0.3, 0]
      });

      return { opacity, transform: [{ translateX }] };
    }
  };
};

const ModalTransitionConfig = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { position, scene } = sceneProps;
    const { index } = scene;

    const opacity = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [0, 1]
    });

    return { opacity };
  }
});

const Jobs = createStackNavigator({
  Jobs: {
    screen: ListJobsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: props => <CustomHeader {...props} />,
        headerStyle: {
          backgroundColor: "transparent"
        }
      };
    }
  }
});

const JobsWithModals = createStackNavigator(
  {
    Jobs,
    SelectRasteModal
  },
  {
    initialRouteName: "Jobs",
    transparentCard: true,
    mode: "modal",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: true,
      title: "اصناف",
      labelStyle: {
        fontFamily: "Shabnam-FD"
      }
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { position, scene } = sceneProps;
        const { index } = scene;

        const opacity = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [0, 1]
        });

        return { opacity };
      }
    })
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    JobsWithModals,
    Settings: SettingsScreen,
    AboutUs: AboutUsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "JobsWithModals") {
          iconName = `ios-apps`;
        } else if (routeName === "Settings") {
          iconName = `ios-options`;
        } else if (routeName === "AboutUs") {
          iconName = `ios-contact`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    navigationOptions: {
      gesturesEnabled: true,
      headerMode: "none",
      header: null,
      headerBackTitle: null,
      animationEnabled: true
    },
    tabBarOptions: {
      labelStyle: {
        fontFamily: "Shabnam-FD"
      },

      activeTintColor: "rgb(112, 26, 146)",
      inactiveTintColor: "gray"
    }
  }
);

const CenterReports = createStackNavigator(
  {
    CenterReports: CenterReportsScreen,
    DetailReportModal
  },
  {
    initialRouteName: "CenterReports",
    transparentCard: true,
    mode: "modal",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: true
    },
    transitionConfig: () => ModalTransitionConfig()
  }
);

const DetailStack = createStackNavigator(
  {
    Details: DetailsScreen,
    MapDirectionModal,
    PhoneCallModal,
    AddPhotoToCenter,
    AddReportModal
  },
  {
    initialRouteName: "Details",
    transparentCard: true,
    mode: "modal",
    headerMode: "none",
    navigationOptions: {
      headerTintColor: teamcheColors.lightPink,
      gesturesEnabled: true,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 }
    },
    transitionConfig: ModalTransitionConfig
  }
);

const AppStack = createStackNavigator(
  {
    Home: TabNavigator,
    Details: DetailStack,
    CenterReports
  },
  {
    transitionConfig: () => TransitionConfiguration()
  }
);

const AuthStack = createStackNavigator({
  SignIn: {
    screen: LoginScreen,
    navigationOptions: {
      gesturesEnabled: true,
      headerMode: "none",
      header: null
    }
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Welcome: WelcomeScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Welcome"
    }
  )
);

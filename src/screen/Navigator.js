import React from "react";
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
    mode: "modal",
    headerMode: "none",
    transparentCard: true,
    navigationOptions: {
      title: "اصناف",
      labelStyle: {
        fontFamily: "Shabnam-FD"
      }
    }
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
    mode: "modal",
    headerMode: "none"
  }
);

const AppStack = createStackNavigator({
  Home: TabNavigator,
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTintColor: teamcheColors.lightPink
    }
  },
  CenterReports
});

const AuthStack = createStackNavigator({
  SignIn: {
    screen: LoginScreen,
    navigationOptions: {
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

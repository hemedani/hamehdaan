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

const TabNavigator = createBottomTabNavigator(
  {
    Jobs: ListJobsScreen,
    Settings: SettingsScreen,
    AboutUs: AboutUsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Jobs") {
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
      header: props => <CustomHeader {...props} />,
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff"
      },
      headerTintColor: "#fff",
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

const AppStack = createStackNavigator({
  Home: TabNavigator,
  Details: DetailsScreen
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

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Login: {
//       screen: LoginScreen,
//       navigationOptions: {
//         headerMode: "none",
//         header: null
//       }
//     },
//     Welcome: {
//       screen: WelcomeScreen,
//       navigationOptions: {
//         headerMode: "none",
//         header: null
//       }
//     },
//     Details: DetailsScreen
//   },
//   {
//     initialRouteName: "Welcome"
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

// export default AppContainer;

import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import ListJobsScreen from "../component/ListJobs";
import LoginScreen from "../component/Login";
import WelcomeScreen from "../component/Welcome";
import DetailsScreen from "../component/Details";
import SettingsScreen from "../component/Setting";
import AboutUsScreen from "../component/AboutUs";

const TabNavigator = createBottomTabNavigator(
  {
    Jobs: ListJobsScreen,
    Settings: SettingsScreen,
    AboutUs: AboutUsScreen
  },
  {
    navigationOptions: {
      title: "خانه"
    },
    tabBarOptions: {
      labelStyle: {
        fontFamily: "Shabnam-FD"
      }
    }
  }
);

const AppStack = createStackNavigator({ Home: TabNavigator, Details: DetailsScreen });

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

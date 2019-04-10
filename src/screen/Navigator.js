import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../component/Home";
import LoginScreen from "../component/Login";
import WelcomeScreen from "../component/Welcome";
import DetailsScreen from "../component/Details";

const AppStack = createStackNavigator({ Home: HomeScreen, Details: DetailsScreen });

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

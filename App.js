import React from "react";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";

import { Provider } from "react-redux";
import AppContainer from "./src/screen/Navigator";
import FlashMessage from "react-native-flash-message";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./src/reducers/index";

const store = createStore(reducer, applyMiddleware(thunk));

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// TODO remove react-native-screens because of using transparent modal whenever this issue is fixed we going back to react native screens url(https://github.com/kmagiera/react-native-screens/issues/61)==================
// useScreens();

I18nManager.forceRTL(true);
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    //Force RTL
    if (I18nManager.isRTL != true) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        <FlashMessage
          position="top"
          titleStyle={{ fontFamily: "Shabnam-FD" }}
          textStyle={{ fontSize: 12, fontFamily: "Shabnam-FD" }}
        />
      </Provider>
    );
  }
}

// const App = () => (
//   <Provider store={store}>
//     <AppContainer />
//     <FlashMessage
//       position="top"
//       titleStyle={{ fontFamily: "Shabnam-FD" }}
//       textStyle={{ fontSize: 12, fontFamily: "Shabnam-FD" }}
//     />
//   </Provider>
// );

export default App;

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import RootNavigation from "@/navigation/RootNavigation";
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content"/>
      <RootNavigation/>
    </Provider>
  );
}

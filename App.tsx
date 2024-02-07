import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

export default function App() {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("black");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="light" />
        <Main />
      </Provider>
    </GestureHandlerRootView>
  );
}

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./components/BottomTabs";

const Stack = createNativeStackNavigator();

const Main = () => {
  return <BottomTabs />;
};

export default Main;

const styles = StyleSheet.create({});

import { View, Text } from "react-native";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Schedular from "../screens/Schedular";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Schedular" component={Schedular} />
      </Stack.Navigator>
    </View>
  );
};

export default HomeStack;

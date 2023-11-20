import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Signup from "./screens/Signup";
import Login from "./screens/Login";
import BottomTabs from "./components/BottomTabs";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "black",
        // paddingHorizontal: 20,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomTabs"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <BottomTabs /> */}
    </SafeAreaView>
  );
};
export default Main;

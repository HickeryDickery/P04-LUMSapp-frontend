import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import Home from "../screens/Home";
import Signup from "../screens/Signup";

const TabBar = ({ state, descriptors, navigation }: any) => {
  return <View></View>;
};

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: "#DDDDDD",
          tabBarInactiveTintColor: "#35C2C1",
          headerShown: false,
        })}
      >

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "#DDDDDD" : "#35C2C1"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="LDF"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="people-circle"
                size={24}
                color={focused ? "#DDDDDD" : "#35C2C1"}
              />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import bottomTabs from "../constants/bottomtabs";
import Header from "./Header";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Header />
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
        {bottomTabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={tab.icon}
                  size={focused ? 24 : 20}
                  color={focused ? "#DDDDDD" : "#35C2C1"}
                />
              ),
            }}
          />
        ))}
        {/* <Tab.Screen
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
        /> */}

        {/* <Tab.Screen name="LdfHomePage" component={LdfHomePage} />
        <Tab.Screen name="LdfSpecificPost" component={LdfSpecificPost} /> */}
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/Login";
import Home from "./screens/FirstScreen";
import CommentsScreen from "./screens/Comments";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Black with 70% opacity
          },
          headerTintColor: "white",
          headerBackTitleVisible: false, // Hide the back button title on iOS
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Home",
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            title: "Comments",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default Main;

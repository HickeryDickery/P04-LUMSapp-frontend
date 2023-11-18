import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// screens
import Signup from "./screens/Signup";
import SignupPIN from "./screens/SignupPIN";
import SignupProfilePicture from "./screens/SignupProfilePicture";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
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
          name="Signup"
          component={Signup}
          options={({ navigation }) => ({
            headerShown: false,
          title: "Signup",
          })}
        />
        <Stack.Screen
          name="SignupPIN"
          component={SignupPIN}
          options={{
            title: "SignupPIN",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignupProfilePicture"
          component={SignupProfilePicture}
          options={{
            headerShown: false,
            title: "SignupProfilePicture",
                    }
        }
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            title: "Home",
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
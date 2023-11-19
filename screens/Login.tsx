import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import axios from "axios"; 

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.10.18:8000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Handle successful login
        console.log("Login successful");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Back arrow */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Welcome message */}
      <Text style={styles.welcomeMessage}>Hello, welcome back!</Text>

      {/* Email and Password fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8e8e8e"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.inputLine} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8e8e8e"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.inputLine} />
        </View>
      </View>

      {/* Login button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine}></View>
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine}></View>
      </View>

      {/* Outlook button */}
      <TouchableOpacity style={styles.outlookButton}>
        <Image source={require("../assets/outlookLogo.png")} style={styles.outlookLogo} />
        <Text style={styles.buttonText}>Outlook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
  },
  welcomeMessage: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20, // Adjust the margin as needed
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 0,
    color: "white",
  },
  inputLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#35C2C1",
  },
  loginButton: {
    backgroundColor: "#35C2C1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#8e8e8e",
  },
  separatorText: {
    color: "#8e8e8e",
    marginHorizontal: 10,
  },
  outlookButton: {
    backgroundColor: "#0072C6",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  outlookLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default LoginScreen;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useFonts } from "expo-font";
import { IP } from "../constants/IP2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${IP}/user/login`, {
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

      console.log("Login");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Hello, Welcome Back!
      </Text>

      {/* <Image source={lumsLogo} style={{ width: 150, height: 150 }} /> */}
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#757575"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#757575"
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        <Text style={{ fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.divBar}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.outlookButton}>
        {/* <Image source={outlookImage} style={styles.logo} /> */}
        <Text style={{ paddingLeft: 10, color: "#fff", fontWeight: "bold" }}>
          Outlook
        </Text>
      </TouchableOpacity>

      {/* Email and Password fields */}
      {/* <View style={styles.inputContainer}>
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
      </View> */}

      {/* Login button */}
      {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> */}

      {/* Separator */}
      {/* <View style={styles.separatorContainer}>
        <View style={styles.separatorLine}></View>
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine}></View>
      </View> */}

      {/* Outlook button */}
      {/* <TouchableOpacity style={styles.outlookButton}>
        <Image
          source={require("../assets/outlookLogo.png")}
          style={styles.outlookLogo}
        />
        <Text style={styles.buttonText}>Outlook</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#35C2C1",
    width: "80%",
    borderBottomWidth: 1,
    borderRadius: 10,
    marginTop: "5%",
    padding: 15,
    color: "#fff",
  },
  signupButton: {
    marginTop: "20%",
    backgroundColor: "#35C2C1",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "5%",
    width: "80%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#35C2C1",
  },
  divBar: {
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 10,
  },
  outlookButton: {},
});

export default Login;

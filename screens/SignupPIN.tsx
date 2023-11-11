import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import OTPInputView from "@twotalltotems/react-native-otp-input";


const email = "email@lums.edu.pk";

const SignupPIN = () => {
  const [timerCount, setTimer] = useState(120);
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });
  
  const alertCall = (codeValue:string, codeMessage:string) => {
    Alert.alert(
      codeValue,
      codeMessage,
      [
        {
          text: "Confirm",
          onPress: () => console.log("Confirm Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
      );
    };
    
    useEffect(() => {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          if (lastTimerCount <= 1) {
            clearInterval(interval);
            alertCall("Timeout, Please try again", "Your code has expired. Please request a new code.");
          }
        return lastTimerCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  const minutes = Math.floor(timerCount / 60);
  const seconds = timerCount % 60;

  return (
  <View style={styles.container}>
      <Text style={styles.centerText}>Enter PIN</Text>

      <Text style={styles.emailText}>
        Please enter the 4-digit PIN sent to{" "}
        <Text style={{ textDecorationLine: "underline", color: "lightgrey" }}>{email}</Text>
      </Text>


      <OTPInputView
        style={{ width: '80%', height: 200 }}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          if (code === "1234") {
            alertCall("Correct Code", "You have entered the correct code.");
          } else {
            alertCall("Incorrect Code", "You have entered the incorrect code.");
          }
        }}
      />

    <Text style={styles.timerText}>{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`} remaining</Text>
      
      <StatusBar style="auto" />
    </View>
  );
};

export default SignupPIN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    color: "#35C2C1",
    fontFamily: "Roboto",
    fontSize: 36,
    paddingBottom: 20,
  },
  emailText: {
    color: "grey",
    marginTop: 10,
  },
  timerText: {
    color: "#146987",
    marginTop: 10,
  },

  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";

const profilepicturePlaceholder = require("../assets/profilepicture_placeholder.png");

const SignupProfilePicture = () => {
  const [fontsLoaded, error] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });

  const navigation = useNavigation();
  const [image, setImage] = useState<null | string>(null);
  const [bio, setBio] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,      
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const continueOnPress = () => {
    if (image && bio) {
      navigation.navigate('Home');
  };}

  const skipOnPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>Get Started</Text>
      <Text style={{ color: "grey" }}>Set up your profile</Text>
      <View style={styles.profilepictureBorder}>
        {image === null ? (
          <Image source={profilepicturePlaceholder} style={styles.profilepicture} />
        ) : (
          <Image source={{ uri: image }} style={styles.profilepicture} />
        )}
      </View>
      
      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: "#35C2C1", fontSize: 16, fontWeight: "bold", margin: 20 }}>Edit Picture</Text>
      </TouchableOpacity>

      <Text style={{ color: "#fff", fontSize: 16, width: "80%" }}>Bio</Text> 
      <TextInput style={styles.input} placeholder="Something Interesting" placeholderTextColor="grey"
        onChangeText={(text) => setBio(text)} />

      <TouchableOpacity style={styles.signupButton} onPress={continueOnPress}>
        <Text style={{ fontWeight: "bold" }}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={skipOnPress}>
        <Text style={{ fontWeight: "bold", color: "#35C2C1", fontFamily: "Roboto" }}>Skip for now</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default SignupProfilePicture;

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
  profilepictureBorder: {
    borderRadius: 175 / 2,
    borderWidth: 3,
    borderColor: "#146987",
    width: 175,
    height: 175,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 0
  },
  profilepicture: {
    width: "100%",
    height: "100%",
    borderRadius: 175 / 2 - 5,
  },
  input: {
    borderColor: "#35C2C1",
    width: "80%",
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingBottom: 15,
    marginTop: "5%",
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
  skipButton: {
    marginTop: "5%",
    backgroundColor: "black",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto",
  },
});

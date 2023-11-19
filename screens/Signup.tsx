import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react'; // Import useEffect
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';


const outlookImage = require("../assets/outlook_image.png");
const lumsLogo = require("../assets/Lums.png");

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const onPress = () => {
    console.log("Pressed");
    if (email && fullname && password) {  
    navigation.navigate('SignupPIN');}
    else (
      alert("Please fill all the fields")
    )
  }

  return (
    <View style={styles.container}>
      <Image source={lumsLogo} style={{ width: 150, height: 150 }} />
      <TextInput style={styles.input} keyboardType="email-address" placeholder="Email" placeholderTextColor="#fff" 
        onChangeText={(text) => setEmail(text)} />
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#fff" 
        onChangeText={(text) => setFullname(text)} />
      <TextInput style={styles.input} keyboardType="visible-password" placeholder="Password" placeholderTextColor="#fff" 
        secureTextEntry={true} onChangeText={(text) => setPassword(text)}  />

      <TouchableOpacity style={styles.signupButton}  onPress={onPress}>
        <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.divBar}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.outlookButton} onPress={onPress}>
        <Image source={outlookImage} style={styles.logo} />
        <Text style={{ paddingLeft: 10, color: "#fff", fontWeight: "bold" }}>Outlook</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default Signup;

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
  outlookButton: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#146987",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  logo:{
    width: 30,
    height: 20,
  }
});

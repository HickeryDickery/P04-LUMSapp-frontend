import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

const Signup = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  SplashScreen.hideAsync();

  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>LUMS App</Text>
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
  centerText: {
    color: "#35C2C1",
    fontFamily: "Roboto",
    alignItems: "center",
    height:10
    // justifyContent: "",
  },
});

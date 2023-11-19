import { StyleSheet, View, Image, StatusBar, Platform } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <Avatar.Image size={30} source={require("../assets/adaptive-icon.png")} />
      <Image source={require("../assets/logo.png")} />
      <MaterialIcons name="message" size={24} color="#35C2B0" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

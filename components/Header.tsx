//COLORS DONE
import { StyleSheet, View, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { HEADER_ICON_COLOR } from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.header}>
      <Avatar.Image
        size={30}
        source={require("../assets/profile_picture.jpg")}
      />
      <Image
        style={{ width: 50, height: 30, opacity: 1 }}
        source={require("../assets/logo3.png")}
      />
      <MaterialIcons
        name="message"
        size={24}
        color={HEADER_ICON_COLOR}
        onPress={() => navigation.navigate("ChatsHome")}
      />
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
    paddingVertical: 5,
  },
});

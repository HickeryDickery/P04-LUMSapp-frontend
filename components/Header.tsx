//COLORS DONE
import { StyleSheet, View, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { HEADER_ICON_COLOR } from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const { user } = useAppSelector((state: any) => state.auth);

  return (
    <View style={styles.header}>
      <Avatar.Image
        size={30}
        source={
          user?.profile_picture.url
            ? { uri: user?.profile_picture.url }
            : require("../assets/adaptive-icon.png")
        }
      />
      <Image
        source={require("../assets/Lums.png")}
        style={{ width: 75, height: 50 }}
      />
      <MaterialIcons name="message" size={24} color="#35C2B0" />
      {/*<Image
            style={{ width: 75, height: 50 }}
            source={require("../assets/logo.png")}
    />*/}
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

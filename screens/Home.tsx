import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import CarouselCard from "../components/CarouselCard";
import { MaterialIcons } from "@expo/vector-icons";
import buttons from "../constants/homebutton";
import HomeButtons from "../components/HomeButtons";
// import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const handleButtonPress = (buttonName: string) => {
    if (buttonName === "GPA Predictor") {
      navigation.navigate("GpaPredictorHome");
    } else if (buttonName === "Scheduler") {
      navigation.navigate("Scheduler");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CarouselCard />

      <View
        style={{
          paddingHorizontal: "5%",
          paddingVertical: "5%",
          flex: 1,
          // borderColor: "red",
          // borderWidth: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            // borderWidth: 1,
            // borderColor: "red",
          }}
        >
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.name}
              onPress={() => handleButtonPress(button.name)}
              style={{ margin: 10 }}
            >
              <HomeButtons name={button.name} icon={button.icon} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CampusInfo")}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            justifyContent: "flex-start",
            backgroundColor: "#2B2B2B",
            borderRadius: 20,
            padding: 10,
            marginVertical: 10,
            paddingLeft: 20,
          }}
        >
          <MaterialIcons name="info" size={40} color="#35C2B0" />
          <View>
            <Text style={{ color: "#35C2B0", fontWeight: "bold" }}>
              Campus Information
            </Text>
            <Text style={{ color: "#185D54", fontSize: 10 }}>
              Instructor Emails, Gym Timings, Eateries Info etc
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
    // borderColor: "red",
    // borderWidth: 1,
    padding: 0,
  },
});

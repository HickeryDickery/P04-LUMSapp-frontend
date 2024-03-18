import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

const SpecificEvent = ({ route, navigation }: any) => {
  //   console.log(route.params.event.title);

  return (
    <ScrollView
      style={{
        backgroundColor: "#000000",
      }}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: 5,
          borderRadius: 100,
        }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="cross" size={25} color="white" />
      </TouchableOpacity>

      <View style={{ height: "50%", width: "100%", marginBottom: 10 }}>
        <ImageBackground
          source={{
            uri: route.params.event.imageUrl
              ? route.imageUrl
              : "https://i.ytimg.com/vi/WQ3oYtIG1Ho/maxresdefault.jpg",
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,1.0)"]}
            style={styles.linearGradient}
          />
          <View style={styles.fontContainer}>
            <Text style={styles.titleFont}>{route.params.event.title}</Text>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: "#868686" }}>Hosted By: LCSS</Text>
        </View>
        <View>
          <Text style={{ color: "white" }}>
            {route.params.event.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  titleFont: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  fontContainer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    zIndex: 2,
  },
});

export default SpecificEvent;

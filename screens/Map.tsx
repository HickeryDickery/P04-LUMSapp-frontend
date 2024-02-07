import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../utils/mapStyling";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 31.469897268732343,
          longitude: 74.4094203493857,
          latitudeDelta: 0.001,
          longitudeDelta: 0.003,
        }}
        customMapStyle={mapStyle}
      />
    </View>
  );
};

// styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    paddingLeft: 30,
  },
});

export default Map;

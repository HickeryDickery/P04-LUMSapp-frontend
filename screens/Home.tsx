import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { View, Text, StyleSheet } from "react-native";

const SpecificEvent = ({ route, navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>SpecificEvent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
});

export default SpecificEvent;

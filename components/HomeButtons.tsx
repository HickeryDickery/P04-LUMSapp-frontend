import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface HomeButtonsProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const HomeButtons = ({ name, icon }: HomeButtonsProps) => {
  return (
    // <View style={styles.container}>
    <View
      style={{
        display: "flex",
        alignItems: "center",
        height: 120,
        width: 120,
        padding: 0,
        marginVertical: 10,
        // flex: 1,
        backgroundColor: "#2B2B2B",
        // padding: 20,
        borderRadius: 20,
        // alignItems: "center",
        justifyContent: "center",
        // shadowColor: "#2B2B2B",
        // shadowOffset: {
        //   width: 0,
        //   height: 5,
        // },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,

        // elevation: 11,
      }}
    >
      <MaterialIcons
        name={icon}
        size={70}
        color={name == "Coming Soon" ? "#505050" : "#35C2B0"}
      />
      <Text style={{ color: "#ffffff", marginTop: 5, textAlign: "center" }}>
        {name}
      </Text>
    </View>
    // </View>
  );
};

export default HomeButtons;

const styles = StyleSheet.create({
  container: {},
});

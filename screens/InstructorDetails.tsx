import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const InstructorDetails = ({ route }) => {
    const { name, school, department } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Instructor Is: {name} & {school} & {department}</Text>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
    },
    heading: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: 'top',
        marginTop: 50,
        marginBottom: 50,
    },
});

export default InstructorDetails;

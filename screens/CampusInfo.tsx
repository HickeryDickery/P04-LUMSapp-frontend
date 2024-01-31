import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Button } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

import Loader from "../components/Loader";


const CampusInfo = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const openLink = () => {
        Linking.openURL("https://alumni.lums.edu.pk/corporate-discount")
          .catch(err => console.error('Error opening URL:', err));
      };

    return (
        <View style={styles.container}>
            <Button
                onPress={() => { navigation.goBack() }}
                style={{
                position: 'absolute',
                left: '4%',
                top: "5.3%",
                }}
            >
                <Ionicons name="chevron-back" size={24} color="white" />
            </Button>
            <Text style={styles.heading}>Campus Information</Text>
            
            <TouchableOpacity style={styles.topicButton} onPress={() => navigation.navigate("InstructorInfo")}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold" }}> Admin Office </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topicButton}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold" }}> Campus Facilities </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topicButton}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold" }}> Eateries </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topicButton}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold" }}> Instructor Details </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topicButton}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold" }}> Tools and Subscriptions </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topicButton} onPress={openLink}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold" }}> Discounts </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.topicButton, {marginTop: 120}]}>
                <Text style={{ color: "#35C2C1", fontWeight: "bold"}}> Saved </Text>
            </TouchableOpacity>

         {loading && <Loader />}
    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
      },
      heading: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical:'top',
        marginTop: 50,
        marginBottom: 50,
      }, 
      backbutton: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 50,
      },
      topicButton: {
        fontFamily: "Roboto",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#111111",
        borderRadius: 10,
        width: "80%",
        marginTop: 20,
        padding: 20,
        // justifyContent: "center",
        alignItems: "flex-start",
      }
});

export default CampusInfo;

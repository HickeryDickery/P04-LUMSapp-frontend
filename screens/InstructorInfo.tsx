import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import {instructor_dept_pairs, instructor_school_pairs} from "../components/DepartmentSchoolPairs.tsx"


const InstructorInfo = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Button
                onPress={() => {navigation.goBack()}}
                style={{
                    position: 'absolute',
                    left: '4%',
                    top: "5.3%",
                }}
                >
                <Ionicons name="chevron-back" size={24} color="white" />
            </Button>
            <View style={styles.heading}>
                <Text
                    style={{
                        color: 'white',
                        fontWeight: "bold",
                        fontSize: 18,
                    }} >Instructor Details</Text>
            </View>
            

        </SafeAreaView>
    )
};

export default InstructorInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
    },
    backbutton: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 50,
    },
    heading: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50,
    },
});
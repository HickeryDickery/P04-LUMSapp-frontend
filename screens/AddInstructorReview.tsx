import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddInstructorReview = () => {
    const navigation = useNavigation();
    
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
        <View style={styles.heading}>
          <Text
            style={{
              color: 'white',
              fontWeight: "bold",
              fontSize: 18,
            }}>Add Instructor Review</Text>
        </View>  
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
      marginBottom: 20,
    },
    instructorTitle: {
      color: "white", 
      fontWeight: "bold",
      fontSize: 20,
      position: "absolute",
      left: "9%",
      top: "43%"
    },
  });

export default AddInstructorReview;
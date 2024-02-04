import React from 'react';
import {
  StyleSheet, View, Text, Image} from 'react-native';


const Reviews: React.FC<{ username: string, profilePicture: string, ratingGiven: number, reviewDescription: string
    }> = ({ username, profilePicture, ratingGiven, reviewDescription }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Username: {username}</Text>
            <Image source={{ uri: profilePicture }} style={{ width: 100, height: 100 }} />
            <Text style={{ color: "white" }}>Rating Given: {ratingGiven}</Text>
            <Text style={{ color: "white" }}>Review Description: {reviewDescription}</Text>
        </View>
    )
}
  

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

export default Reviews;

import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const Reviews: React.FC<{ username: string, profilePicture: string, ratingGiven: number, reviewDescription: string
    }> = ({ username, profilePicture, ratingGiven, reviewDescription }) => {
      return (
        <View style={styles.container}>

          <View style={styles.header}>
            <Image source={{ uri: profilePicture }} style={{ width: 30, height: 30, borderRadius: 50 }} />
            <Text style={{ color: "white", paddingLeft: 20 }}>{username}</Text>
            <View style={[styles.header, { marginLeft: "auto" }]}>
              <Text style={{ color: "white", paddingRight: 5 }}>{ratingGiven}</Text>
              <MaterialIcons name={"star"} size={30} color={"white"} />
            </View>
          </View>
          <Text style={{ color: "white", marginTop: 20 }}>{reviewDescription}</Text>
        </View>
      )
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1D1D1D",
      padding: 15,
      marginHorizontal: 10,
      borderRadius: 8,
      borderBottomWidth: 2,
      borderBottomColor: "#35C2C1", 
      paddingBottom: 30, 
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

export default Reviews;

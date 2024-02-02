import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Loader from "../components/Loader";


const InstructorDetails = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const { name, school, department } = route.params;
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Instructor Is: {name} & {school} & {department}</Text> */}
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
          }}>Instructor Details</Text>
      </View>
      <View>
        <View>
          <Image style={{ width: windowWidth, height: 300}} source={{ uri: "https://picsum.photos/225" }} />
        </View>
        <LinearGradient
          colors={['transparent','rgba(0,0,0,1.0)']}
          style={{position: 'absolute', width: '100%', height: '100%'}}
        />
      </View>
      <Text style={styles.instructorTitle}>{name}</Text>
      
      <Text style={{color: "white"}}>Insert the details/reviews tab here</Text>
      {/* https://reactnavigation.org/docs/tab-view/ */}
      {loading && <Loader />}
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

export default InstructorDetails;

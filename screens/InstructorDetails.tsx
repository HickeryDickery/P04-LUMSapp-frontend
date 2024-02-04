import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Avatar } from "react-native-paper";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from "../components/Loader";

import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import { SafeAreaView } from 'react-native-safe-area-context';

// TO IMPORT
const reviewsCount = 10
const reviewRating = 4
const zambeelRating = 3.88
const profileDescription = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos dignissimos id qui eligendi facilis reprehenderit, repudiandae optio at consequatur, labore impedit earum fugiat ea ipsa laborum autem vero omnis?"
const DATA = [
  {
    username: 'Nauman',
    profilePicture: 'https://picsum.photos/200',
    ratingGiven: 4,
    reviewDescription: 'Very Cool Very Nice',
  },
  {
    username: 'Muneeb',
    profilePicture: 'https://picsum.photos/201',
    ratingGiven: 3,
    reviewDescription: 'Lovely',
  },
  {
    username: 'Khizar',
    profilePicture: 'https://picsum.photos/202',
    ratingGiven: 5,
    reviewDescription: 'It is what it is',
  },
];
// END TO IMPORT



// tabview
const DetailsTab = () => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1}}>
      <Text style={{color: "#35C2C1", fontSize: 15, fontWeight: "bold", padding: 20}}>Overall Rating</Text>
    
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{paddingLeft: 20}}><StarRating initialValue={reviewRating} /></View>
        <Text style={{ color: 'white', marginLeft: 5, marginTop: 10, fontSize: 10}}>({reviewsCount})</Text>
        <Text  style={{ color: 'white', marginLeft: 100, fontSize: 25, fontWeight: "bold"}}>{zambeelRating}/5</Text>
      </View>
      <Text  style={{ color: '#047CD2', marginLeft: "80%", fontSize: 15}}>Zambeel</Text>
     
      <Text style={{color: "#35C2C1", fontSize: 15, fontWeight: "bold", padding: 20}}>Profile</Text>
      <Text style={{color: "white", fontSize: 15, paddingHorizontal: 20}}>{profileDescription}</Text>
    </View>
  </ScrollView>
);

const ReviewsTab = () => {
  const navigation = useNavigation();

  // Render item function for FlatList
  const renderItem = ({ item }) => {
    return <Reviews 
      username={item.username} 
      profilePicture={item.profilePicture}
      ratingGiven = {item.ratingGiven}
      reviewDescription = {item.reviewDescription}
      />;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Image style={{marginLeft:20, marginTop:10}} size={30} source={require("../assets/adaptive-icon.png")} />
        <TouchableOpacity onPress={() => {navigation.navigate("AddInstructorReview")}}> 
          <View style={{marginLeft: 5, marginTop:10}}><StarRating initialValue={reviewRating}/></View>
        </TouchableOpacity>
      </View>

      <Text style={{color: "white", padding:20}}>ADD THE COMPONENT HERE</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id} 
        contentContainerStyle={{ flexGrow: 1 }}
      >
        
      </FlatList>
    </View>
  );
}; 




const renderScene = SceneMap({
  first: DetailsTab,
  second: ReviewsTab,
});

const InstructorDetails = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { name, school, department } = route.params;

  //
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Details' },
    { key: 'second', title: 'Reviews' },
  ]);

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
      
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "black" }}>
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: windowWidth, height: windowHeight / 2 }}
          renderTabBar={props => <TabBar {...props} style={{ backgroundColor: 'black'}} indicatorStyle={{ backgroundColor: '#35C2C1' }} />}
        />
      </View>
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

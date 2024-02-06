import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Avatar } from "react-native-paper";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from "../components/Loader";
import axios from "axios";
import { IP } from "../constants/ip";

import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";

// TO IMPORT
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


// tabview 1
const DetailsTab = (extraProp:any) => {
  const { reviewRating, reviewsCount, zambeelRating, profileDescription } = extraProp.extraProp;
  return (
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
)
  };

// tabview 2
const ReviewsTab = (extraProp: any) => {
  const navigation = useNavigation();
  const { reviewRating, reviewsCount, zambeelRating, profileDescription } = extraProp.extraProp;

  // Render item function for FlatList
  const renderItem = ({ item }: any) => {
    return (
      <>
        <Reviews 
          username={item.username} 
          profilePicture={item.profilePicture}
          ratingGiven={item.ratingGiven}
          reviewDescription={item.reviewDescription}
        />
        <View style={{ margin: 10}}></View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Image style={{marginLeft: 20, marginTop: 10}} size={30} source={require("../assets/adaptive-icon.png")} />
        <TouchableOpacity onPress={() => {navigation.navigate("AddInstructorReview")}}> 
          <View style={{marginLeft: 5, marginTop:10}}><StarRating initialValue={reviewRating}/></View>
        </TouchableOpacity>
      </View>

      <View style={{padding:5}}></View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.username} 
        contentContainerStyle={{ flexGrow: 1 }}
      >
      </FlatList>
    </View>
  );
}; 

const renderScene = ({ route, reviewRating, reviewsCount, zambeelRating, profileDescription }: { route: any, reviewRating: number, reviewsCount: number, zambeelRating: number, profileDescription: string }) => {
  switch (route.key) {
    case 'first':
      return <DetailsTab extraProp={{reviewRating, reviewsCount, zambeelRating, profileDescription}} />;
    case 'second':
      return <ReviewsTab extraProp={{reviewRating}} />;
    default:
      return null;
  }
};

const InstructorDetails = ({ route }: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { name, school, department } = route.params;

  const [instructorImage, setInstructorImage] = useState("https://picsum.photos/202");
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [zambeelRating, setZambeelRating] = useState(0.0);
  const [profileDescription, setProfileDescription] = useState("junk");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${IP}/instructor/get`, {
          body: name,
        });
        if (res.data.success && res.data.instructor) {
          const { instructor } = res.data;
          setInstructorImage(instructor.instructorImage);
          setProfileDescription(instructor.profileDescription);
          setReviewsCount(instructor.reviewCount);
          setReviewRating(instructor.reviewRating);
          setZambeelRating(instructor.zambeelRating);
        } else {
          console.log("Error: Success is false or no instructor data found.");
        }
      } catch (err) {
        console.log("Error fetching instructor data:", err);
      }
    };
  
    fetchData();
  }, []);
  

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Details' },
    { key: 'second', title: 'Reviews' },
  ]);

  return  loading? (<View><Text>Loading</Text></View>):(
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
          <Image style={{ width: windowWidth, height: 300}} source={{ uri: instructorImage }} />
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
          renderScene={({ route }) => renderScene({ route, reviewRating, reviewsCount, zambeelRating, profileDescription })}
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

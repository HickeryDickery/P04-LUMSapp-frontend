import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import StarRating from '../components/StarRating';
import { IP } from '../constants/ip';

const data = [
  { semester_year: 'Summer 2024' },
  { semester_year: 'Spring 2024' },
  { semester_year: 'Fall 2024' },
  { semester_year: 'Summer 2023' },
  { semester_year: 'Spring 2023' },
  { semester_year: 'Fall 2023' },
  { semester_year: 'Summer 2022' },
  { semester_year: 'Spring 2022' },
  { semester_year: 'Fall 2022' },
  { semester_year: 'Summer 2021' },
  { semester_year: 'Spring 2021' },
  { semester_year: 'Fall 2021' },
  { semester_year: 'Summer 2020' },
  { semester_year: 'Spring 2020' },
  { semester_year: 'Fall 2020' },
];

const AddInstructorReview = ({ route }: any) => {
  const navigation = useNavigation();
  const instructorName = route.params.name;
  const instructorImage = route.params.instructorImage;

  const [selectedStars, setSelectedStars] = useState<number>(0);

  // returns star rating
  const handleStarRatingChange = (rating: number) => {
    setSelectedStars(rating);
  };

  // drop down renderer
  const [value, setValue] = useState('');

  // text input
  const [multilineValue, onChangeText] = useState('');

  // dismiss the keyboard
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  // send data to backend
  const submitReview = async () => {
    try {
      const res = await axios.post(`${IP}/review/create`, {
        instructorName: instructorName,
        ratingGiven: selectedStars,
        academicSession: value,
        reviewDescription: multilineValue,
      });
      alert('Review submitted successfully!');
      navigation.goBack()
    } catch (err) {
      // console.log(err);
      alert('You have already submitted a review for this instructor.');
    }
  };


  // submit button
  const submitPressed = () => {
    if (selectedStars === 0) {
      alert('Please select a star rating.');
    } else if (value === '') {
      alert('Please select an academic session.');
    } else if (multilineValue === '') {
      alert('Please write a review.');
    } else {
      submitReview();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            left: '4%',
            top: '5.3%',
          }}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Button>
        <View style={styles.heading}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Add Instructor Review:
          </Text>
        </View>
        <Image style={styles.mainImage} source={{ uri: instructorImage }} />

        {/* instructor naming */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.instructorTitle}>Instructor: </Text>
          <Text style={styles.instructorNaming}>{instructorName} </Text>
        </View>

        {/* stars rating */}
        <View style={{ margin: 10, marginLeft: 30, marginBottom: 20 }}>
          <StarRating onRatingChange={handleStarRatingChange} />
        </View>

        {/* academic year dropdown */}
        <Text style={styles.instructorTitle}>Academic Session: </Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          search
          maxHeight={300}
          labelField="semester_year"
          valueField="semester_year"
          placeholder={'Select a session...'}
          searchPlaceholder="Search..."
          value={value}
          containerStyle={{ width: '80%', backgroundColor: '#2B2B2B' }}
          onChange={(item) => {
            setValue(item.semester_year);
          }}
        />

        {/* review input box */}
        <Text style={styles.instructorTitle}>Review: </Text>
        <View style={styles.inputbox}>
          <TextInput
            editable
            placeholder="Write your review here..."
            placeholderTextColor={"#000"}
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            value={multilineValue}
            style={{ padding: 10, color: 'black', fontSize: 16}}
          />
        </View>

        {/* submit button */}
        <TouchableOpacity style={styles.topicButton} onPress={submitPressed}>
                <Text style={{ color: "#000", fontWeight: "bold" }}> Submit </Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      // alignItems: "center",
    },
    heading: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: 'top',
      marginTop: 50,
      marginBottom: 20,
      alignItems: "center",
    },
    instructorTitle: {
      color: "#35C2C1", 
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 30,
      marginBottom: 15,
    },
    instructorNaming: {
      color: "white", 
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 5,
      marginBottom: 15,
    },
    mainImage: { 
      width: 150,
      height: 150,
      marginTop: 20,
      marginBottom: 15,
      borderRadius: 10,
      alignSelf: 'center',
    },
    dropdown: {
      height: 50,
      width: "80%",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: "#2B2B2B",
      marginLeft: 30,
      marginBottom: 20,
    },
    inputbox: {
      height: 150,
      width: "80%",
      borderWidth: 0.5,
      borderRadius: 8,
      backgroundColor: "#2B2B2B",
      marginLeft: 30,
      marginBottom: 20,
    },
    topicButton: {
      backgroundColor: "#35C2C1",
      borderRadius: 10,
      width: "50%",
      marginTop: 20,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }
  });

export default AddInstructorReview;
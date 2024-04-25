import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Loader from "../components/Loader";


import { instructor_array } from '../components/DepartmentSchoolPairs';

const groupInstructors = (instructors:string[]) => {
  const groupedData = {} as Record<string, Record<string, string[]>>;
  instructors.forEach(([name, school, department]) => {
    if (!groupedData[school]) {
      groupedData[school] = {};
    }
    if (!groupedData[school][department]) {
      groupedData[school][department] = [];
    }
    groupedData[school][department].push(name);
  });
  return groupedData;
};

const custompage = (name:string, school:string, department:string, navigation:any) => {
  // navigation.navigate("InstructorDetails", {name: name, school: school, dept: department});    
  navigation.navigate("InstructorDetails", {name: name});    
};

const RenderInstructors = ({ groupedData, navigation }: { groupedData: Record<string, Record<string, string[]>>, navigation: any }) => {
  return (
    <View>
      {/* mapping schools ie. sse, sdsb etc */}
      {Object.entries(groupedData).map(([school, departments]) => (
        <View key={school}>
          <Text style={styles.schoolHeading}>{school}</Text>

          {/* mapping departments ie. cs, ee etc */}
          {Object.entries(departments).map(([department, instructors]) => (
            <View key={department}>
              <Text style={styles.deptHeading}>{department}</Text>

              {/* mapping instructors names*/}
              {instructors.map((instructor, index) => (
                <TouchableOpacity 
                  style={styles.topicButton} 
                  onPress={() => custompage(instructor, school, department, navigation)}>
                  <Text style={styles.instructorHeading} key={index}>{instructor}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const InstructorInfo = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const groupedData = groupInstructors(instructor_array);

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >

        <View>
          <RenderInstructors groupedData={groupedData} navigation={navigation} />
        </View>

      {loading && <Loader />}
      </ScrollView>
    </SafeAreaView>

  );
};

export default InstructorInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backbutton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,
  },
  heading: {
    alignItems: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  schoolHeading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    padding: 10,
  },
  deptHeading: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 40,
    padding: 10
  },
  instructorHeading: {
    color: "#35C2C1",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "left",
  },
  topicButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#111111",
    borderRadius: 10,
    width: "110%",
    marginTop: 20,
    marginLeft: 40,
    padding: 20,
    alignItems: "flex-start",
  }
});

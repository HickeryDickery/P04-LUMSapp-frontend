import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { IP } from "../constants/ip";
import axios from "axios";

import HomeButtons from "../components/HomeButtons"; //

const GpaPredictorHome = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [gpa, setGpa] = useState(0.0);
  const [file, setFile]: any = useState();
  const [transcript, setTranscript]: any = useState(null);

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });

  useEffect(() => {
      const updateTranscript = async () => {
          try {
              const jsonValue = await AsyncStorage.getItem('transcript');
              setTranscript(jsonValue != null ? JSON.parse(jsonValue) : []);
          } catch (e) {
              console.log(e)
          }
      }

      updateTranscript()
  }, [])

  const selectTranscript = async () => {
    try {
        const docRes = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
        });

        const assets = docRes.assets;
        if (!assets) return;
        const fileInfo = assets[0];

        let { name, size, uri } = fileInfo;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];

        var fileToUpload = {
            name: name,
            size: size,
            uri: uri,
            type: "application/" + fileType,
        };
        setFile(fileToUpload);
    } catch (error) {
        console.log(error)
    }
  };
  const uploadTranscript = async () => {
      try {
          const formData = new FormData();
          formData.append("file", file);
          console.log(formData);

          const { data } = await axios.post(
              `${IP}/transcript/parse`,
              formData,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
                  },
              }
          );
          console.log(data)
          try {
              await AsyncStorage.setItem('transcript', JSON.stringify(data.parsedData));
          } catch (e) {
              console.log(e)
          }
      } catch (error) {
          console.log("Error while selecting file: ", error);
      }
  };

  useEffect(() => {
    if (transcript)
      setGpa(transcript.cgpa);
  }, [transcript]);

  return (
    <View style={styles.container}>
      <Text style = {styles.heading}>GPA Predictor</Text>


      <AnimatedCircularProgress
        size={190}
        width={7}
        delay={3}
        fill={(gpa / 4) * 100}
        rotation={360}
        tintColor="#35C2C1"
        backgroundColor="#2A3C44"
        // padding={20}
      >
        {(fill) => (
          <View>
            <Text style={styles.pointsValue}>{gpa}</Text>
            <Text style={styles.pointsGPA}>CPGA</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <TouchableOpacity style={styles.uploadTranscriptBttn} onPress={() => {file ? uploadTranscript() : selectTranscript()}}>
        <Text style={{ color: "#000", fontWeight: "bold" }}>
          {file ? "Upload Transcript" : "Select Transcript"}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.actionBttns}
          onPress={() => navigation.navigate("GpaPredictor")}>
          <HomeButtons name={"GPA"} icon={"trending-up"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBttns} onPress={() => {navigation.navigate("Transcript")}}>
          <HomeButtons name={"Transcript"} icon={"find-in-page"} />
        </TouchableOpacity>
    
      </View>

      {loading && <Loader />}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default GpaPredictorHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    // justifyContent: "center",
  },
  heading: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    // height: "80%",
    textAlignVertical:'top',
    marginTop: 50,
    marginBottom: 50,

  },
  pointsValue: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: "Roboto",
  },
  pointsGPA: {
    textAlign: 'center',
    color: '#35C2C1',
    fontSize: 25,
    fontFamily: "Roboto",
  },
  uploadTranscriptBttn: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#35C2C1",
    borderRadius: 10,
    width: "80%",
    marginTop: 50,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBttns: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%", 
    marginTop: 50,
  },

});

import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Slider from '@react-native-community/slider';


const AdmissionYear = 2021;
const currGPA = 3.6;
const currCredits = 101;
const minor = "NA";
// get gpa, admissionyear, credits, minor from backend and then set the usestate for gpa

const GpaPredictorHome = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [gpa, setGpa] = useState(0);
  const [credits, setCredits] = useState(0);
  const [academicYear, setAcademicYear] = useState(0);
  const [academicRank, setAcademicRank] = useState("Not Applicable");
  const [sliderCredits, setSliderValue] = useState(12); 
  const [sliderGPA, setSliderGPA] = useState(0); 
  const [estimatedGPA, setEstimatedGPA] = useState(0);
  const [minorChecker, setMinorChecker] = useState("");

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
  });

  const handleSliderChange = (value:number) => {
    if (value > 4) {
      setSliderValue(value);
    }
    else {
      setSliderGPA( parseFloat(value.toFixed(2)));
    }
  };

  useEffect(() => {
    setGpa(currGPA);
    setAcademicYear((new Date().getFullYear()) - AdmissionYear);
    setCredits(currCredits);  
    setMinorChecker(minor);
    // fine tune logic later based on months (rising soph etc) 
    switch(academicYear) {
      case 1:
        setAcademicRank("Freshman");
        break;
      case 2:
        setAcademicRank("Sophomore");
        break;
      case 3:
        setAcademicRank("Junior");
        break;
      case 4:
        setAcademicRank("Senior");
        break;
      case 5:
        setAcademicRank("Super Senior");
        break;
    }
  }, [currGPA, academicYear]);

  useEffect(() => {
    let fullCredits = 130;
    var creditsLeft
    if (minorChecker != "NA") {
      fullCredits = 150;
    }
    creditsLeft = fullCredits - credits;
    var tempEst: number = (creditsLeft * sliderGPA + credits * gpa) / fullCredits;
    setEstimatedGPA(parseFloat(tempEst.toFixed(2)));
  }, [sliderCredits, sliderGPA]);


  return (
    <View style={styles.container}>
      <Text style = {styles.heading}>GPA Predictor</Text>


      <AnimatedCircularProgress
        size={150}
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

      <Text style={{color:"#fff", marginTop:20 }}>{academicRank}</Text>

      <View style={styles.infoContainer}>
        <Text style={{color:"#fff", paddingRight: 10}}>Semesters Taken: {academicYear * 2}</Text>
        <Text style={{color:"#fff", paddingRight: 10}}>Credits Taken: {credits}</Text>
        <Text style={{color:"#fff", paddingRight: 10}}>Semesters Left: {8 - (academicYear * 2)}</Text>
      </View>

      {/* // what is the point of this? */}
      {estimatedGPA === 0 ?
        <Text style={{color: "#fff", fontSize: 20, padding: 20, alignSelf: "flex-start"}}> CGPA by Graduation: </Text>
        : 
        <Text style={{color: "#fff", fontSize: 20, padding: 20, alignSelf: "flex-start"}}> CGPA by Graduation: {estimatedGPA}</Text>  
      }

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      <Text style={{color: "#fff", padding: 20, alignSelf: "flex-start"}}>Credit Hours per Semester: {sliderCredits}</Text>
      <Slider
        style={{width: "90%", height: 40}}
          minimumValue={12} // 12 for ugrads
          maximumValue={25} // can be altered 
          minimumTrackTintColor="#35C2C1"
          maximumTrackTintColor="#CFFBC0"
          step={1}
          onValueChange={handleSliderChange}
        />

      <Text style={{color: "#fff", padding: 20, alignSelf: "flex-start"}}>Average GPA per Semester: {sliderGPA}</Text>
      <Slider
        style={{width: "90%", height: 40}}
          minimumValue={0} // 12 for ugrads
          maximumValue={4} // can be altered 
          minimumTrackTintColor="#35C2C1"
          maximumTrackTintColor="#CFFBC0"
          step={0.01}
          onValueChange={handleSliderChange}
        />

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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "5%",
    width: "80%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    width: "auto",
    backgroundColor: "#35C2C1",
  },
});

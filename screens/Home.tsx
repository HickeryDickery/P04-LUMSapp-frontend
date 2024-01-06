import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Button,
} from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import CarouselCard from "../components/CarouselCard";
import { MaterialIcons } from "@expo/vector-icons";
import buttons from "../constants/homebutton";
import HomeButtons from "../components/HomeButtons";
import * as DocumentPicker from "expo-document-picker";
import { IP } from "../constants/ip";
import axios from "axios";

const Home = () => {
    const [file, setFile]: any = useState();
    const navigation = useNavigation();
    const handleButtonPress = (buttonName:string) => {
      if (buttonName === 'GPA Predictor') {
        navigation.navigate('GpaPredictorHome');
      }
    };
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
    return (
        <SafeAreaView style={styles.container}>
            <CarouselCard />

            <View
                style={{
                    paddingHorizontal: "5%",
                    paddingVertical: "5%",
                    flex: 1,
                    // borderColor: "red",
                    // borderWidth: 1,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        // borderWidth: 1,
                        // borderColor: "red",
                    }}
                >
                    {buttons.map((button) => (
                      <TouchableOpacity
                        key={button.name}
                        onPress={() => handleButtonPress(button.name)}
                        style={{ margin: 10 }}
                      >
                        <HomeButtons name={button.name} icon={button.icon} />
                      </TouchableOpacity>
                    ))}
                    <Button
                        onPress={selectTranscript}
                        color="#3f3f3f"
                        title="Select Transcript"
                    />
                    <Button
                        onPress={uploadTranscript}
                        color="#3f3f3f"
                        title="Upload Transcript"
                    />
                    <Button
                        onPress={() => {navigation.navigate("Transcript")}}
                        color="#3f3f3f"
                        title="View Transcript"
                    />
                </View>
                <TouchableOpacity
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        justifyContent: "flex-start",
                        backgroundColor: "#2B2B2B",
                        borderRadius: 20,
                        padding: 10,
                        marginVertical: 10,
                        paddingLeft: 20,
                    }}
                >
                    <MaterialIcons name="info" size={40} color="#35C2B0" />
                    <View>
                        <Text style={{ color: "#35C2B0", fontWeight: "bold" }}>
                            Campus Information
                        </Text>
                        <Text style={{ color: "#185D54", fontSize: 10 }}>
                            Instructor Emails, Gym Timings, Eateries Info etc
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        color: "#fff",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 20,
        // borderColor: "red",
        // borderWidth: 1,
        padding: 0,
    },
});

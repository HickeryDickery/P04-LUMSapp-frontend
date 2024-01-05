import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Button,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import CarouselCard from "../components/CarouselCard";
import { MaterialIcons } from "@expo/vector-icons";
import buttons from "../constants/homebutton";
import HomeButtons from "../components/HomeButtons";

const Transcript = ({ navigation }: any) => {
    const [transcript, setTranscript]: any = useState([]);

    useEffect(() => {
        const updateTranscript = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('transcript');
                setTranscript(jsonValue != null ? JSON.parse(jsonValue).course_info : []);
            } catch (e) {
                console.log(e)
            }
        }

        updateTranscript()
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{
                    color: 'white'
                }}
            >Transcript</Text>

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
                    {transcript.map((course: any) => (
                        <View 
                            key={course.code}
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            {/* <Text
                                style={{
                                    color: 'white'
                                }}
                            >{course.code}</Text> */}
                            <Text
                                style={{
                                    color: 'white'
                                }}
                            >{course.name}</Text>
                            <Text
                                style={{
                                    color: 'white'
                                }}
                            >{course.grade}</Text>
                        </View>
                    ))}
                    <Text
                        style={{
                            color: 'white'
                        }}
                    >yo</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Transcript;

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

import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const UploadTranscript = (props: any) => {
    const [file, setFile]: any = useState();
    const selectTranscript = async () => {
        // Use expo-document-picker to choose Transcript from PDF files.
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
            console.log(error);
        }
    };
    const uploadTranscript = async () => {
        // Upload the selected PDF file to server.
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        axios
            .post(`${IP}/transcript/parse`, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async (response) => {
                if (!response.data.success) {
                    alert(response.data.message);
                    setFile(null);
                } else {
                    try {
                        await AsyncStorage.setItem(
                            "transcript",
                            JSON.stringify(response.data.parsedData)
                        );
                    } catch (e) {
                        console.log(e);
                    } finally {
                        props.uploadState(true);
                        setFile(null);
                    }
                }
            })
            .catch((error) => {
                setFile(null);
                console.log(error);
                alert("Invalid Transcript!");
            });
    };

    return (
        <TouchableOpacity
            style={styles.uploadTranscriptBttn}
            onPress={() => {
                file ? uploadTranscript() : selectTranscript();
            }}
        >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
                {file ? "Upload Transcript" : "Select Transcript"}
            </Text>
        </TouchableOpacity>
    );
};

export default UploadTranscript;

const styles = StyleSheet.create({
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
});

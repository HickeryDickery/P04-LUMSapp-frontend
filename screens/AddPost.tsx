import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";

const AddPost = () => {
  const [text, onChangeText] = useState("");
  const [pressed, setPressed] = useState(false);

  const addPost = async () => {
    onChangeText("");
    try {
      const resp = await axios.post(`${IP}/post/create`, {
        text: text,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Add a post</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={onChangeText}
        value={text}
        multiline={true} // ios fix for centering it at the top-left corner
        numberOfLines={10}
      />
      <Pressable onPress={addPost} style={styles.button}>
        <Text style={{ color: "white", textAlign: "center" }}>Add Post</Text>
      </Pressable>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  inputText: {
    height: "50%",
    width: "90%",
    margin: 12,
    borderWidth: 1,
    backgroundColor: "#111111",
    padding: 10,
    textAlignVertical: "top", // top fixes for android
    color: "white",
    borderRadius: 10,
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: "50%",
    backgroundColor: "#35C2C1",
    marginVertical: 10,
  },
  header: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
});

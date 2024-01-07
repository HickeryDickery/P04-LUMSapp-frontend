import { StyleSheet, Text, View } from "react-native";
import { TextInput, Pressable } from "react-native";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { IP } from "../constants/ip";
import { useNavigation } from "@react-navigation/native";

const EditPost = ({ route }: any) => {
  const { postProps } = route.params;
  const navigation = useNavigation();

  const [text, onChangeText] = useState(postProps.body);
  // const [pressed, setPressed] = useState(false);

  const editPost = async () => {
    onChangeText("");
    try {
      const res = await axios.post(`${IP}/post/edit`, {
        postId: postProps.postID,
        text: text,
      });
      if (res.data.success) {
        navigation.goBack();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Edit your Post </Text>
      <TextInput
        style={styles.inputText}
        onChangeText={onChangeText}
        value={text}
        multiline={true} // ios fix for centering it at the top-left corner
        numberOfLines={10}
      />
      <Pressable onPress={editPost} style={styles.button}>
        <Text style={{ color: "white", textAlign: "center" }}>Edit Post</Text>
      </Pressable>
    </View>
  );
};

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

export default EditPost;

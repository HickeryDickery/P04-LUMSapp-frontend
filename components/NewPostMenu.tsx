import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { IP } from "../constants/ip";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { PostProps } from "./Post";

const NewPostMenu = (props: PostProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const deletePost = async () => {
    try {
      const res = await axios.post(`${IP}/post/delete`, {
        postId: props.postID,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async () => {
    try {
      const res = await axios.post(`${IP}/post/editPermission`, {
        postId: props.postID,
      });
      if (res.data.permission) {
        navigation.navigate("EditPost", {
          postProps: {
            ...props,
          },
        });
      } else {
        alert("You do not have permission to edit this post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.menuItems}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.Button}>
            <MaterialIcons name="report" size={24} color="red" />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Report Post
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.lineSeparator}></View>

        <TouchableOpacity
          onPress={() => {
            editPost();
          }}
        >
          <View style={styles.Button}>
            <Feather name="edit-2" size={24} color="cyan" />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Edit Post
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.lineSeparator}></View>
        <TouchableOpacity
          onPress={() => {
            deletePost();
          }}
        >
          <View style={styles.Button}>
            <Feather name="trash-2" size={24} color="grey" />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Delete Post
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPostMenu;

const styles = StyleSheet.create({
  line: {
    width: 75,
    height: 5,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 10,
  },
  menuItems: {
    flexDirection: "column",
    marginTop: 20,
    gap: 10,
  },
  Button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    // backgroundColor: "black",
    gap: 10,
    // borderWidth: 1,
    // borderColor: "#35C2B0",
    // borderRadius: 10,
  },
  lineSeparator: {
    width: "100%",
    height: 0.5,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 2,
  },
});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import Post from "../components/components_LDF/Post";
import React, { useState } from "react";

const DATA = [
  {
    id: "1",
    name: "Muneeb Akmal",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg",
    body: "This is the body",
    image:
      "https://cdn.pixabay.com/photo/2023/11/04/07/57/owl-8364426_1280.jpg",
    likes: 10,
    dislikes: 20,
    comments: 100,
  },
  {
    id: "2",
    name: "Nauman Ijaz",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg",
    body: "This is the body",
    image:
      "https://cdn.pixabay.com/photo/2021/04/26/01/39/trees-6207925_1280.jpg",
    likes: 10,
    dislikes: 20,
    comments: 100,
  },
  {
    id: "3",
    name: "Owais Ahsan",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg",
    body: "This is the body",
    image:
      "https://cdn.pixabay.com/photo/2023/11/04/10/03/bear-8364583_1280.png",
    likes: 10,
    dislikes: 300,
    comments: 100,
  },
  {
    id: "4",
    name: "Ahsan Ali",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg",
    body: "This is the body",
    image:
      "https://cdn.pixabay.com/photo/2021/04/26/01/39/trees-6207925_1280.jpg",
    likes: 10,
    dislikes: 20,
    comments: 100,
  },
];

const LdfHomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.scrollPost}
        data={DATA}
        renderItem={({ item }) => (
          <Post
            name={item.name}
            profileImage={item.profileImage}
            body={item.body}
            image={item.image}
            likes={item.likes}
            dislikes={item.dislikes}
            comments={item.comments}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default LdfHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollPost: {},
});

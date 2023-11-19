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
import SpecificPost from "../components/components_LDF/SpecificPost";
import React, { useState } from "react";
import CommentsUnderPost from "../components/components_LDF/CommentsUnderPost";
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
    time: "12:00",
    date: "12 Sep 23",
    views: 1000,
  },
];

const LdfSpecificPost = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SpecificPost
        name={DATA[0].name}
        profileImage={DATA[0].profileImage}
        body={DATA[0].body}
        image={DATA[0].image}
        likes={DATA[0].likes}
        dislikes={DATA[0].dislikes}
        comments={DATA[0].comments}
        time={DATA[0].time}
        date={DATA[0].date}
        views={DATA[0].views}
      />
      <CommentsUnderPost />
    </SafeAreaView>
  );
};

export default LdfSpecificPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollPost: {},
});

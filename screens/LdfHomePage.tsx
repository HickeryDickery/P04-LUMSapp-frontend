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
import { IP } from "../constants/IP2";
import axios from "axios";
import { useEffect } from "react";

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
    liked: false,
    disliked: true,
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
    liked: true,
    disliked: false,
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
    liked: true,
    disliked: false,
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
    liked: true,
    disliked: false,
  },
];

const LdfHomePage = () => {
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);

  const getData = async (page: number) => {
    try {
      const res = await axios.get(`${IP}/post/feed?page=${page}`);
      setPosts(res.data.posts);
      // console.log(res.data);
      console.log("Feed Fetched Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  // will run every time page changes
  useEffect(() => {
    getData(page);
  }, [page]);
  // useEffect(() => {
  //   getData(page);
  // });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.scrollPost}
        data={posts}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Post
            name={"Muneeb Akmal"}
            profileImage={"https://picsum.photos/200"}
            body={item.text}
            image={"https://picsum.photos/200"} // make this an array
            likes={item.likeCount}
            dislikes={item.dislikeCount}
            comments={item.commentCount}
            liked={item.isLikedbyUser}
            disliked={item.isDislikedbyUser}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={posts}
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

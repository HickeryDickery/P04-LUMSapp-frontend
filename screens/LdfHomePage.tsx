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

const LdfHomePage = ({ navigation }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const getData = async (page: number) => {
    try {
      const res = await axios.post(`${IP}/post/feed`, { page: page });
      setPosts((posts) => [...posts, ...res.data.posts]);
      console.log(res.data, page);
      console.log("Feed Fetched Successfully! of page no: ", page);
    } catch (error) {
      console.log(error);
    }
  };
  // will run every time page changes
  useEffect(() => {
    getData(page);
  }, [page, refresh]);
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
        onRefresh={() => {
          setPosts([]);
          setPage(0);
          setRefresh(!refresh);
        }}
        refreshing={false}
        onEndReachedThreshold={0.9}
        renderItem={({ item }) => (
          <Post
            name={item.postedBy.fullname}
            profileImage={"https://picsum.photos/200"}
            body={item.text}
            image={"https://picsum.photos/200"} // make this an array
            likes={item.likeCount}
            dislikes={item.dislikeCount}
            comments={item.commentCount}
            liked={item.isLikedbyUser}
            disliked={item.isDislikedbyUser}
            postID={item._id}
            onPress={navigation}
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

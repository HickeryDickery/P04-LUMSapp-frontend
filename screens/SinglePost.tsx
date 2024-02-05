import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "../components/Post";
import Comments from "./Comments";
import { ScrollView } from "react-native-gesture-handler";

const SinglePost = ({ route }: any) => {
  const { postProps } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Post
        name={postProps.name}
        profileImage={postProps.profileImage}
        body={postProps.body}
        image={postProps.image} // make this an array
        likes={postProps.likeCountUpdated}
        dislikes={postProps.dislikeCountUpdated}
        comments={postProps.comments}
        liked={postProps.likedUpdated}
        disliked={postProps.dislikedUpdated}
        postID={postProps.postID}
        postMenuRef={postProps.ref}
      />
      <Comments
        route={{
          ...route,
          params: { ...route.params, postId: postProps.postID },
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "black",
  },
  postMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SinglePost;

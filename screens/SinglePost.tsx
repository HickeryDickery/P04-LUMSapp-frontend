import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "../components/components_LDF/Post";
import Comments from "./Comments";

const SinglePost = ({ route }: any) => {
  const { postProps } = route.params;
  // console.log(postProps);

  return (
    <View style={styles.container}>
      <Post
        name={postProps.postedBy.fullname}
        profileImage={"https://picsum.photos/200"}
        body={postProps.text}
        image={"https://picsum.photos/200"} // make this an array
        likes={postProps.likeCount}
        dislikes={postProps.dislikeCount}
        comments={postProps.commentCount}
        liked={postProps.isLikedbyUser}
        disliked={postProps.isDislikedbyUser}
        postID={postProps._id}
      />
      <Comments
        route={{
          ...route,
          params: { ...route.params, postId: postProps._id },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
});

export default SinglePost;

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Comment = ({ comment }: any) => {
  // console.log(comment)

  // console.log('comment:', comment);
  // console.log('profilePictureUrl:', comment?.postedBy?.profile_picture?.url);
  // console.log('postedByFullname:', comment?.postedBy?.fullname);
  // console.log('commentText:', comment?.text);

  // const profilePictureUrl = comment?.postedBy.profile_picture?.url || "";
  const postedByFullname = comment?.postedBy?.fullname || "";
  const commentText = comment?.text || "";

  return (
    <View style={[styles.commentContainer]}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{
            uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
          }}
          style={styles.profile_picture}
        />
        <Text style={styles.fullname}>{postedByFullname}</Text>
      </View>

      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{commentText}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: "black",
  },
  commentContainer: {
    marginBottom: 16,
    // borderColor: "grey",
    backgroundColor: "#195e5e",
    borderWidth: 1,
    borderRadius: 5,

    padding: 2,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "white",
    marginBottom: 8,
  },
  profile_picture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  fullname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  commentContent: {
    marginBottom: 8,
    backgroundColor: "#144a4a",
    borderRadius: 4,
    padding: 8,
  },
  commentText: {
    fontSize: 16,
    color: "white",
  },

  seeMore: {
    color: "gray",
    fontSize: 14,
    marginBottom: 4,
  },

  newCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  newCommentInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    color: "white",
  },
});

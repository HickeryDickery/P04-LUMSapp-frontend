import React from "react";
import { View, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import MediaCard from "../components/MediaCard";
import FooterPostDetails from "../components/FooterPostDetails";

function PostImageScroll({ route }: any) {
  const postProps = route.params.postProps;
  return (
    <View style={styles.wrap}>
      <FlatList
        refreshing={true}
        style={styles.imageScroll}
        data={postProps.media}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <MediaCard media={item} />}
      />
      <FooterPostDetails
        likes={postProps.likeCountUpdated}
        dislikes={postProps.dislikeCountUpdated}
        comments={postProps.comments}
        liked={postProps.likedUpdated}
        disliked={postProps.dislikedUpdated}
        postID={postProps.postID}
      />
    </View>
  );
}

export default PostImageScroll;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "black",
  },
  imageScroll: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

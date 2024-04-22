//COLORS DONE
import React from "react";
import { View, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import MediaCard from "../components/MediaCard";
import FooterPostDetails from "../components/FooterPostDetails";
import { POST_MEDIA_SCROLL_BCKG_COLOR } from "../constants/color";

function PostMediaScroll({ route }: any) {
  const postProps = route.params.postProps;
  return (
    <View style={styles.container}>
      <View style={styles.mediaStyle}>
        <FlatList
          refreshing={true}
          style={styles.imageScroll}
          data={postProps.media}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <MediaCard media={item} />}
        />
      </View>
      <View style={styles.bottomBar}>
        <FooterPostDetails
          likes={postProps.likeCountUpdated}
          dislikes={postProps.dislikeCountUpdated}
          comments={postProps.comments}
          liked={postProps.likedUpdated}
          disliked={postProps.dislikedUpdated}
          postID={postProps.postID}
        />
      </View>
    </View>
  );
}

export default PostMediaScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: POST_MEDIA_SCROLL_BCKG_COLOR,
    justifyContent: "center",
  },
  mediaStyle: {},
  bottomBar: {
    zIndex: 1000,
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
  },
  imageScroll: {},
});

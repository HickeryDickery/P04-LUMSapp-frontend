import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";

import Post from "../components/Post";
import React, { useState } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { useEffect } from "react";
import NewPostMenu from "../components/NewPostMenu";
import { HEIGHT, OVERDRAG } from "../constants/size";
import { BACKDROP_COLOR, PRIMARY_COLOR } from "../constants/color";
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { PostProps } from "../components/Post";

const media = [
  "https://images.pexels.com/photos/139038/pexels-photo-139038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  "https://picsum.photos/306",
];

const LdfHomePage = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>();

  const toggleSheet = (post: PostProps) => {
    setIsOpen(!isOpen);
    setSelectedPost(post);
  };
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  // const ref = useRef<PostMenuRefProps>(null);

  const getData = async (page: number) => {
    try {
      const res = await axios.post(`${IP}/post/feed`, { page: page });
      setPosts((posts) => [...posts, ...res.data.posts]);
    } catch (error) {
      console.log(error);
    }
  };
  // will run every time page changes
  useEffect(() => {
    getData(page);
  }, [page, refresh]);

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
            key={item._id}
            name={item.postedBy?.fullname || "Deleted User"}
            profileImage={"https://picsum.photos/201"}
            body={item.text}
            media={media}
            likes={item.likeCount}
            dislikes={item.dislikeCount}
            comments={item.commentCount}
            liked={item.isLikedbyUser}
            disliked={item.isDislikedbyUser}
            postID={item._id}
            toggleSheet={toggleSheet}
            // postMenuRef={ref}
          />
        )}
        extraData={posts}
      />
      {isOpen && (
        <>
          <AnimatedPressable
            style={styles.backdrop}
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => toggleSheet(selectedPost)}
          />
          <Animated.View
            style={styles.sheet}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
          >
            <NewPostMenu
              name={selectedPost.name}
              profileImage={selectedPost.profileImage}
              body={selectedPost.body}
              media={selectedPost.media}
              likes={selectedPost.likes}
              dislikes={selectedPost.dislikes}
              comments={selectedPost.comments}
              liked={selectedPost.liked}
              disliked={selectedPost.disliked}
              postID={selectedPost.postID}
            />
          </Animated.View>
        </>
      )}
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
  // postMenu: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
  sheet: {
    backgroundColor: "#272727",
    opacity: 1,
    padding: 16,
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
});

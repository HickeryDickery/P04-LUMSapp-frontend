import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useEffect, useRef } from "react";
import { IP } from "../constants/ip";
import axios from "axios";

import { PostMenuRefProps } from "./PostMenu";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

export type PostProps = {
  name: string;
  profileImage: string;
  body: string;
  image: string; // revisit the type of image
  likes: number;
  dislikes: number;
  comments: number;
  liked: boolean;
  disliked: boolean;
  postID: string;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 3;

const Post = (
  props: PostProps & { postMenuRef: React.RefObject<PostMenuRefProps> } /// The PostMenuRef is causing the non-serlizable value warning, you have to find a workaround for this
) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [liked, setLiked] = useState(props.liked);
  const [disliked, setDisliked] = useState(props.disliked);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);
  const [update, setUpdate] = useState(false);
  const ref = props.postMenuRef;

  const onOptionSelect = useCallback(async () => {
    const isActive = ref?.current?.isActive();
    ref?.current?.setPostPropsFunc(props);

    if (isActive) {
      //OPEN
      ref?.current?.scrollTo(MAX_TRANSLATE_Y);
    } else {
      //CLOSE
      ref?.current?.scrollTo(250);
    }
  }, []);

  const likePost = async () => {
    try {
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
      setDisliked(false);
      setUpdate(!update);

      if (disliked == true) {
        // Here SendReverseLike Request
        // console.log("Was disliked Earlier - Changing state to earlier one");
        setDislikeCount(dislikeCount - 1);
        const res = await axios.post(`${IP}/post/dislike`, {
          postId: props.postID,
        });
      }
      const res = await axios.post(`${IP}/post/like`, { postId: props.postID });
      console.log(res.data);

      // console.log("Sent Like Request");
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async () => {
    try {
      if (disliked == true) {
        setDislikeCount(dislikeCount - 1);
      } else {
        setDislikeCount(dislikeCount + 1);
      }
      setDisliked(!disliked);
      setLiked(false);
      setUpdate(!update);
      if (liked == true) {
        // console.log("Was Liked Earlier -> Decrementing  ");
        setLikeCount(likeCount - 1);
        const res = await axios.post(`${IP}/post/like`, {
          postId: props.postID,
        });
      }
      const res = await axios.post(`${IP}/post/dislike`, {
        postId: props.postID,
      });
      console.log(res.data);

      // console.log("Sent Dislike Request");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLiked(liked);
    setDisliked(disliked);
  }, [update]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("SinglePost", {
          postProps: {
            ...props,
            ref: ref,
            likedUpdated: liked,
            dislikedUpdated: disliked,
            likeCountUpdated: likeCount,
            dislikeCountUpdated: dislikeCount,
          },
        });
      }}
    >
      <View style={styles.post}>
        <View style={styles.headerPost}>
          <View style={styles.profileComponent}>
            {/* Image and Name are One Element so we have a separate View(div) for them */}
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
              source={{
                uri: props.profileImage,
              }} /*require path is for static images only*/
            />
            <Text style={styles.white}>{props.name}</Text>
          </View>
          <TouchableOpacity style={styles.options} onPress={onOptionSelect}>
            <SimpleLineIcons name="options-vertical" size={18} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyPost}>
          <Text style={styles.bodyFont}>{props.body}</Text>
          <Image
            style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }} // This a temporary solution, what we need to is get the size of the image and set the aspect ratio accordingly so that it takes the whole width and height is set accordingly
            source={{
              uri: props.image,
            }} /*require path is for static images only*/
          />
        </View>
        <View style={styles.footerPost}>
          <View style={styles.leftFooter}>
            <TouchableOpacity
              style={styles.footerComponent}
              onPress={() => {
                likePost();
              }}
            >
              <FontAwesome
                name="arrow-up"
                size={24}
                color={liked ? "white" : "grey"}
              />
              <Text
                style={{
                  color: liked ? "white" : "grey",
                  fontSize: 10,
                }}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerComponent}
              onPress={() => {
                dislikePost();
              }}
            >
              <FontAwesome
                name="arrow-down"
                size={24}
                color={disliked ? "white" : "grey"}
              />
              <Text
                style={{
                  color: disliked ? "white" : "grey",
                  fontSize: 10,
                }}
              >
                {dislikeCount}
              </Text>
              {/* This is grey because it is not pressed(we haven't disliked). We have to make this dynamic rather than static*/}
            </TouchableOpacity>
            <View style={styles.footerComponent}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={24}
                color="grey"
              />
              <Text style={{ color: "grey", fontSize: 10 }}>
                {props.comments}
              </Text>
              {/* This is grey because it is not pressed (we haven't commented). We have to make this dynamic rather than static*/}
            </View>
          </View>
          <View style={styles.rightFooter}>
            <View style={styles.footerComponent}>
              <Feather name="send" size={24} color="grey" />
            </View>
            <View style={styles.footerComponent}>
              <Feather name="bookmark" size={24} color="grey" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Post;

const styles = StyleSheet.create({
  post: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(29,29,29,0.5)",
    borderBottomWidth: 0.4,
    borderColor: "#35C2C1",
    padding: 12,
    width: "98%",
    borderRadius: 8,
    gap: 20,
    marginBottom: 10,
  },
  headerPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "-3%",
    alignItems: "center",
  },
  bodyPost: {},
  bodyFont: { color: "white", paddingBottom: 20 },
  footerPost: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftFooter: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  rightFooter: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  footerComponent: {
    // used for like, dislike, comment, share and bookmark
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  white: { color: "white" },
  profileComponent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  options: {
    padding: "3%",
    borderRadius: 10,
  },
});

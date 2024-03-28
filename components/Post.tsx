import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useEffect, useRef } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../constants/color";
import MediaCard from "./MediaCard";

export type PostProps = {
  name: string;
  profileImage: string;
  body: string;
  media: string[]; // revisit the type of image
  likes: number;
  dislikes: number;
  comments: number;
  liked: boolean;
  disliked: boolean;
  postID: string;
  toggleSheet?: (post: PostProps) => void | null;
};

const Post = (
  props: PostProps /*{ { postMenuRef: React.RefObject<PostMenuRefProps> }}*/ /// The PostMenuRef is causing the non-serlizable value warning, you have to find a workaround for this
) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [liked, setLiked] = useState(props.liked);
  const [disliked, setDisliked] = useState(props.disliked);
  const [likeCount, setLikeCount] = useState<any>(props.likes);
  const [dislikeCount, setDislikeCount] = useState<any>(props.dislikes);
  const [update, setUpdate] = useState(false);

  // const ref = props.postMenuRef;

  // const onOptionSelect = useCallback(async () => {
  //   const isActive = ref?.current?.isActive();
  //   ref?.current?.setPostPropsFunc(props);

  //   if (isActive) {
  //     //OPEN
  //     ref?.current?.scrollTo(MAX_TRANSLATE_Y);
  //   } else {
  //     //CLOSE
  //     ref?.current?.scrollTo(250);
  //   }
  // }, []);

  const likePressed = async () => {
    try {
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }

      setLiked(!liked); // Reverse the liked status

      setUpdate(!update);
      //////// NOW WE HAVE DONE IT ON THE FRONTEND, LETS DO IT ON THE BACKEND

      const res = await axios.post(`${IP}/post/like`, { postId: props.postID });
      console.log(res.data); // SEND LIKE REQUEST

      if (disliked == true) {
        const res2 = await axios.post(`${IP}/post/dislike`, {
          postId: props.postID,
        });
        console.log(res2.data);
      }

      // console.log("Sent Like Request");
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePressed = async () => {
    try {
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
      } else {
        setDislikeCount(dislikeCount + 1);
      }
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
      setDisliked(!disliked); // Reverse the disliked status
      setUpdate(!update);

      const res = await axios.post(`${IP}/post/dislike`, {
        postId: props.postID,
      });
      console.log(res.data);

      if (liked == true) {
        // console.log("Was Liked Earlier -> Decrementing  ");
        const res2 = await axios.post(`${IP}/post/like`, {
          postId: props.postID,
        });
        console.log(res2.data);
      }

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
    <View style={styles.post}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const { toggleSheet, ...rest } = props;
          navigation.navigate("SinglePost", {
            postProps: {
              ...rest,
              likedUpdated: liked,
              dislikedUpdated: disliked,
              likeCountUpdated: likeCount,
              dislikeCountUpdated: dislikeCount,
            },
          });
        }}
      >
        <View style={styles.headerPost}>
          <View style={styles.profileComponent}>
            {/* Image and Name are One Element so we have a separate View(div) for them */}
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
              source={{
                uri: props.profileImage,
              }} /*require path is for static images only*/
            />
            <Text style={styles.posterName}>{props.name}</Text>
          </View>
          {/* Here include the the on pressable functions for options select for the old Post Menu */}
          <TouchableOpacity
            style={styles.options}
            onPress={() => props.toggleSheet?.(props)}
          >
            <SimpleLineIcons name="options-vertical" size={18} color="grey" />
          </TouchableOpacity>
        </View>

        <Text style={styles.bodyFont}>{props.body}</Text>
      </TouchableOpacity>
      {props.media.length == 0 ? null : (
        <View style={styles.imageFlatlist}>
          <FlatList
            refreshing={true}
            style={styles.imageScroll}
            data={props.media}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  const { toggleSheet, ...rest } = props;
                  navigation.navigate("PostImageScroll", {
                    postProps: {
                      ...rest,
                      likedUpdated: liked,
                      dislikedUpdated: disliked,
                      likeCountUpdated: likeCount,
                      dislikeCountUpdated: dislikeCount,
                    },
                  });
                }}
              >
                <View style={styles.mediaBox}>
                  <Text style={styles.mediaBadge}>
                    {index + 1} / {props.media.length}
                  </Text>

                  <MediaCard media={item} />
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("SinglePost", {
            postProps: {
              ...props,
              // ref: ref,
              likedUpdated: liked,
              dislikedUpdated: disliked,
              likeCountUpdated: likeCount,
              dislikeCountUpdated: dislikeCount,
            },
          });
        }}
      >
        <View style={styles.footerPost}>
          <View style={styles.leftFooter}>
            <View style={styles.likeDislike}>
              <TouchableOpacity
                style={styles.footerComponent}
                onPress={() => {
                  likePressed();
                }}
              >
                <Foundation
                  name="arrow-up"
                  size={28}
                  color={liked ? PRIMARY_COLOR : "grey"}
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
                  dislikePressed();
                }}
              >
                <Foundation
                  name="arrow-down"
                  size={28}
                  color={disliked ? PRIMARY_COLOR : "grey"}
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
            </View>
            <View style={styles.comment}>
              <View style={styles.footerComponent}>
                <Octicons name="comment" size={25} color="grey" />
                <Text style={{ color: "grey", fontSize: 10 }}>
                  {props.comments}
                </Text>
                {/* This is grey because it is not pressed (we haven't commented). We have to make this dynamic rather than static*/}
              </View>
            </View>
          </View>
          <View style={styles.rightFooter}>
            {/* <View style={styles.footerComponent}>
              <Feather name="send" size={24} color="grey" />
            </View> */}
            <View style={styles.footerComponent}>
              <Feather name="bookmark" size={24} color="grey" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Post;

const styles = StyleSheet.create({
  post: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(29,29,29,0.4)",
    borderWidth: 0.1,
    borderColor: "#35C2C1",
    paddingBottom: 12,
    paddingTop: 12,
    width: "100%",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    gap: 20,
    marginBottom: 10,
  },
  headerPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "-3%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  bodyPost: {},
  mediaBox: {
    position: "relative",
  },
  mediaBadge: {
    color: "white",
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 10,
  },
  bodyFont: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
  },
  footerPost: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  leftFooter: {
    display: "flex",
    flexDirection: "row",
    gap: 35,
  },
  likeDislike: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  comment: {},
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
  posterName: { color: "white", fontWeight: "bold", fontSize: 16 },
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
  imageFlatlist: {
    //   width: SCREEN_WIDTH,
    //   aspectRatio: 16 / 9,
    //   height: "auto",
  },

  imageScroll: {},
});
//  <Image
//    style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }} // This a temporary solution, what we need to is get the size of the image and set the aspect ratio accordingly so that it takes the whole width and height is set accordingly
//    source={{
//      uri: "https://picsum.photos/304",
//    }} /*require path is for static images only*/
//  />;

import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
} from "react-native";

import Post from "../components/Post";
import React, { useState } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import PostMenu from "../components/PostMenu";
import { useRef } from "react";
import { PostMenuRefProps } from "../components/PostMenu";
import { Feather } from "@expo/vector-icons";

const Profile = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [icon, setIcon]: any = useState();

  const { user }: any = useAppSelector((state) => state.auth);

  const ref = useRef<PostMenuRefProps>(null);

  const getData = async (page: number) => {
    try {
      const res = await axios.post(`${IP}/post/user`, { page: page });
      setPosts((posts) => [...posts, ...res.data.posts]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUsername(user?.name);
    setBio(user?.bio);
    setIcon(user?.profile_picture);
    console.log(user?.profile_picture);
  }, [user]);
  // will run every time page changes
  useEffect(() => {
    getData(page);
    console.log(user);
  }, [page, refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          style={{
            width: "30%",
            height: "auto",
            borderRadius: 100,
            aspectRatio: 1 / 1,
          }}
          source={{
            uri: icon ? icon!.url : "https://picsum.photos/201",
          }} /*require path is for static images only*/
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                {posts?.length}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                Post{posts?.length != 1 ? "s" : null}
              </Text>
            </View>
            <Text
              style={{
                backgroundColor: "#19282F",
                color: "white",
                borderRadius: 5,
                padding: 5,
                paddingHorizontal: 8,
              }}
            >
              @{user?.email.split("@")[0]}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                '{user?.email.split("@")[0].slice(0, 2)}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                SBASSE
              </Text>
            </View>
            <Text
              style={{
                backgroundColor: "#19282F",
                color: "white",
                borderRadius: 5,
                padding: 5,
                paddingHorizontal: 8,
              }}
            >
              <Feather name="calendar" size={16} color="white" /> Aug 2023
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: "white",
          width: "90%",
          marginTop: 8,
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {username}
      </Text>
      <Text
        style={{
          color: "white",
          width: "90%",
          marginTop: 8,
        }}
      >
        {bio}
      </Text>
      <TouchableOpacity
        style={styles.editProfileBttn}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Edit profile</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 12,
            borderBottomWidth: 4,
            borderBottomColor: "#35C2C1",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Media
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          opacity: 0.6,
          borderBottomColor: "#848484",
          borderBottomWidth: 1,
        }}
      />
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
            media={["https://picsum.photos/300"]} // make this an array
            likes={item.likeCount}
            dislikes={item.dislikeCount}
            comments={item.commentCount}
            liked={item.isLikedbyUser}
            disliked={item.isDislikedbyUser}
            postID={item._id}
            // postMenuRef={ref}
          />
        )}
        extraData={posts}
      />
      <View style={styles.postMenu}>
        <PostMenu ref={ref} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollPost: {},
  postMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  editProfileBttn: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#35C2C1",
    borderRadius: 5,
    width: "90%",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
});

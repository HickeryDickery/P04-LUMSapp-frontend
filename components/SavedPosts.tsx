import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    View,
    Image,
    Text,
} from "react-native";

import Post from "./Post";
import React, { useState } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import PostMenu from "./PostMenu";
import { useRef } from "react";
import { PostMenuRefProps } from "./PostMenu";

const SavedPosts = ({ navigation }: any) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);

    const ref = useRef<PostMenuRefProps>(null);

    const getData = async (page: number) => {
        try {
            const res = await axios.post(`${IP}/post/bookmarks`, {
                page: page,
            });

            setPosts((posts) => [...posts, ...res.data.posts]);
        } catch (error) {
            console.log(error);
        }
    };
    // will run every time page changes
    useEffect(() => {
        getData(page);
        // console.log(user);
    }, [page, refresh]);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: "100%",
                    opacity: 0.6,
                    // borderBottomColor: "#848484",
                    // borderBottomWidth: 1,
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
                        profileImage={item.postedBy?.profile_picture?.url}
                        body={item.text}
                        media={item.media} // make this an array
                        likes={item.likeCount}
                        dislikes={item.dislikeCount}
                        comments={item.commentCount}
                        liked={item.isLikedbyUser}
                        disliked={item.isDislikedbyUser}
                        postID={item._id}
                        bookmarked={item.isBookmarkedByUser}
                        // postMenuRef={ref}
                    />
                )}
                extraData={posts}
            />
            {/* </View> */}
            <View style={styles.postMenu}>
                <PostMenu ref={ref} />
            </View>
        </SafeAreaView>
    );
};

export default SavedPosts;

const styles = StyleSheet.create({
    menuIcon: {
        position: "absolute",
        top: 44, // Adjust top margin to match your status bar height
        right: 16, // Keep the icon on the right side
        zIndex: 10, // Ensure the icon is above other elements
    },

    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollPost: {
        width: "100%",
        minHeight: "100%",
    },
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

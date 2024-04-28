import { FlatList, View, StyleSheet } from "react-native";
import React, { useEffect, forwardRef, memo } from "react";
import Post from "../components/Post";
import PostMenu from "../components/PostMenu";
import { UserPostRef, UserPostProps } from "../types/userPostTypes";

const UserPosts = forwardRef<UserPostRef, UserPostProps>((props, ref) => {
    useEffect(() => {
        props.getPostData(props.postPage);
    }, [props.postPage, props.postRefresh]);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#000",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
            <FlatList
                style={styles.scrollPost}
                data={props.posts}
                onEndReached={() => {
                    props.setPostPage(props.postPage + 1);
                }}
                onRefresh={() => {
                    props.setPosts([]);
                    props.setPostPage(0);
                    props.setPostRefresh(!props.postRefresh);
                }}
                refreshing={false}
                onEndReachedThreshold={0.9}
                renderItem={({ item }) => (
                    <Post
                        key={item._id}
                        name={item.postedBy?.fullname || "Deleted User"}
                        profileImage={
                            item.postedBy?.profile_picture?.url ||
                            "https://picsum.photos/201"
                        }
                        body={item.text}
                        media={item.media || ["https://picsum.photos/300"]} // make this an array
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
                extraData={props.posts}
            />
            <View style={styles.postMenu}>
                <PostMenu ref={ref} />
            </View>
        </View>
    );
});

export default memo(UserPosts);

const styles = StyleSheet.create({
    scrollPost: {
        width: "100%",
    },
    postMenu: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
});

import {
    Alert,
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";

const Comment = ({
    comment,
    showReplies,
    userId,
    onReplySubmit,
    onPress,
    onDataChange,
    deleteComment,
}: any) => {
    const [showRepliesInside, setShowReplies] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [replies, setReplies] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const commentUserId: string = comment.postedBy._id;
    const myId: string = userId;

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
            const res = await axios.post(`${IP}/comment/update`, {
                commentId: comment._id,
                text: editedText,
            });
            console.log("Comment updated successfully:", res.data);
            comment.text = editedText;

            setEditMode(false);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteCommentInternal(), // Call the function to delete comment
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    // Function to delete comment
    const deleteCommentInternal = async () => {
        try {
            const res = await axios.post(`${IP}/comment/delete`, {
                commentId: comment._id,
            });

            // console.log("Comment deleted successfully:", res.data);

            deleteComment(comment._id) ?? "";
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const deleteReply = (replyId: any) => {
        // Filter out the deleted reply from the replies list
        const updatedReplies = comment.replies.filter(
            (reply: any) => reply._id !== replyId
        );
        comment.replies = updatedReplies;
        if (updatedReplies.length === 0) {
            // setReplies(false);
            setShowReplies(false);
        } else {
            setReplies(false);
            setReplies(true);
        }
    };

    useEffect(() => {
        comment?.likeCount ? setUpvotes(comment.likeCount) : setUpvotes(0);
        comment?.dislikeCount
            ? setDownvotes(comment.dislikeCount)
            : setDownvotes(0);

        const isCurrentUserDisliked = comment?.isDislikedByUser ? true : false;
        const isCurrentUserLiked = comment?.isLikedByUser ? true : false;
        if (isCurrentUserLiked) {
            setUpVoted(true);
        } else {
            setUpVoted(false);
        }
        if (isCurrentUserDisliked) {
            setDownVoted(true);
        } else {
            setDownVoted(false);
        }
    }, [comment?.likeCount, comment?.dislikeCount]);

    const toggleReplies = () => {
        setShowReplies(!showRepliesInside);
    };

    useEffect(() => {
        // console.log("hfsefa")
        if (showRepliesInside) {
            const data = axios.post(`${IP}/comment/replies`, {
                commentId: comment._id,
            });
            data.then((res) => {
                comment.replies = res.data.replies;
                setReplies(true);
            }).catch((error) => {
                console.log(error);
            });

            // console.log(replies);
        }
    }, [showRepliesInside]);

    const [data, setData] = useState({
        id: "-1",
        name: "NaN",
    });

    // console.log(comment)

    const handlePress = () => {
        const userName = comment.postedBy ? comment.postedBy.fullname : "";
        const newData = {
            id: comment._id,
            name: userName,
        };
        setData(newData);
        // Pass the modified data to the parent component
        onDataChange ? onDataChange(newData) : "";
        onPress ? onPress() : "";
    };
    const handleUpVote = () => {
        if (downVoted) {
            setDownvotes((prevDownvotes) => prevDownvotes - 1);
            setUpvotes((prevUpvotes) => prevUpvotes + 1);
            setDownVoted(false);
            setUpVoted(true);
            submitVote("del_down")
                .then(() => {
                    submitVote("up");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (upVoted) {
            setUpvotes((prevUpvotes) => prevUpvotes - 1);
            setUpVoted(false);
            submitVote("del_up");
        } else {
            setUpvotes((prevUpvotes) => prevUpvotes + 1);
            setUpVoted(true);
            submitVote("up");
        }
    };

    const handleDownVote = () => {
        if (upVoted) {
            setUpvotes((prevUpvotes) => prevUpvotes - 1);
            setDownvotes((prevDownvotes) => prevDownvotes + 1);
            setUpVoted(false);
            setDownVoted(true);
            submitVote("del_up")
                .then(() => {
                    submitVote("down");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (downVoted) {
            setDownvotes((prevDownvotes) => prevDownvotes - 1);
            setDownVoted(false);
            submitVote("del_down");
        } else {
            setDownvotes((prevDownvotes) => prevDownvotes + 1);
            setDownVoted(true);
            submitVote("down");
        }
    };

    const submitVote = async (vote: string) => {
        try {
            const res = await axios.post(`${IP}/comment/vote`, {
                commentId: comment._id,
                voteType: vote,
            });
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={{
                paddingBottom: 5,
                marginTop: 2,
                marginLeft: comment.level !== 0 ? 10 : 0,
            }}
        >
            <View style={styles.userInfoContainer}>
                <View
                    style={comment.level !== 0 ? styles.lineContainer : null}
                ></View>
                <Image
                    source={{
                        uri: "data:image/jpeg;base64,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",
                    }}
                    style={{
                        ...styles.profile_picture,
                        width: comment.level !== 0 ? 30 : 40,
                        height: comment.level !== 0 ? 30 : 40,
                    }}
                />
                <Text
                    style={{
                        ...styles.fullname,
                        fontSize: comment.level !== 0 ? 12 : 14,
                    }}
                >
                    {comment.postedBy ? comment.postedBy.fullname : ""}
                </Text>
            </View>

            <View style={styles.commentContainer}>
                <View
                    style={{
                        ...styles.InnerCommentContainer,
                        borderLeftWidth: showRepliesInside ? 3 : 0,
                    }}
                ></View>

                <View style={styles.commentContent}>
                    {editMode ? (
                        <TextInput
                            value={editedText}
                            onChangeText={setEditedText}
                            autoFocus
                            multiline
                            style={styles.commentText}
                        />
                    ) : (
                        <TouchableOpacity onPress={handlePress}>
                            <Text style={styles.commentText}>
                                {comment.text}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {!editMode ? (
                        commentUserId === myId && (
                            <View
                                style={{
                                    position: "relative",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    right: 0,
                                    marginBottom: 1,
                                }}
                            >
                                {onDataChange ? (
                                    <TouchableOpacity onPress={handleEdit}>
                                        <MaterialCommunityIcons
                                            name="pencil"
                                            size={15}
                                            color="white"
                                            style={{ right: 10 }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    ""
                                )}
                                {deleteComment ? (
                                    <TouchableOpacity onPress={handleDelete}>
                                        <MaterialCommunityIcons
                                            name="delete"
                                            size={15}
                                            color="white"
                                            style={{ right: 0 }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    ""
                                )}
                            </View>
                        )
                    ) : (
                        <View
                            style={{
                                position: "relative",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                right: 0,
                                marginBottom: 1,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={handleSave}
                            >
                                <Text>save</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.voteContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={handleUpVote}
                            style={{ padding: 1 }}
                        >
                            <MaterialCommunityIcons
                                name="arrow-up-bold"
                                size={20}
                                color={upVoted ? "#35C2C1" : "white"}
                            />
                        </TouchableOpacity>

                        <Text style={{ fontStyle: "italic", color: "white" }}>
                            {upvotes}
                        </Text>
                    </View>
                    <View style={{ marginLeft: 40, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={handleDownVote}
                            style={{ padding: 1 }}
                        >
                            <MaterialCommunityIcons
                                name="arrow-down-bold"
                                size={20}
                                color={downVoted ? "#35C2C1" : "white"}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontStyle: "italic", color: "white" }}>
                            {downvotes}
                        </Text>
                    </View>
                    {comment.replies && comment.replies.length > 0 && (
                        <View style={{ position: "absolute", right: 40 }}>
                            {/* <View style={{ flexDirection: "row", right: 0 }}> */}
                            <TouchableOpacity
                                onPress={toggleReplies}
                                style={{ flexDirection: "row" }}
                            >
                                {showRepliesInside ? (
                                    <MaterialCommunityIcons
                                        name="chevron-up"
                                        size={20}
                                        color="white"
                                    />
                                ) : (
                                    <>
                                        <Text
                                            style={{
                                                top: 2,
                                                fontSize: 12,
                                                color:
                                                    comment.replies.length > 0
                                                        ? "white"
                                                        : "grey",
                                                fontStyle: "italic",
                                                bottom: 10,
                                            }}
                                        >
                                            {comment.replies.length}{" "}
                                            {comment.replies.length > 1
                                                ? "Replies"
                                                : "Reply"}
                                        </Text>
                                        <View style={{ marginLeft: 0 }}>
                                            <MaterialCommunityIcons
                                                name="chevron-double-down"
                                                size={20}
                                                color="#35C2C1"
                                            />
                                        </View>
                                    </>
                                )}
                            </TouchableOpacity>
                            {/* </View> */}
                        </View>
                    )}
                </View>
            </View>
            {/* )} */}

            {comment.replies &&
                comment.replies.length > 0 &&
                showRepliesInside &&
                // <FlatList
                //   data={comment.replies}
                //   keyExtractor={(commentId, _) => commentId._id.toString()}
                //   renderItem={({ item, index }) => (
                //     <>
                //       {index !== comment.replies.length - 1 && (
                //         <View style={styles.commentContainer}>
                //            <View style={styles.InnerCommentContainer}>
                //            </View>
                //           <Comment comment={item} showReplies={showRepliesInside} onReplySubmit={onReplySubmit} onPress = {onPress} onDataChange = {onDataChange}/>
                //         </View>

                //       )}
                //       {index === comment.replies.length - 1 && (
                //         <View style={{ ...styles.commentContainer, borderColor: "transparent"}}>
                //            {/* <View style={{...styles.InnerCommentContainer,borderColor:"transparent"}}> */}

                //         <Comment comment={item} showReplies={showRepliesInside} onReplySubmit={onReplySubmit} onPress = {onPress} onDataChange = {onDataChange} />
                //         </View>

                //       )}
                //     </>
                //   )}
                // />
                comment &&
                replies &&
                comment.replies.map((item: any, index: any) => (
                    <View
                        key={item._id.toString()}
                        style={styles.commentContainer}
                    >
                        {index !== comment.replies.length - 1 && (
                            <View style={styles.InnerCommentContainer}></View>
                        )}
                        <Comment
                            comment={item}
                            showReplies={showRepliesInside}
                            userId={userId}
                            onReplySubmit={onReplySubmit}
                            onPress={onPress}
                            onDataChange={onDataChange}
                            deleteComment={deleteReply}
                        />
                    </View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    InnerCommentContainer: {
        position: "absolute",
        left: 0,
        right: 644,
        bottom: 0,
        height: "100%",
        width: 0,
        marginBottom: 0,
        borderLeftWidth: 3,
        borderLeftColor: "#3C4848",

        paddingTop: 0,
        marginLeft: 0,
        paddingLeft: 0,

        // backgroundColor: "#195e5e",

        // borderColor:"white",
        // borderWidth:4,

        // borderRadius: 5,

        // padding: 0,
    },
    commentContainer: {
        marginBottom: 0,
        // borderLeftWidth: 3,

        paddingTop: 0,
        marginLeft: 15,
        paddingLeft: 0,

        // backgroundColor: "#195e5e",
        // borderWidth: 1,

        // borderRadius: 5,

        padding: 0,
    },
    lineContainer: {
        position: "absolute",
        left: -10,
        right: 644,
        bottom: 15,
        height: 50,
        width: 30,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        // marginRight:0,
        // padding:10,
        // borderBottomColor: "white",
        // borderWidth: 1,
        // borderBlockColor: "white",
        paddingTop: 0,
        borderBottomLeftRadius: 5,
        paddingLeft: 0,
        // marginLeft: 10,
        borderColor: "#3C4848",
    },

    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        // borderColor: "white",

        // paddingLeft: 10,
        //  borderWidth: 1,
        marginTop: 3,

        paddingLeft: 1,
        marginBottom: 0,
    },
    profile_picture: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 5,
        marginLeft: 1,
    },
    fullname: {
        fontSize: 24,

        // fontWeight: "bold",

        color: "white",
    },
    voteContainer: {
        flexDirection: "row",
        // borderColor:"white",
        // borderWidth:2,

        paddingLeft: 20,
    },
    commentContent: {
        marginBottom: 1,
        backgroundColor: "#272727",
        borderTopLeftRadius: 0,
        borderRadius: 25,
        padding: 13,
        marginLeft: 10,
        marginRight: 20,
        // borderColor: "grey",
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: "white",
    },
    buttonStyle: {
        backgroundColor: "#35C2C1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10, // Adjust the value as needed for rounded corners
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
    },
});

export default Comment;

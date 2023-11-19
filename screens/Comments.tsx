import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";

const Comment = ({ comment, onReplyPress, isReply }) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <View style={[styles.commentContainer, isReply && { paddingLeft: 20 }]}>
      {!isReply && (
        <View style={styles.branchingLine}>
          <View style={styles.line} />
        </View>
      )}

      <View style={styles.userInfoContainer}>
        <Image source={{ uri: comment.userPicture }} style={styles.userPicture} />
        <Text style={styles.userName}>{comment.userName}</Text>
      </View>

      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.text}</Text>

        <TouchableOpacity onPress={onReplyPress}>
          <Text style={styles.replyButton}>Reply</Text>
        </TouchableOpacity>
      </View>

      {comment.replies && comment.replies.length > 0 && (
        <TouchableOpacity onPress={toggleReplies}>
          <Text style={styles.seeMore}>{showReplies ? "Hide Replies" : "See Replies"}</Text>
        </TouchableOpacity>
      )}

      {showReplies && comment.replies && comment.replies.length > 0 && (
        <FlatList
          data={comment.replies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Comment comment={item} onReplyPress={onReplyPress} isReply />}
        />
      )}
    </View>
  );
};

const CommentsScreen = () => {
  const commentsData = [
    {
      id: 1,
      userName: "John Doe",
      userPicture: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png",
      text: "This is the main comment.",
      replies: [
        { id: 2, userName: "Jane Smith", userPicture: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png", text: "Reply 1 to the main comment." },
        { id: 3, userName: "Bob Johnson", userPicture: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png", text: "Reply 2 to the main comment." },
      ],
    },
    {
      id: 4,
      userName: "Alice Brown",
      userPicture: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png",
      text: "Another main comment.",
      replies: [
        { id: 5, userName: "Charlie White", userPicture: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png", text: "Reply to another main comment." },
      ],
    },
  ];

  const handleReplyPress = () => {
    // Handle the action when the "Reply" button is pressed
    // This can include opening a modal or navigating to a reply screen
    console.log("Reply button pressed");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={commentsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Comment comment={item} onReplyPress={handleReplyPress} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  commentContainer: {
    marginBottom: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userPicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentContent: {
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
  },
  replyButton: {
    color: "blue",
    fontSize: 14,
    marginBottom: 4,
  },
  seeMore: {
    color: "gray",
    fontSize: 14,
    marginBottom: 4,
  },
  branchingLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 20,
    alignItems: "center",
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: "#ddd",
  },
});

export default CommentsScreen;

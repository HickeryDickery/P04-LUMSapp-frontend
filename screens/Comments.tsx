import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { IP } from "../constants/IP2";
const Comment = ({ comment }) => {
  return (
    <View style={[styles.commentContainer && { paddingLeft: 20 }]}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: comment.profile_picture.url }}
          style={styles.profile_picture}
        />
        <Text style={styles.fullname}>{comment.postedBy.fullname}</Text>
      </View>

      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  );
};

// type CommentListProps = {
//     commentsData: Array<any>;
//     onReplyPress: Dispatch<SetStateAction<CommentsState>>;
// }

const CommentList = ({ commentsData }) => {
  return (
    <FlatList
      data={commentsData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Comment comment={item} />}
    />
  );
};

const Comments = ({ route, navigation }: any) => {
  const [newComment, setNewComment] = useState("");
  const { postId } = route.params;

  const submitHandler = async () => {
    try {
      const { data } = await axios.post(`${IP}/comments`, {
        postId: postId,
        text: newComment,
      });
      // Handle the response data as needed
      setNewComment("");
      console.log("Reply submitted:", data);
      // Close the modal and clear the reply text
    } catch (error) {
      // Handle the error
      console.error("Error submitting reply:", error);
    }
  };

  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.post(`${IP}/comments/get`, {
          postId: postId,
        });
        setCommentsData(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  // const commentsData = [
  //     {
  //         id: 1,
  //         postedBy: {
  //             fullname: "John Doe",
  //             profile_picture: {
  //                 public_id: "",
  //                 url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png",
  //             }
  //         },
  //         profile_picture:{
  //             public_id: "",
  //             url: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.png",

  //         } ,
  //         text: "This is the main comment.",

  //     }
  // ];

  return (
    <View style={styles.container}>
      <CommentList commentsData={commentsData} />

      <View style={styles.newCommentContainer}>
        <TextInput
          style={styles.newCommentInput}
          placeholder="Enter a new comment"
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor={"#8e8e8e"}
        />
        <Button title="Submit" onPress={submitHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
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
  profile_picture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  fullname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  commentContent: {
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
    color: "white",
  },

  seeMore: {
    color: "gray",
    fontSize: 14,
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  newCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  newCommentInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    color: "white",
  },
});

export default Comments;

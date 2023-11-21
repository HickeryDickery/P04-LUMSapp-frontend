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
import { IP } from "../constants/ip";
import Comment from "../components/Comment";

interface commentI {
  text:string,
  likedBy: any
  dislikedBy: any
   
  postedBy: any

  likeCount:number
  dislikeCount: number
  createdAt:Date
  updatedAt: Date
}



const CommentList = ({ commentsData }:any) => {
  // console.log(commentsData)
  return (
    <FlatList
      data={commentsData}
      keyExtractor={(item,index) => item._id.toString()}
      renderItem={({ item })=> <Comment comment = {item} />}
    />
  );
};

const Comments = ({ route, navigation }: any) => {
  const [newComment, setNewComment] = useState("");
  const { postId } = route.params;

  const submitHandler = async () => {
    try {
      // setNewComment("");
      // const {postId} = route.params
      const { data } = await axios.post(`${IP}/comment/create`, {
        postId: postId,
        text: newComment,
      });
      // Handle the response data as needed
      setCommentsData((prevComments) => [...prevComments, data.comment]);
      setNewComment("")
    
      console.log("Reply submitted:", data);
      // Close the modal and clear the reply text
    } catch (error) {
      // Handle the error
      console.error("Error submitting reply:", error);
    }
  };

  const [commentsData, setCommentsData] =useState<any[]>([]);;
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.post(`${IP}/comment/get`, {
          postId: postId,
        });
        setCommentsData(data.comments);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);



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
    padding: 6,
    backgroundColor: "black",
  },
  commentContainer: {
    marginBottom: 16,
    // borderColor: "grey",
    backgroundColor: "#195e5e",
    borderWidth: 1,
    borderRadius: 5,
  
    padding: 2,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "white",
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
    backgroundColor:"#144a4a",
    borderRadius:4,
    padding:8,

    
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

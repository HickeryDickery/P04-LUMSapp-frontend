import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Image,StyleSheet, View, FlatList, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { IP } from "../constants/ip";
import { useAppSelector } from "../redux/hooks";
import Comment from "../components/Comment";





const findCommentById = (comments:any, commentId:any) => {
  for (const comment of comments) {
    if (comment._id === commentId) {
      return comment;
    }

    if (comment.replies && comment.replies.length > 0) {
      const foundInReplies:any = findCommentById(comment.replies, commentId);
      if (foundInReplies) {
        return foundInReplies;
      }
    }
  }

  return null; // Comment not found
};



const Comments = ({ route }: any) => {
  const [newComment, setNewComment] = useState("");
  const { postId } = route.params;
  const inputRef = useRef<any>(null);
  const [additionalData, setAdditionalData] = useState({id: "-1",
    name: 'nan'});

  const {user} = useAppSelector((state) => state.auth);
  



  const handlePress = () => {
    
    if (inputRef.current) {
      // Focus on the input when "Press me to input" is pressed
      inputRef.current.focus();
    }
  };

  const handleDataChange = (newData:any) => {
    // Update the additionalData in the parent component
    setAdditionalData(newData);
  };
  
  const submitHandler = async () => {
    try {
      // Dummy data for the new comment
      // const newCommentData = {
      //   _id: Math.random().toString(),
      //   postedBy: {fullname: user.name},
      //   text: newComment,
      //   replies: [],
      //   level: 0, // Top-level comment
      // };

      if (additionalData.id !== "-1") {
        // Replying to a comment
        // console.log(additionalData.id)
        const commentToReplyTo = findCommentById(commentsData, additionalData.id.toString());
        // console.log(commentToReplyTo)
        if (commentToReplyTo) {

          try{
            const { data } = await axios.post(`${IP}/comment/reply`, {
              commentId: additionalData.id,
              text: newComment,
            });
  
            // const newReply = {
            //   _id: data.commentId,
            //   fullname: 'John Doe',
            //   text: newComment,
            //   replies: [],
            //   level: commentToReplyTo.level + 1,
            // };
  
            commentToReplyTo.replies.push(data.reply);
            setNewComment("");
            
            

          }catch(error){
            console.log(error)
          }
          
        }
      }
      else{
        try {

          const { data } = await axios.post(`${IP}/comment/create`, {
            postId: postId,
            text: newComment,
          });
          // Handle the response data as needed
          setCommentsData((prevComments) => [...(prevComments || []), data.comment]);
          setNewComment("");
    
          // Close the modal and clear the reply text
        } catch (error) {
          // Handle the error
          console.error("Error submitting reply:", error);
        }
      

      }

      // Update state with the new comment
      
      setNewComment("");

      // Close the modal and clear the reply text
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
 
  const [commentsData, setCommentsData] = useState<any[]>()



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
      <View style={styles.topContainer}>
        <Text style={{ color: "grey", fontSize: 17 }}>Comments</Text>
        {/* <TouchableOpacity onPress={( ) => { }}>
          <Text style={{ color: "white", fontSize: 16 }}>Close</Text>
        </TouchableOpacity> */}
      </View>
    
      <FlatList
      data={commentsData}
      keyExtractor={(item, _) => item._id.toString()}
       renderItem={({ item }) => 
    
      <Comment comment={item} showReplies={false} onPress={handlePress} onDataChange={handleDataChange} />
  }
    
    />
  {additionalData.name !== 'nan' && (
     <View style={{...styles.userInfoContainer, marginBottom:0}}>
     <Text style={{color: "white"}}>Replying to </Text><Text style={{color: "white",fontWeight: "bold" }}>{additionalData.name}</Text>
    <TouchableOpacity onPress={() => setAdditionalData({ id: "-1", name: "nan" })}>
      <Text style={{ color: "grey", opacity: 50, paddingLeft: 30 }}>Cancel</Text>
    </TouchableOpacity>
     </View>)
    }
 
      <View style={styles.newCommentContainer}>
      
        <TextInput
          style={styles.newCommentInput}
          placeholder="Enter a new comment"
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor={"#8e8e8e"}
          ref= {inputRef}
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
    paddingTop: 0,
    backgroundColor: "black",
  },
  
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    padding:0
    // borderColor: "white",
    // borderWidth: 1,
  },
  
  
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "white",
    // paddingLeft: 10,
   borderWidth: 1,
  //  borderColor: "white",
    paddingLeft: 0,
    marginBottom: 8,
  },
 

  seeMore: {
    color: "gray",
    fontSize: 16,
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

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";

const Comment = ({
  comment,
  showReplies,
  onReplySubmit,
  onPress,
  onDataChange,
}: any) => {
  const [showRepliesInside, setShowReplies] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showRepliesInside);
  };

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
    // setData(newData);
    // Pass the modified data to the parent component
    onDataChange(newData);
    onPress();
  };

  const handleUpVote = () => {
    if (downVoted) {
      setDownvotes(downvotes - 1);
      setDownVoted(false);
      submitVote("del_down");
    }
    if (upVoted) {
      setUpvotes(upvotes - 1);
      setUpVoted(false);
      submitVote("del_up");
    } else {
      setUpvotes(upvotes + 1);
      setUpVoted(true);
      submitVote("up");
    }
    
  }

  const handleDownVote = () => {
    if (upVoted) {
      setUpvotes(upvotes - 1);
      setUpVoted(false);
      submitVote("del_up");
    }
    if (downVoted) {
      setDownvotes(downvotes - 1);
      setDownVoted(false);
      submitVote("del_down");
    }
    else {
      setDownvotes(downvotes + 1);
      setDownVoted(true);
      submitVote("down");
    }
  
  }

  const submitVote = async (vote: string) => {
    try {
      const res = await axios.post(`${IP}/comment/vote`, {
        commentId: comment._id,
        vote: vote,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ paddingBottom: 10 }}>
      <View style={styles.userInfoContainer}>
        <View
          style={
            comment.level !== 0
              ? styles.lineContainer
              : { ...styles.lineContainer, borderColor: "transparent" }
          }
        ></View>
        <Image
          source={{
            uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
          }}
          style={styles.profile_picture}
        />
        <Text style={styles.fullname}>
          {comment.postedBy ? comment.postedBy.fullname : ""}
        </Text>
      </View>

  
        <View style={styles.commentContainer}>
          <View style={{...styles.InnerCommentContainer, borderLeftColor: showRepliesInside ? "#3C4848" : 'transparent' }}></View>
          <View style={styles.commentContent}>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.commentText}>{comment.text}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.voteContainer}>
            <View style={{flexDirection:"row"}} >
            <TouchableOpacity onPress={handleUpVote} style={{padding:1}}>
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={20}
               
                color={ upVoted ? "#35C2C1":"white"}
                
              />
            </TouchableOpacity >

            <Text style={{fontStyle:"italic",color:"white"}}>{upvotes}</Text>
            </View>
            <View style={{marginLeft:40,flexDirection:"row"}}>
            <TouchableOpacity onPress={handleDownVote} style={{padding:1}}>
              <MaterialCommunityIcons
                name="arrow-down-bold"
                size={20}
                color={ downVoted ? "#35C2C1":"white"}
              />
            </TouchableOpacity>
            <Text style={{fontStyle:"italic",color:"white"}}>{downvotes}</Text>
            </View>
            {comment.replies && comment.replies.length > 0 && (
              <View style={{position:"absolute",right:40}}>
        <TouchableOpacity onPress={toggleReplies}>
          <Text style={styles.seeMore}>
            {showRepliesInside ? "Hide Replies" : "See Replies"}
          </Text>
        </TouchableOpacity>
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
        comment.replies &&
        comment.replies.map((item: any, index: any) => (
          <View
            key={item._id.toString()}
            style={
  
                styles.commentContainer
            }
          >
            {index !== comment.replies.length - 1 && (
              <View style={styles.InnerCommentContainer}></View>
            )}
            <Comment
              comment={item}
              showReplies={showRepliesInside}
              onReplySubmit={onReplySubmit}
              onPress={onPress}
              onDataChange={onDataChange}
            />
          </View>
        ))}

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: "black",
  },
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
    marginBottom: 3,
    // borderLeftWidth: 3,
  

    paddingTop: 0,
    marginLeft: 25,
    paddingLeft: 0,
   
    // backgroundColor: "#195e5e",
    // borderWidth: 1,

    // borderRadius: 5,

    padding: 2,
  },
  lineContainer: {
    position: "absolute",
    left: 0,
    right: 644,
    bottom: 15,
    height: 50,
    width: 30,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
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

    paddingLeft: 0,
    marginBottom: 8,
  },
  profile_picture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
    marginLeft: 10,
  },
  fullname: {
    fontSize: 14,

    // fontWeight: "bold",
    color: "white",
  },
  voteContainer: {
    flexDirection: "row",
    // borderColor:"white",
    // borderWidth:2,
    
    paddingLeft:20,
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
    fontSize: 12,
    color: "white",
  },

  seeMore: {
    color: "gray",
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 35,

    top: 0,
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

export default Comment;

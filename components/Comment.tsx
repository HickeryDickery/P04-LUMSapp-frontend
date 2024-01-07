import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";




const Comment = ({ comment, showReplies, onReplySubmit , onPress, onDataChange}: any) => {
  const [showRepliesInside, setShowReplies] = useState(false);
  const toggleReplies = () => {
    setShowReplies(!showRepliesInside);
  };



  const [data, setData] = useState({
    id: "-1",
    name: 'NaN',
   
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
    onDataChange(newData);
    onPress();
  };

  
  return (
    <View style={{paddingBottom:10}}>
           
      <View style={styles.userInfoContainer }>
      <View style={comment.level !== 0? styles.lineContainer: {...styles.lineContainer, borderColor: "transparent"}}>
        </View>
        <Image
          source={{ uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" }}
          style={styles.profile_picture}
        />
        <Text style={styles.fullname}>{comment.postedBy ? comment.postedBy.fullname : ""}</Text>
      </View>
      {!showRepliesInside && (
         <View style={{ ...styles.commentContainer, borderColor:"transparent"}}>
          <TouchableOpacity onPress={handlePress}>
        <View style={styles.commentContent}>
          <Text style={styles.commentText}>{comment.text}</Text>
  

        </View>
        </TouchableOpacity>
        </View>

      )}
       {showRepliesInside && (
       <View style={styles.commentContainer}>
       <TouchableOpacity onPress={handlePress}>
        <View style={styles.commentContent}>
          <Text style={styles.commentText}>{comment.text}</Text>
  

        </View>
        </TouchableOpacity>
       </View>
      )}
      
       
        {comment.replies && comment.replies.length > 0 && showRepliesInside && (
          <FlatList
            data={comment.replies}
            keyExtractor={(commentId, _) => commentId._id.toString()}
            renderItem={({ item, index }) => (
              <>
                {index !== comment.replies.length - 1 && (
                  <View style={styles.commentContainer}>
                    <Comment comment={item} showReplies={showRepliesInside} onReplySubmit={onReplySubmit} onPress = {onPress} onDataChange = {onDataChange}/>
                  </View>
                )}
                {index === comment.replies.length - 1 && (
                  <View style={{ ...styles.commentContainer, borderColor: "transparent"}}>

                  <Comment comment={item} showReplies={showRepliesInside} onReplySubmit={onReplySubmit} onPress = {onPress} onDataChange = {onDataChange} />
                  </View>
                )}
              </>
            )}
          />
        )}
        
         {comment.replies && comment.replies.length > 0 && (
          <TouchableOpacity onPress={toggleReplies}>
            <Text style={styles.seeMore}>{showRepliesInside ? "Hide Replies" : "See Replies"}</Text>
          </TouchableOpacity>
        )}
      
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
    marginBottom: 16,
    borderLeftWidth: 1,

  
    paddingTop: 0,
    marginLeft: 0,
    paddingLeft: 0,
    borderColor: "white",
    // backgroundColor: "#195e5e",
    // borderWidth: 1,
   
    // borderRadius: 5,

    padding: 0,
  },
  commentContainer: {
    marginBottom: 1,
    borderLeftWidth: 1,

  
    paddingTop: 0,
    marginLeft: 25,
    paddingLeft: 0,
    borderColor: "grey",
    // backgroundColor: "#195e5e",
    // borderWidth: 1,
   
    // borderRadius: 5,
    

    padding: 2,
  },
  lineContainer:{
    position: "absolute",
    left: -2.4,
    right: 644,
    bottom: 15,
    height: 50,
    width: 30,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    // borderBottomColor: "white",
    // borderWidth: 1,
    // borderBlockColor: "white",
    paddingTop: 0,
    borderBottomLeftRadius: 5,
    paddingLeft: 0,
    // marginLeft: 10,
    borderColor: "grey",

  },
 
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "white",
    // paddingLeft: 10,
   borderWidth: 1,

    paddingLeft: 0,
    marginBottom: 8,
  },
  profile_picture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  fullname: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "white",
  },
  commentContent: {
    marginBottom: 1,
    backgroundColor: "#1c695f",
    borderRadius: 4,
    padding:8,
    marginLeft: 10,
    // borderColor: "grey",
  },
  commentText: {
    fontSize: 12,
    color: "white",
  },

  seeMore: {
    color: "gray",
    fontSize:13,
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




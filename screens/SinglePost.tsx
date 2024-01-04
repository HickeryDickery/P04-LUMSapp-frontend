import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Post from '../components/components_LDF/Post';
import Comments from './Comments';


type PostProps = {
    name: string;
    profileImage: string;
    body: string;
    image: string; // revisit the type of image
    likes: number;
    dislikes: number;
    comments: number;
    liked: boolean;
    disliked: boolean;
    postID: string;
    nav: any;
  };

const SinglePost = ({route,navigation}:any) => {

    const { postProps } = route.params;
    console.log(postProps)

  return(
    <View style={styles.container}>
        <Post
        {...postProps}
        >
        </Post>
        <Comments
        route={{ ...route, params: { ...route.params, postId: postProps.postID } }}
        navigation = {navigation}
    
        >
        </Comments>
    </View>
    

  )
   

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "black",
      },
    }

);

export default  SinglePost;
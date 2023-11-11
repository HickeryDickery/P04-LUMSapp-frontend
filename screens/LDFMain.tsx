import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const Card = ({name, image, text, likes, dislikes, comment}: any ) => {
  (
      <View>

      </View>
  )
}


const Posts = () => {
  return (
      <View>
         { posts.map((post) => (
              <Card name={post.name} likes={post.likes} dislikes={post.dislikes} text={post.text} comment={post.comments} image={post.image} />
          ))}
      </View>
  )
}

const LDFMain = () => {
    return (
      <View style={styles.container}>
        <Text>LDFMain</Text>
        <Text> Testing Part 2</Text>
        <StatusBar style="auto" />
      </View>
    );
  };
  
  export default LDFMain;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
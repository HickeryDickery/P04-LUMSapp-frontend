import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import Comment from "./Comment";

const CommentsUnderPost = () => {
  return (
    <View style={styles.container}>
      <Comment />
    </View>
  );
};

export default CommentsUnderPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

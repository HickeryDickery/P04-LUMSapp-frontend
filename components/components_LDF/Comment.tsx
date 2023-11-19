import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const Comment = () => {
  return (
    <View style={styles.container}>
      <Text>
        Hi Owais Ahsan! Lorem Ipsum DoremHi Owais Ahsan! Lorem Ipsum Dorem Hi
        Owais Ahsan! Lorem Ipsum Dorem Hi Owais Ahsan! Lorem Ipsum Dorem Hi
        Owais Ahsan! Lorem Ipsum Dorem Hi Owais Ahsan! Lorem Ipsum Dorem Hi
        Owais Ahsan! Lorem Ipsum Dorem Hi Owais Ahsan! Lorem Ipsum Dorem Hi
        Owais Ahsan! Lorem Ipsum Dorem Hi Owais Ahsan! Lorem Ipsum Dorem Hi
        Owais Ahsan! Lorem Ipsum Dorem Hi Owais Ahsan! Lorem Ipsum Dorem
      </Text>
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "grey",
    minWidth: "0%",
    maxWidth: "85%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
});

import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/action";

const CarouselCard = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    dispatch(logout());
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: "25%",
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 10,
        marginTop: 10,
      }}
      onPress={logoutHandler}
    >
      <ImageBackground
        source={require("../assets/splash.png")}
        style={{
          // width: "100%",
          // height: "25%",
          // borderWidth: 1,
          // borderColor: "red",
          // borderRadius: 10,
          // marginTop: 10,
          flex: 1,
        }}
      >
        <View>
          <Text style={{ color: "white", alignSelf: "flex-end" }}>
            Carousel Card
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// const data = [
//   {
//     title: "Title 1",
//     subtitle: "Subtitle 1",
//     image: require("../assets/splash.png"),
//   },
//   {
//     title: "Title 2",
//     subtitle: "Subtitle 2",
//     image: require("../assets/splash.png"),
//   },
//   {
//     title: "Title 3",
//     subtitle: "Subtitle 3",
//     image: require("../assets/splash.png"),
//   },
//   {
//     title: "Title 4",
//     subtitle: "Subtitle 4",
//     image: require("../assets/splash.png"),
//   },
//   {
//     title: "Title 5",
//     subtitle: "Subtitle 5",
//     image: require("../assets/splash.png"),
//   },
// ];

export default CarouselCard;

// const styles = StyleSheet.create({
//   item: {
//     // width: itemWidth,
//     height: 200,
//     borderWidth: 1,
//     borderColor: "red",
//     borderRadius: 10,
//     marginTop: 20,
//   },
// });

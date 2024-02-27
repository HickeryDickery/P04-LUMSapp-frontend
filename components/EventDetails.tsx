import { View, Text, Image, StyleSheet } from "react-native";
import { Event } from "../types/eventtypes";
import getMonth from "../utils/eventHelpers";

const EventDetails = ({
  title,
  postedBy,
  date,
  startTime,
  endTime,
  location,
  description,
  imageUrl,
  category,
}: Event) => {
  return (
    <View style={styles.container}>
      <View style={{ borderRightWidth: 1, borderColor: "#2B2B2B" }}>
        <Image
          source={{
            uri: imageUrl ? imageUrl : "https://picsum.photos/201",
          }}
          style={{
            width: 110,
            height: 114,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginHorizontal: 10,
          flex: 1,
          marginVertical: 5,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "white",
              fontSize: 9,
            }}
          >
            {postedBy}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: "#35C2B0",
              fontWeight: "bold",
            }}
          >
            {location}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#35C2B0",
              fontSize: 12,
            }}
          >
            {date.split("/")[0]} {getMonth(date.split("/")[1])}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#35C2B0",
              fontSize: 12,
            }}
          >
            {startTime} - {endTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 3,
    height: 120,
    borderColor: "#2B2B2B",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#0E0E0E",
    overflow: "hidden",
  },
});

export default EventDetails;

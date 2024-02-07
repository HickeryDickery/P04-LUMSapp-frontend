import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import EventDetails from "../components/EventDetails";
import { Event } from "../types/eventtypes";
import { all } from "axios";

const tags = [
  "All",
  "Religion",
  "Culture",
  "Music",
  "Workshop",
  "Art",
  "Food",
  "Sports",
  "Education",
  "Health",
];

const allEvents: Event[] = [
  {
    title: "Art and Craft",
    postedBy: "John Doe",
    date: "12/12/2021",
    startTime: "12:00 PM",
    endTime: "3:00 PM",
    coordinates: [12.9716, 77.5946],
    location: "REDC",
    description: "Art and Craft workshop for kids",
    imageUrl: "",
    category: "Art",
  },
  {
    title: "Music Concert",
    postedBy: "Jane Doe",
    date: "12/12/2021",
    startTime: "5:00 PM",
    endTime: "8:00 PM",
    coordinates: [12.9716, 77.5946],
    location: "REDC",
    description: "Music concert by local artists",
    imageUrl: "",
    category: "Music",
  },
  {
    title: "Food Festival",
    postedBy: "John Doe",
    date: "12/12/2021",
    startTime: "12:00 PM",
    endTime: "3:00 PM",
    coordinates: [12.9716, 77.5946],
    location: "REDC",
    description: "Food festival with local cuisines",
    imageUrl: "",
    category: "Food",
  },
  {
    title: "sndjkc skvj df vdhf df  dfjv dj hfb djf dhfb djhf djhfb",
    postedBy: "John Doe",
    date: "12/12/2021",
    startTime: "12:00 PM",
    endTime: "3:00 PM",
    coordinates: [12.9716, 77.5946],
    location: "REDC",
    description: "Food festival with local cuisines",
    imageUrl: "",
    category: "Food",
  },
];

const Events = ({ navigation }: any) => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [events, setEvents] = useState<Event[]>(allEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);

  const filterEvents = (tag: string) => {
    setSelectedTag(tag);
    if (tag == "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category == tag));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <MaterialIcons
          name="search"
          size={20}
          color="#414141"
          style={{ alignSelf: "center" }}
        />
        <TextInput
          placeholder="Search Courses"
          placeholderTextColor={"#414141"}
          style={{ fontSize: 13, color: "white", flex: 1 }}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                filterEvents(tag);
              }}
            >
              <Text
                style={[
                  styles.tags,
                  {
                    color: selectedTag == tag ? "black" : "#35C2C1",
                    backgroundColor:
                      selectedTag == tag ? "#35C2C1" : "transparent",
                  },
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        style={{ width: "100%", marginTop: 10 }}
        onRefresh={() => {}}
        refreshing={false}
        data={filteredEvents}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SpecificEvent", { event: item });
              }}
            >
              <EventDetails
                title={item.title}
                postedBy={item.postedBy}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                coordinates={item.coordinates}
                location={item.location}
                description={item.description}
                imageUrl={item.imageUrl}
                category={item.category}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
  search: {
    width: "100%",
    backgroundColor: "#292626",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  tags: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#35C2C1",
    borderRadius: 20,
    padding: 7,
  },
});

export default Events;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import EventDetails from "../components/EventDetails";
import { Event } from "../types/eventtypes";

const tags = [
  { label: "All", value: "All" },
  { label: "Religion", value: "Religion" },
  { label: "Culture", value: "Culture" },
  { label: "Music", value: "Music" },
  { label: "Workshop", value: "Workshop" },
  { label: "Art", value: "Art" },
  { label: "Food", value: "Food" },
  { label: "Sports", value: "Sports" },
  { label: "Education", value: "Education" },
  { label: "Health", value: "Health" },
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
  {
    title: "Qawali Night",
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
    title: "Food Street",
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
    title: "Subway Court",
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
];

const Events = ({ navigation }: any) => {
  const [selectedTag, setSelectedTag] = useState([]);
  const [events, setEvents] = useState<Event[]>(allEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  
  // const filterEvents = (tag: string) => {
  //   setSelectedTag(tag);
  //   if (tag == "All") {
  //     setFilteredEvents(events);
  //   } else {
  //     setFilteredEvents(events.filter((event) => event.category == tag));
  //   }
  // };

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
          placeholder="Search Events"
          placeholderTextColor={"#414141"}
          style={{ fontSize: 13, color: "white", flex: 1 }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          width: "100%",
        }}
      >
        <DropDownPicker
          style={{
            backgroundColor: "#000",
            borderColor: "#ffffff",
            borderWidth: 1,
          }}
          containerStyle={{ flex: 1 }}
          zIndex={3000}
          zIndexInverse={1000}
          items={tags}
          open={open}
          onOpen={() => setOpen2(false)}
          multiple={true}
          value={selectedTag}
          setOpen={setOpen}
          setValue={setSelectedTag}
          searchable={true}
          theme="DARK"
          mode="BADGE"
          badgeTextStyle={{ color: "white" }}
          badgeColors={["#000"]}
          dropDownContainerStyle={{
            backgroundColor: "#000",
            borderWidth: 1,
            borderColor: "#ffffff",
            height: 500,
          }}
          closeOnBackPressed={true}
        />

        <DropDownPicker
          style={{
            backgroundColor: "#000",
            borderColor: "#ffffff",
            borderWidth: 1,
          }}
          containerStyle={{
            flex: 1,
          }}
          zIndex={1000}
          zIndexInverse={3000}
          items={tags}
          open={open2}
          onOpen={() => setOpen(false)}
          multiple={true}
          value={selectedTag}
          setOpen={setOpen2}
          setValue={setSelectedTag}
          searchable={true}
          theme="DARK"
          mode="BADGE"
          badgeTextStyle={{ color: "white" }}
          badgeColors={["#000"]}
          dropDownContainerStyle={{
            backgroundColor: "#000",
            borderWidth: 1,
            borderColor: "#ffffff",
            height: 500,
          }}
          closeOnBackPressed={true}
        />

        {/* <ScrollView
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
        </ScrollView> */}
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
    backgroundColor: "#000",
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

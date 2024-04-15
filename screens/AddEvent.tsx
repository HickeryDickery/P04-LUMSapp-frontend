import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { IP } from "../constants/ip";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

type Location = {
  label: string;
  value: string;
};

const AddEvent = ({ navigation }: any) => {
  const [venue, setVenue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [showPicker1, setShowPicker1] = useState<boolean>(false);
  const [showPicker2, setShowPicker2] = useState<boolean>(false);
  const [showPicker3, setShowPicker3] = useState<boolean>(false);
  const [showPicker4, setShowPicker4] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get(`${IP}/location/get`);
        // setLocations(data.locations);
        setLocations(
          data.locations.map((location: any) => ({
            label: location.name,
            value: location.name,
          }))
        );
        console.log(data.locations);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Title
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Event Title"
          placeholderTextColor={"#414141"}
          style={{
            alignSelf: "center",
            width: "100%",
            color: "white",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#111111",
            fontSize: 14,
          }}
        />
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Venue
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <DropDownPicker
          items={locations}
          open={open}
          setOpen={setOpen}
          value={venue}
          setValue={setVenue}
          placeholder="Select Venue"
          placeholderStyle={{ color: "#414141", fontSize: 14 }}
          style={{
            backgroundColor: "#111111",
            borderRadius: 10,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#111111",
            borderRadius: 10,
          }}
          labelStyle={{ color: "white" }}
          textStyle={{ color: "white" }}
          showArrowIcon={true}
          onChangeValue={(value) => {
            console.log(value);
          }}
        />
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Starts At
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          {showPicker1 && (
            <DateTimePicker
              value={new Date()}
              display="default"
              onChange={(event, selectedDate) => {
                // console.log(selectedDate);
                setShowPicker1(false);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowPicker1(true)}
            style={{
              backgroundColor: "#111111",
              borderRadius: 10,
              padding: 10,
              //   width: "100%",
              flex: 1,
            }}
          >
            <Text style={{ color: "#35C2C1", fontSize: 14 }}>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowPicker1(true)}
            style={{
              backgroundColor: "#35C2C1",
              borderRadius: 10,
              padding: 10,
              //   width: "100%",
              flex: 1,
            }}
          >
            <Text style={{ color: "#111111", fontSize: 14 }}>Select Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Ends At
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          {showPicker1 && (
            <DateTimePicker
              value={new Date()}
              display="default"
              onChange={(event, selectedDate) => {
                // console.log(selectedDate);
                setShowPicker1(false);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowPicker1(true)}
            style={{
              backgroundColor: "#111111",
              borderRadius: 10,
              padding: 10,
              //   width: "100%",
              flex: 1,
            }}
          >
            <Text style={{ color: "#35C2C1", fontSize: 14 }}>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowPicker1(true)}
            style={{
              backgroundColor: "#35C2C1",
              borderRadius: 10,
              padding: 10,
              flex: 1,
            }}
          >
            <Text style={{ color: "#111111", fontSize: 14 }}>Select Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Description
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <TextInput
          style={{
            backgroundColor: "#111111",
            borderRadius: 10,
            padding: 10,
            color: "white",
            fontSize: 14,
            height: 150,
            textAlignVertical: "top",
            flexGrow: 1,
          }}
          textAlign="left"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Event Description"
          placeholderTextColor={"#414141"}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#35C2C1",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          console.log("Done");
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    color: "#ffffff",
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 10,
  },
});

export default AddEvent;

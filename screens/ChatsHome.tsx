import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Loader from "../components/Loader";
import { Chat, ChannelList, Channel } from "stream-chat-expo";
import { StreamChat, ChannelSort } from "stream-chat";
import { chatApiKey, chatUserId } from "../chatConfig";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import ChatsHomeHeader from "../components/ChatsHomeHeader";

const filters = {
  members: {
    $in: [chatUserId],
  },
};

//This might introduce problems later
const sort: ChannelSort = {
  last_message_at: -1,
};
export default function ChatsHome() {
  const navigation = useNavigation<NavigationProp<any>>();

  const { setChannel } = useAppContext();

  return (
    <View style={styles.container}>
      <ChatsHomeHeader />
      <ChannelList
        onSelect={(channel) => {
          setChannel(channel);
          navigation.navigate("ChatScreen");
        }}
        filters={filters}
        sort={sort}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

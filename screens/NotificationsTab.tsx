import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    FlatList,
    ImageBackground,
} from "react-native";
import React, { useState } from "react";
import PostNotifications from "../components/PostNotifications";
import EventNotifications from "../components/EventNotifications";

let post_notifs = [
    {
        id: 0,
        type: 0,
        entity: 0,
        actor: "Muneeb Akmal",
        timestamp: "2024-3-24T13:40:55",
    },
    {
        id: 1,
        type: 1,
        entity: 0,
        actor: "Nauman Ijaz",
        timestamp: "2024-3-24T13:35:55",
    },
    {
        id: 2,
        type: 1,
        entity: 0,
        actor: "Khizar Nawab",
        timestamp: "2024-3-24T12:40:55",
    },
    {
        id: 3,
        type: 1,
        entity: 0,
        actor: "Abdullah Sarfaraz",
        timestamp: "2024-3-24T12:40:55",
    },
    {
        id: 4,
        type: 2,
        entity: 1,
        actor: "Muneeb Akmal",
        timestamp: "2024-3-24T11:40:55",
    },
    {
        id: 5,
        type: 2,
        entity: 1,
        actor: "Muneeb Akmal",
        timestamp: "2024-3-24T11:40:55",
    },
    {
        id: 6,
        type: 0,
        entity: 0,
        actor: "Nauman Ijaz",
        timestamp: "2024-3-24T11:30:55",
    },
    {
        id: 7,
        type: 2,
        entity: 1,
        actor: "Muneeb Akmal",
        timestamp: "2024-3-24T11:20:55",
    },
    {
        id: 8,
        type: 2,
        entity: 1,
        actor: "Nauman Ijaz",
        timestamp: "2024-3-24T10:40:55",
    },
    {
        id: 9,
        type: 2,
        entity: 0,
        actor: "Muneeb Akmal",
        timestamp: "2024-3-24T10:20:55",
    },
];

let event_notifs = [
    {
        event_name: "Seminar on Atheism",
        society: "LRS",
        venue: "A17",
        start_time: "2024-3-24T18:00:00",
        end_time: "2024-3-24T22:00:00",
    },
    {
        event_name: "NFAK Comeback Tour",
        society: "PhotoLUMS",
        venue: "A17",
        start_time: "2024-3-24T20:00:00",
        end_time: "2024-3-24T22:00:00",
    },
    {
        event_name: "LCSS",
        society: "LRS",
        venue: "REDC Lawn",
        start_time: "2024-3-24T22:00:00",
        end_time: "2024-3-25T00:00:00",
    },
];

const Notifications = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                }}
            >
                Notifications
            </Text>
            <View
                style={{
                    width: "100%",
                    height: "45%",
                }}
            >
                <PostNotifications post_notifs={post_notifs} />
            </View>
            <View
                style={{
                    width: "100%",
                    height: "40%",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            marginRight: 8,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Events today
                    </Text>
                    <View
                        style={{
                            borderBottomColor: "#B8C2C0",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            flex: 1,
                        }}
                    />
                </View>
                <EventNotifications event_notifs={event_notifs} />
            </View>
        </SafeAreaView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        color: "#fff",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    scrollPost: {},
    postMenu: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    editProfileBttn: {
        fontFamily: "Roboto",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#35C2C1",
        borderRadius: 5,
        width: "90%",
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
    },
});

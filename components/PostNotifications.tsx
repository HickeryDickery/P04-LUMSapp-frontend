import { FlatList, View, Image, Text } from "react-native";
import { getTimeAgo } from "../utils/timeUtil";
import { Actor } from "../types/notificationTypes";
import { groupNotifications } from "../utils/groupNotifications";
import { useState, useEffect } from "react";
const PostNotifications = (props: any) => {
    // const getInteraction = (actor: Actor, entity: string, type: string) => {
    //     let interaction = actor.fullname;

    //     if (type == "like") {
    //         interaction += " liked your";

    //         if (entity == "Post") {
    //             interaction += " post";
    //         } else {
    //             interaction += " reply";
    //         }
    //     } else if (type == "comment") {
    //         interaction += " replied to your post";
    //     } else if (type == "reply") {
    //         interaction += " replied to your comment";
    //     }

    //     return interaction;
    // };

    // const [notifications, setNotifications] = useState<any>([]);

    // useEffect(() => {
    //     setNotifications(groupNotifications(props.post_notifs));
    // }, [props.post_notifs]);
    console.log(props);

    return (
        <FlatList
            style={{
                width: "100%",
            }}
            data={groupNotifications(props.notifs).sort(
                (a, b) =>
                    new Date(b.group[0].timestamp).getTime() -
                    new Date(a.group[0].timestamp).getTime()
            )}
            // keyExtractor={(item) => item.id.toString()}
            onRefresh={() => {
                props.setRefresh(true);
            }}
            refreshing={props.refresh}
            renderItem={({ item }) => (
                <View
                    key={item.group[0]._id}
                    style={{
                        // backgroundColor: "#3e3e3e",
                        paddingVertical: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 0,
                    }}
                >
                    <Image
                        style={{
                            width: "10%",
                            height: "auto",
                            borderRadius: 100,
                            aspectRatio: 1 / 1,
                        }}
                        source={{
                            uri:
                                item.group[0].actor.profile_picture.url ||
                                "https://picsum.photos/201",
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // backgroundColor: "#3e3e3e",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                paddingHorizontal: 10,
                                width: "85%",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {item.group[0].actor.fullname}
                            </Text>
                            {item.message}
                        </Text>
                        <Text
                            style={{
                                color: "#696969",
                                paddingHorizontal: 10,
                            }}
                        >
                            {getTimeAgo(item.group[0].timestamp)}
                        </Text>
                    </View>
                </View>
            )}
        ></FlatList>
    );
};

export default PostNotifications;

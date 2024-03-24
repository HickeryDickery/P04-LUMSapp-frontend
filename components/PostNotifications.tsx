import { FlatList, View, Image, Text } from "react-native";
import { getTimeAgo } from "../utils/timeUtil";

interface PostNotification {
    id: number;
    type: number;
    entity: number;
    actor: string;
    timestamp: string;
}

interface PostNotificationType {
    type: number;
    interaction: (user: string) => string;
}

const PostNotifications = (props: any) => {
    let post_notif_types = [
        {
            type: 0,
            interaction: (user: string) => {
                return `${user} liked your post.`;
            },
        },
        {
            type: 1,
            interaction: (user: string) => {
                return `${user} replied to your post.`;
            },
        },
        {
            type: 2,
            interaction: (user: string) => {
                return `${user} liked your reply.`;
            },
        },
    ];

    function generateNotificationMessages(
        notifs: PostNotification[],
        types: PostNotificationType[]
    ): [string, string][] {
        const messages: [string, string][] = [];

        // Group notifications by type
        const groupedByType: { [key: number]: PostNotification[] } = {};
        notifs.forEach((notif) => {
            if (!(notif.type in groupedByType)) {
                groupedByType[notif.type] = [];
            }
            groupedByType[notif.type].push(notif);
        });

        // Generate messages for each type
        for (const type in groupedByType) {
            const notifications = groupedByType[type];
            let message = "";

            // Get interaction function based on notification type
            const interactionFunc = types.find(
                (t) => t.type == parseInt(type)
            )?.interaction;
            let recentTimestamp: string = "";
            if (interactionFunc) {
                // Count occurrences of each actor
                const actorCounts: { [key: string]: number } = {};
                notifications.forEach((notif) => {
                    actorCounts[notif.actor] =
                        (actorCounts[notif.actor] || 0) + 1;
                    if (!recentTimestamp || notif.timestamp > recentTimestamp) {
                        recentTimestamp = notif.timestamp;
                    }
                });

                // Format message based on actor counts
                const actors = Object.keys(actorCounts);
                if (actors.length == 1) {
                    message = interactionFunc(actors[0]);
                } else {
                    const mainActor = actors.shift()!;
                    const othersCount = actors.length;
                    message = interactionFunc(
                        `${mainActor} and ${othersCount} others`
                    );
                }
            }

            messages.push([message, recentTimestamp]);
        }

        return messages;
    }

    return (
        <FlatList
            style={{
                width: "100%",
            }}
            data={generateNotificationMessages(
                props.post_notifs,
                post_notif_types
            )}
            // keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View
                    key={item[1]}
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
                        source={{ uri: "https://picsum.photos/201" }}
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
                            {item[0]}
                        </Text>
                        <Text
                            style={{
                                color: "#696969",
                                paddingHorizontal: 10,
                            }}
                        >
                            {getTimeAgo(item[1])}
                        </Text>
                    </View>
                </View>
            )}
        ></FlatList>
    );
};

export default PostNotifications;

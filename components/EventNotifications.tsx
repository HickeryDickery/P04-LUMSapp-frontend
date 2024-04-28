import { FlatList, View, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { convertTo12HourFormat } from "../utils/timeUtil";

const EventNotifications = (props: any) => {
    console.log(props.event_notifs[0].image);
    return (
        <FlatList
            style={{
                width: "100%",
            }}
            data={props.event_notifs}
            renderItem={({ item }) => (
                <ImageBackground
                    source={{
                        uri: item.image.url
                            ? item.image.url
                            : "https://picsum.photos/203",
                    }}
                    resizeMode="cover"
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 4,
                    }}
                    imageStyle={{
                        borderRadius: 12,
                    }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(25,40,47,0.3)",
                            "rgba(25,40,47,0.6)",
                            "rgba(25,40,47,0.9)",
                            "rgba(25,40,47,1)",
                            "rgba(25,40,47,1)",
                            "rgba(25,40,47,1)",
                        ]}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            paddingVertical: 8,
                            paddingHorizontal: 4,
                            borderRadius: 12,
                        }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    paddingHorizontal: 10,
                                    width: "50%",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                                    textShadowOffset: {
                                        width: -1,
                                        height: 1,
                                    },
                                    textShadowRadius: 10,
                                }}
                            >
                                {item.title}
                            </Text>
                            <View
                                style={{
                                    alignItems: "flex-end",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 10,
                                        fontWeight: "bold",
                                        fontSize: 14,
                                    }}
                                >
                                    {item.description}
                                </Text>
                                <Text
                                    style={{
                                        color: "#C4C4C4",
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    {item.locationName}
                                </Text>
                                <Text
                                    style={{
                                        color: "#35C2C1",
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    {convertTo12HourFormat(item.startTime)} -{" "}
                                    {convertTo12HourFormat(item.endTime)}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            )}
        ></FlatList>
    );
};

export default EventNotifications;

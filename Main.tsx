import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import Signup from "./screens/Signup";
import Login from "./screens/Login";
import BottomTabs from "./components/BottomTabs";
import SignupPIN from "./screens/SignupPIN";
import SignupProfilePicture from "./screens/SignupProfilePicture";
// import Comments from "./screens/Comments";
import CampusInfo from "./screens/CampusInfo";
import InstructorInfo from "./screens/InstructorInfo";
import InstructorDetails from "./screens/InstructorDetails";
import AddInstructorReview from "./screens/AddInstructorReview";

import { loadUser, registerPushToken } from "./redux/action";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loader from "./components/Loader";
import SinglePost from "./screens/SinglePost";
import Transcript from "./screens/Transcript";
import GpaPredictorHome from "./screens/GpaPredictorHome";
import GpaPredictor from "./screens/GpaPredictor";
import EditPost from "./screens/EditPost";
import EditProfile from "./screens/EditProfile";
import PostImageScroll from "./screens/PostImageScroll";
import SpecificEvent from "./screens/SpecificEvent";
import AddPost from "./screens/AddPost";
// import EditProfile from "./screens/EditProfile";
// import PostImageScroll from "./screens/PostImageScroll";
// import VideoPlayer from "./screens/VideoPlayer";
import AddEvent from "./screens/AddEvent";
import Settings from "./screens/Settings";
import { usePushNotifications } from "./hooks/usePushNotifications";
import SavedPosts from "./screens/SavedPosts";

const Stack = createNativeStackNavigator();

const Main = () => {
    const dispatch = useAppDispatch();
    const { expoPushToken, notification } = usePushNotifications();
    let token: string | undefined = expoPushToken?.data;
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            dispatch(registerPushToken(token));
        }
    }, [token]);

    // useEffect(() => {
    //     const subscription =
    //         Notifications.addPushTokenListener(registerPushToken);
    //     return () => subscription.remove();
    // }, []);

    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

    return loading ? (
        <Loader />
    ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                    backgroundColor: "black",
                    // paddingHorizontal: 20,
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={
                            isAuthenticated ? "BottomTabs" : "Login"
                        }
                        screenOptions={{ headerShown: false }}
                    >
                        {isAuthenticated ? (
                            <Stack.Group>
                                <Stack.Screen
                                    name="Settings"
                                    component={Settings}
                                />
                                <Stack.Screen
                                    name="BottomTabs"
                                    component={BottomTabs}
                                />
                                {/* <Stack.Screen
                                    name="Comments"
                                    component={Comments}
                                /> */}
                                <Stack.Screen
                                    name="SinglePost"
                                    component={SinglePost}
                                />
                                <Stack.Screen
                                    name="AddPost"
                                    component={AddPost}
                                />
                                <Stack.Screen
                                    name="PostImageScroll"
                                    component={PostImageScroll}
                                />
                                <Stack.Screen
                                    name="Transcript"
                                    component={Transcript}
                                />
                                <Stack.Screen
                                    name="GpaPredictorHome"
                                    component={GpaPredictorHome}
                                />
                                <Stack.Screen
                                    name="GpaPredictor"
                                    component={GpaPredictor}
                                />
                                <Stack.Screen
                                    name="EditPost"
                                    component={EditPost}
                                />
                                <Stack.Screen
                                    name="EditProfile"
                                    component={EditProfile}
                                />
                                <Stack.Screen
                                    name="CampusInfo"
                                    component={CampusInfo}
                                />
                                <Stack.Screen
                                    name="InstructorInfo"
                                    component={InstructorInfo}
                                />
                                <Stack.Screen
                                    name="InstructorDetails"
                                    component={InstructorDetails}
                                />
                                <Stack.Screen
                                    name="AddInstructorReview"
                                    component={AddInstructorReview}
                                />

                                <Stack.Screen
                                    name="SpecificEvent"
                                    component={SpecificEvent}
                                />
                                <Stack.Screen
                                    name="SavedPosts"
                                    component={SavedPosts}
                                />
                                {/* component={AddInstructorReview} */}
                                {/* /> */}

                                <Stack.Screen
                                    name="AddEvent"
                                    component={AddEvent}
                                    options={{
                                        headerShown: true,
                                        title: "Add Event",
                                        headerStyle: {
                                            backgroundColor: "black",
                                        },
                                        headerTintColor: "white",
                                        headerTitleStyle: {
                                            fontWeight: "bold",
                                            color: "white",
                                        },
                                        headerTitleAlign: "center",
                                    }}
                                />
                                <Stack.Screen name="Login" component={Login} />
                            </Stack.Group>
                        ) : (
                            <Stack.Group>
                                <Stack.Screen
                                    name="Signup"
                                    component={Signup}
                                />
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen
                                    name="PIN"
                                    component={SignupPIN}
                                />
                                <Stack.Screen
                                    name="ProfilePicture"
                                    component={SignupProfilePicture}
                                />
                            </Stack.Group>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>

                {/* <BottomTabs /> */}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};
export default Main;

const styles = StyleSheet.create({});

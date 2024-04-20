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

import { loadUser } from "./redux/action";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loader from "./components/Loader";
import SinglePost from "./screens/SinglePost";
import Transcript from "./screens/Transcript";
import GpaPredictorHome from "./screens/GpaPredictorHome";
import GpaPredictor from "./screens/GpaPredictor";
import EditPost from "./screens/EditPost";
import EditProfile from "./screens/EditProfile";
import PostMediaScroll from "./screens/PostMediaScroll";
import SpecificEvent from "./screens/SpecificEvent";
import AddPost from "./screens/AddPost";
// import EditProfile from "./screens/EditProfile";
// import PostImageScroll from "./screens/PostImageScroll";
// import VideoPlayer from "./screens/VideoPlayer";
import AddEvent from "./screens/AddEvent";
import { NOTIFICATION_BAR_COLOR } from "./constants/color";
import ChatScreen from "./screens/ChatScreen";
import ChatsHome from "./screens/ChatsHome";
import ThreadScreen from "./screens/ThreadScreen";
import { useChatClient } from "./useChatClient";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useAppDispatch();
  const { clientIsReady } = useChatClient();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  // Use React's useState to create a state variable for loading
  const [loadingChat, setLoadingChat] = useState(true);

  // Use React's useEffect to update the loading state when clientIsReady changes
  useEffect(() => {
    if (clientIsReady) {
      setLoadingChat(false);
    }
  }, [clientIsReady]);

  return loading && loadingChat ? (
    <Loader />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: NOTIFICATION_BAR_COLOR,
          // paddingHorizontal: 20,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "BottomTabs" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            {isAuthenticated ? (
              <Stack.Group>
                <Stack.Screen name="BottomTabs" component={BottomTabs} />
                {/* <Stack.Screen
                                    name="Comments"
                                    component={Comments}
                                /> */}
                <Stack.Screen name="SinglePost" component={SinglePost} />
                <Stack.Screen name="AddPost" component={AddPost} />
                <Stack.Screen
                  name="PostMediaScroll"
                  component={PostMediaScroll}
                />
                <Stack.Screen name="ChatsHome" component={ChatsHome} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
                <Stack.Screen name="Transcript" component={Transcript} />
                <Stack.Screen
                  name="GpaPredictorHome"
                  component={GpaPredictorHome}
                />
                <Stack.Screen name="GpaPredictor" component={GpaPredictor} />
                <Stack.Screen name="EditPost" component={EditPost} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="CampusInfo" component={CampusInfo} />
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

                <Stack.Screen name="SpecificEvent" component={SpecificEvent} />
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
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PIN" component={SignupPIN} />
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

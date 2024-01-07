import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { View } from "react-native";

import Signup from "./screens/Signup";
import Login from "./screens/Login";
import BottomTabs from "./components/BottomTabs";
import SignupPIN from "./screens/SignupPIN";
import SignupProfilePicture from "./screens/SignupProfilePicture";
import Comments from "./screens/Comments";

import { loadUser } from "./redux/action";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loader from "./components/Loader";
import SinglePost from "./screens/SinglePost";
import PostMenu from "./components/PostMenu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from "react";
import { PostMenuRefProps } from "./components/PostMenu";
import EditPost from "./screens/EditPost";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<PostMenuRefProps>(null);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  // const isAuthenticated = false;
  // const loading = false;

  return loading ? (
    <Loader />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "black",
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
                <Stack.Screen name="Comments" component={Comments} />
                <Stack.Screen name="SinglePost" component={SinglePost} />
                <Stack.Screen name="EditPost" component={EditPost} />
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

import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionSpecs, TransitionPresets } from "@react-navigation/stack";
import EventTopTabs from "./EventTopTabs";
import SpecificEvent from "../screens/SpecificEvent";

const Stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="EventTopTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="EventTopTabs" component={EventTopTabs} />
        <Stack.Screen
          name="SpecificEvent"
          component={SpecificEvent}
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default EventsStack;

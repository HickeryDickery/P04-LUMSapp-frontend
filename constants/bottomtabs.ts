import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import LdfHomePage from "../screens/LdfHomePage";
import AddPost from "../screens/AddPost";
import HomeStack from "../components/HomeStack";
import EventsStack from "../components/EventsStack";

type BottomTab = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  component: React.FC;
};

const bottomTabs: BottomTab[] = [
  { name: "LDF", icon: "people-circle", component: LdfHomePage },
  { name: "AllEvents", icon: "calendar", component: EventsStack },
  { name: "HomeStack", icon: "home", component: HomeStack },
  { name: "AddPost", icon: "add-circle", component: AddPost },
  // { name: "Donations", icon: "fitness" },
  // { name: "Profile", icon: "person" },
];

export default bottomTabs;

import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import LdfHomePage from "../screens/LdfHomePage";

interface BottomTab {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  component: React.FC;
}

const bottomTabs = [
  { name: "LDF", icon: "people-circle", component: LdfHomePage },
  // { name: "Events", icon: "calendar", },
  { name: "Home", icon: "home", component: Home },
  // { name: "Donations", icon: "fitness" },
  // { name: "Profile", icon: "person" },
];

export default bottomTabs;

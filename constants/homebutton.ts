import { MaterialIcons } from "@expo/vector-icons";

interface Button {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

const buttons: Button[] = [
  {
    name: "Academics",
    icon: "school",
    route: "Academics",
  },
  {
    name: "Schedular",
    icon: "calendar-today",
    route: "Schedular",
  },
  {
    name: "Swapper",
    icon: "swap-horiz",
    route: "Swapper",
  },
  {
    name: "Coming Soon",
    icon: "hourglass-bottom",
    route: "Coming Soon",
  },
];

export default buttons;

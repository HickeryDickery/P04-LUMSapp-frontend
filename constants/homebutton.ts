import { MaterialIcons } from "@expo/vector-icons";

interface Button {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const buttons: Button[] = [
  {
    name: "Academics",
    icon: "school",
  },
  {
    name: "Schedular",
    icon: "calendar-today",
  },
  {
    name: "Swapper",
    icon: "swap-horiz",
  },
  {
    name: "Coming Soon",
    icon: "hourglass-bottom",
  },
];

export default buttons;

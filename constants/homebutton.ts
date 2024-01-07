import { MaterialIcons } from '@expo/vector-icons';

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
    name: "Scheduler",
    icon: "calendar-today",
    route: "Scheduler",
  },
  {
    name: "GPA Predictor",
    icon: "check-circle",
    route: "GPA Predictor"
  },
  {
    name: "Coming Soon",
    icon: "hourglass-bottom",
    route: "Coming Soon",
  },
];

export default buttons;

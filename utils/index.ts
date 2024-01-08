import { Platform } from "react-native";

export const isPlatform = (os: typeof Platform.OS) => Platform.OS === os;

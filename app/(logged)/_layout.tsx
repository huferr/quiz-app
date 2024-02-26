import { useAuth } from "@/hooks";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function LoggedLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;

  if (!user) {
    return <Redirect href="/auth/welcome" />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
}

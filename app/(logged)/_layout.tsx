import { LoadingScreen } from "@/components";
import { useAuth } from "@/hooks";
import { Redirect, Stack } from "expo-router";

export default function LoggedLayout() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return <Redirect href="/auth/welcome" />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
}

import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function AppLayout() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

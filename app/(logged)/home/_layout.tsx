import { Tabs } from "expo-router";

import { TabNavigator } from "@/components";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabNavigator {...props} />}
    />
  );
}

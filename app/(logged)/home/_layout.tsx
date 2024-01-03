import { Tabs, usePathname, useSegments } from 'expo-router';
import { TabNavigator } from '../../../components/TabNavigator';
import { HOME_ROUTES } from '../../../constants';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={TabNavigator}
    />
  );
}

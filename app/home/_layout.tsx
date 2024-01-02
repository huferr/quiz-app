import { Tabs } from 'expo-router';
import { TabNavigator } from '../../components/TabNavigator';

export default function RootLayout() {
  return <Tabs screenOptions={{ headerShown: false }} tabBar={TabNavigator}/>;
}

import { Tabs } from 'expo-router';
import { TabNavigator } from '../../components/TabNagivator';

export default function RootLayout() {
  return <Tabs screenOptions={{ headerShown: false }} tabBar={TabNavigator}/>;
}

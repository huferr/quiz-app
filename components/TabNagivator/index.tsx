import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { StyleSheet, Text, View } from 'react-native';

export function TabNavigator(props: BottomTabBarProps) {
  return (
    <View style={styles.root}>
      {props.state.routes.map((route, index) => {
        return <Text key={route.key}>{route.name}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'red',
    height: 40,
  },
});

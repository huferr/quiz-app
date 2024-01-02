import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { Typography, SafeView } from '../../components';

export default function Page() {
  return (
    <SafeView>
      <Typography>Hello World</Typography>
      <Pressable onPress={() => router.push('/home')}>
        <Typography>Sign In</Typography>
      </Pressable>
    </SafeView>
  );
}

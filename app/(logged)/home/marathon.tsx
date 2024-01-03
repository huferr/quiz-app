import { TouchableOpacity } from 'react-native';
import { SafeView, Typography } from '../../../components';
import { router } from 'expo-router';

export default function Marathon() {
  return (
    <SafeView>
      <Typography>Marathon</Typography>

      <TouchableOpacity onPress={() => router.push('/home')}>
        <Typography fontWeight='700'>Voltar</Typography>
      </TouchableOpacity>
    </SafeView>
  );
}

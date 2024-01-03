import { TouchableOpacity } from 'react-native';
import { SafeView, Typography } from '../../../components';
import { router } from 'expo-router';

export default function Play() {
  return (
    <SafeView>
      <Typography>Maratona</Typography>

      <TouchableOpacity onPress={() => router.push('/home/play')}>
        <Typography fontWeight='700'>Voltar</Typography>
      </TouchableOpacity>
    </SafeView>
  );
}

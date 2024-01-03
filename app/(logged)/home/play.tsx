import { TouchableOpacity } from 'react-native';
import { SafeView, Typography } from '../../../components';
import { router } from 'expo-router';

export default function Play() {
  return (
    <SafeView>
      <Typography>Play</Typography>

      <Typography>Selecione o modo de jogo:</Typography>

      <TouchableOpacity onPress={() => router.push('/game/marathon')}>
        <Typography fontWeight='700'>Maratona</Typography>
      </TouchableOpacity>
    </SafeView>
  );
}

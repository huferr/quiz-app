import { TouchableOpacity } from 'react-native';
import { SafeView, Typography } from '../../../components';
import { router } from 'expo-router';
import { useGetSingleQuestion } from '../../../hooks';

export default function Play() {
  const { data } = useGetSingleQuestion();

  console.log('data', data);
  return (
    <SafeView>
      <Typography>Maratona</Typography>

      <TouchableOpacity onPress={() => router.push('/home/play')}>
        <Typography fontWeight='700'>Voltar</Typography>
      </TouchableOpacity>
    </SafeView>
  );
}

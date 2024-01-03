import { Pressable } from 'react-native';
import { router } from 'expo-router';
import styled from 'styled-components/native';

import { SafeView } from '../../../components/SafeView';
import { Typography } from '../../../components/Typography';

export default function Page() {
  return (
    <Container>
      <Typography>Home</Typography>
      <Pressable onPress={() => router.push('/auth/sign-in')}>
        <Typography>Logout</Typography>
      </Pressable>
    </Container>
  );
}

const Container = styled(SafeView)``;

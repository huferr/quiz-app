import { Pressable } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography } from "@/components";

export default function Onboarding() {
  return (
    <Container>
      <Typography>Complete your profile</Typography>
      <Pressable onPress={() => router.push("/home")}>
        <Typography>Continue</Typography>
      </Pressable>
    </Container>
  );
}

const Container = styled(SafeView)``;

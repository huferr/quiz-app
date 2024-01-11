import { Pressable } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography } from "@/components";
import { supabase } from "@/api";

export default function Page() {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert("Signed out!");
    }
    if (error) {
      alert(error.message);
    }
  };
  return (
    <Container>
      <Typography>Home</Typography>
      <Pressable onPress={logout}>
        <Typography>Logout</Typography>
      </Pressable>
    </Container>
  );
}

const Container = styled(SafeView)``;

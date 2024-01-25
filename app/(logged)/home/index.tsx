import { Pressable } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography } from "@/components";
import { supabase } from "@/api";
import { useGetOpenBattles, useGetProfile } from "@/hooks";

export default function Page() {
  const { data: userData } = useGetProfile();
  const { data } = useGetOpenBattles();

  const username = userData?.username;

  const openBattles = data?.battles;

  console.log("battles", openBattles);

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
      <Typography>Olá, {username}</Typography>

      <Pressable onPress={logout}>
        <Typography>Logout</Typography>
      </Pressable>

      {openBattles?.map((battle) => {
        const isMyTurn = battle.round_owner === userData?.id;
        return (
          <Pressable
            key={battle.id}
            onPress={() => {
              router.push({
                pathname: `game/battle/${battle.id}`,
              });
            }}
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
          >
            <Typography>{battle.id} | </Typography>
            <Typography>{battle.my_score} : </Typography>
            <Typography>{battle.opponent_score} | </Typography>
            <Typography>{isMyTurn ? "Sua vez" : "Vez do oponente"}</Typography>
          </Pressable>
        );
      })}
    </Container>
  );
}

const Container = styled(SafeView)``;

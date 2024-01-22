import { TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography } from "@/components";
import { isPlatform } from "@/utils";
import { useGetBattle, useGetProfile } from "@/hooks";

export default function Battle() {
  const { id } = useLocalSearchParams();

  console.log("id", id);

  const { data } = useGetBattle(Number(id));

  console.log("battle =>>>>", data);

  return (
    <SafeView
      paddingHorizontal={isPlatform("android") ? 16 : 24}
      backgroundColor="#292929"
    >
      <Header>
        <TouchableOpacity
          onPress={() => router.push("/game/battle/onboarding")}
        >
          <Typography fontWeight="700" color="#fff">
            Voltar
          </Typography>
        </TouchableOpacity>
        <Typography color="#fff">Batalha</Typography>
      </Header>
      <Content>
        <Typography
          fontWeight="700"
          fontSize={16}
          color="#fff"
          textAlign="center"
          marginTop={24}
        >
          Batalha {id}
        </Typography>

        <Typography
          fontWeight="700"
          fontSize={16}
          color="#fff"
          textAlign="center"
          marginTop={24}
        >
          Player vs Player
        </Typography>
      </Content>
    </SafeView>
  );
}

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.View`
  align-items: center;
  padding-top: 48px;
`;

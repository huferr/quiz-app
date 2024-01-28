import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography } from "@/components";
import { isPlatform } from "@/utils";
import { useGetProfile } from "@/hooks";

export default function MarathonOnboarding() {

  const { data } = useGetProfile();

  const streak = data?.streak || 0;

  return (
    <SafeView
      paddingHorizontal={isPlatform("android") ? 16 : 24}
      backgroundColor="#292929"
    >
      <Header>
        <TouchableOpacity onPress={() => router.push("/home/play")}>
          <Typography fontWeight="700" color="#fff">
            Voltar
          </Typography>
        </TouchableOpacity>
        <Typography color="#fff">Maratona</Typography>
      </Header>
      <Content>
        <TouchableOpacity onPress={() => router.push("/game/marathon")}>
          <Typography
            fontWeight="700"
            fontSize={24}
            color="#fff"
            textAlign="center"
          >
            Play
          </Typography>
        </TouchableOpacity>
        <Typography
            fontWeight="700"
            fontSize={24}
            color="#fff"
            textAlign="center"
            marginTop={24}
          >
            Record: {streak}
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
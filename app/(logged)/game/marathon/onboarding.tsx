import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography } from "@/components";
import { isPlatform } from "@/utils";

export default function MarathonOnboarding() {
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

const OptionsContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  gap: 24px;
`;

const OptionButton = styled.TouchableOpacity<{
  isSelectedCorrect: boolean | undefined;
  correctAnswer: boolean;
  isSelectedOption: boolean;
}>`
  padding: 6px 48px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(p) => {
    if (!p.disabled) return "#fff";

    if (p.correctAnswer || (p.isSelectedCorrect && p.isSelectedOption))
      return "#48B117";

    if (!p.isSelectedCorrect && p.isSelectedOption) return "#c53030";

    return "#fff";
  }};
  align-items: center;
`;

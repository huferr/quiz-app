import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { FullModal, SafeView, Typography } from "@/components";
import { isPlatform } from "@/utils";
import { useStartBattle } from "@/hooks";
import { useState } from "react";

export default function BattleOnboarding() {
  const [isRandom, setIsRandom] = useState(false);

  const { mutateAsync: handleStartBattle, isPending } = useStartBattle();

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
        <Typography color="#fff">Batalha</Typography>
      </Header>
      <Content>
        <Typography color="#fff" fontSize={24} marginBottom={24}>
          Escolha o seu oponente
        </Typography>

        <TouchableOpacity
          onPress={async () => {
            setIsRandom(true);
            const response = await handleStartBattle({});

            console.log("response", response);

            router.push(`/game/battle/${response.battle.id}`);
          }}
        >
          <Typography
            fontWeight="700"
            fontSize={16}
            color="#fff"
            textAlign="center"
          >
            Jogador Aleatório
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/game/battle/search")}>
          <Typography
            fontWeight="700"
            fontSize={16}
            color="#fff"
            textAlign="center"
            marginTop={24}
          >
            Pesquisar Jogador
          </Typography>
        </TouchableOpacity>
      </Content>

      {isRandom && isPending && (
        <FullModal>
          <LoadingContainer>
            <Typography color="#fff">Procurando jogador...</Typography>
          </LoadingContainer>
        </FullModal>
      )}
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

const LoadingContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
`;

import { TouchableOpacity } from "react-native"
import { router } from "expo-router"

import { SafeView, Typography } from "@/components"
import styled from "styled-components/native"
import { PageHeader } from "@/components/PageHeader"

export default function Play() {
  return (
    <SafeView>
      <PageHeader title="Modo de Jogo" />
      <Page>
        <Typography>Selecione o modo de jogo:</Typography>

        <TouchableOpacity
          onPress={() => router.push("/game/battle/onboarding")}
        >
          <Typography fontWeight="700">Batalha 1 vs 1</Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/game/marathon/onboarding")}
        >
          <Typography fontWeight="700">Maratona</Typography>
        </TouchableOpacity>
      </Page>
    </SafeView>
  )
}

export const Page = styled.View`
  padding: 16px;
`

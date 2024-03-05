import { router } from "expo-router"

import { SafeView, Typography } from "@/components"
import styled from "styled-components/native"
import { PageHeader } from "@/components/PageHeader"

export default function Play() {
  return (
    <SafeView>
      <PageHeader title="Modo de Jogo" />
      <Page>

        <Item onPress={() => router.push("/game/marathon/onboarding")}>
          <Typography fontWeight="700">Maratona</Typography>
        </Item>
        <Item onPress={() => router.push("/game/battle/onboarding")}>
          <Typography fontWeight="700">Batalha 1v1</Typography>
        </Item>

      </Page>
    </SafeView>
  )
}

export const Page = styled.View`
  padding: 16px;
  gap: 16px;
`

export const Item = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  border: 1px solid #d2d2d2;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  align-items: center;
`

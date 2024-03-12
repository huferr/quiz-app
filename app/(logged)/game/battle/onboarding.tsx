import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography, LoadingScreen } from "@/components"
import { useStartBattle } from "@/hooks"
import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { Info, Shuffle, Swords, UserSearch } from "lucide-react-native"

export default function BattleOnboarding() {
  const [isRandom, setIsRandom] = useState(false)

  const { mutateAsync: handleStartBattle, isPending } = useStartBattle()

  if (isRandom && isPending && <LoadingScreen />) return <LoadingScreen />

  return (
    <SafeView>
      <PageHeader
        title="Batalha 1v1"
        onPressGoBack={() => router.push("/home")}
        actionIcon={<Info />}
        onPressAction={() => { }}
      />
      <Content>
        <Swords size="48px" strokeWidth={1.5} />

        <Typography fontSize={24} marginBottom={24} marginTop={24}>
          Escolha o seu oponente
        </Typography>

        <Item
          onPress={async () => {
            setIsRandom(true)
            const response = await handleStartBattle({ opponentId: "" })

            console.log("response", response)

            router.push(`/game/battle/${response.battle.id}`)
          }}
        >
          <Shuffle color="#000" />
          <Typography fontWeight="700" fontSize={16} textAlign="center">
            Jogador Aleatório
          </Typography>
        </Item>

        <Item onPress={() => router.push("/game/battle/search")}>
          <UserSearch color="#000" />
          <Typography fontWeight="700" fontSize={16} textAlign="center">
            Pesquisar Jogador
          </Typography>
        </Item>
      </Content>
    </SafeView>
  )
}

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const Content = styled.View`
  align-items: center;
  padding-top: 48px;
  padding-left: 16px;
  padding-right: 16px;
`

const Item = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  border: 1px solid #d2d2d2;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-direction: row;
  gap: 16px;
`

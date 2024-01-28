import { Pressable, TouchableOpacity } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import styled from "styled-components/native"

import { LoadingScreen, SafeView, Typography } from "@/components"
import { isPlatform, userIsOpponent } from "@/utils"
import { useGetBattle, useGetProfile } from "@/hooks"

export default function Battle() {
  const { id } = useLocalSearchParams()
  const { data: userData } = useGetProfile()
  const { data: battleData, isLoading } = useGetBattle(Number(id))

  const opponent = battleData?.opponent
  const opponentUsername = opponent?.username

  const opponentScore = userIsOpponent(battleData?.battle!, userData!)
    ? battleData?.battle?.my_score
    : battleData?.battle?.opponent_score

  const username = userData?.username

  const myScore = userIsOpponent(battleData?.battle!, userData!)
    ? battleData?.battle?.opponent_score
    : battleData?.battle?.my_score

  const isYourTurn = battleData?.battle?.round_owner === userData?.id

  const handleGoToQuestion = () => {
    router.push({ pathname: "/game/battle/question", params: { id } })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

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
          Você ({myScore}) vs ({opponentScore}) {opponentUsername}
        </Typography>

        {isYourTurn ? (
          <Pressable onPress={handleGoToQuestion}>
            <Typography
              fontWeight="700"
              fontSize={24}
              color="#fff"
              textAlign="center"
              marginTop={24}
            >
              Jogar
            </Typography>
          </Pressable>
        ) : (
          <Typography
            fontWeight="700"
            fontSize={16}
            color="#fff"
            textAlign="center"
            marginTop={24}
          >
            Espere a vez do seu oponente
          </Typography>
        )}
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
`

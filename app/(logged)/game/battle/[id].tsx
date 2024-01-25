import { Pressable, TouchableOpacity } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { isPlatform } from "@/utils"
import { useGetBattle, useGetProfile } from "@/hooks"

export default function Battle() {
  const { id } = useLocalSearchParams()
  const { data: userData } = useGetProfile()
  const { data: battleData } = useGetBattle(Number(id))

  const opponent = battleData?.opponent
  const opponentUsername = opponent?.username
  const opponentScore = battleData?.battle?.opponent_score

  const username = userData?.username
  const myScore = battleData?.battle?.my_score

  const isYourTurn = battleData?.battle?.round_owner === userData?.id

  console.log("battle =>>>>", battleData)

  const handleGoToQuestion = () => {
    router.push({ pathname: "/game/battle/question", params: { id } })
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
          {username} ({myScore}) vs ({opponentScore}) {opponentUsername}
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

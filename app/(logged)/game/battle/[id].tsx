import { Pressable, TouchableOpacity } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import styled from "styled-components/native"

import { FullModal, SafeView, Typography } from "@/components"
import { isPlatform, userIsOpponent } from "@/utils"
import {
  useGetBattle,
  useGetOpenBattles,
  useGetProfile,
  useUpdateBattle
} from "@/hooks"

export default function Battle() {
  const { id } = useLocalSearchParams()
  const { data: userData } = useGetProfile()
  const { data: battleData, isLoading } = useGetBattle(Number(id))
  const { mutateAsync: handleUpdateBattle } = useUpdateBattle()
  const { refetch: refetchAllBattles } = useGetOpenBattles()

  const opponent = battleData?.opponent
  const opponentUsername = opponent?.username

  const opponentScore = userIsOpponent(battleData?.battle!, userData!)
    ? battleData?.battle?.my_score
    : battleData?.battle?.opponent_score

  const myScore = userIsOpponent(battleData?.battle!, userData!)
    ? battleData?.battle?.opponent_score
    : battleData?.battle?.my_score

  const isYourTurn = battleData?.battle?.round_owner === userData?.id

  const shouldTurnRound = myScore === 5 && opponentScore === 0

  const didWin = myScore === 10

  const handleGoToQuestion = () => {
    router.push({ pathname: "/game/battle/question", params: { id } })
  }

  return (
    <SafeView
      paddingHorizontal={isPlatform("android") ? 16 : 24}
      backgroundColor="#292929"
      isLoading={isLoading}
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

        {shouldTurnRound && (
          <FullModal visible={shouldTurnRound} animationType="none">
            <LoadingContainer>
              <Typography
                fontWeight="700"
                fontSize={16}
                color="#fff"
                textAlign="center"
                marginTop={24}
              >
                Você acertou 5 perguntas seguidas! Dê a chance para o seu
                oponente de jogar.
              </Typography>
              <Pressable
                onPress={async () => {
                  await handleUpdateBattle({
                    battleId: Number(id),
                    value: 0,
                    changeOwner: true
                  })

                  router.push(`/home`)
                  refetchAllBattles()
                }}
              >
                <Typography
                  fontWeight="700"
                  fontSize={16}
                  color="#fff"
                  textAlign="center"
                  marginTop={24}
                >
                  Continuar
                </Typography>
              </Pressable>
            </LoadingContainer>
          </FullModal>
        )}

        {didWin && (
          <FullModal visible animationType="none">
            <LoadingContainer>
              <Typography
                fontWeight="700"
                fontSize={16}
                color="#fff"
                textAlign="center"
                marginTop={24}
              >
                VENCEDOR! Você acertou 10 perguntas primeiro!
              </Typography>
              <Pressable
                onPress={async () => {
                  await handleUpdateBattle({
                    battleId: Number(id),
                    value: 0,
                    changeOwner: false,
                    finished: true,
                    winnerId: userData?.id!
                  })
                  router.push(`/home`)
                  refetchAllBattles()
                }}
              >
                <Typography
                  fontWeight="700"
                  fontSize={16}
                  color="#fff"
                  textAlign="center"
                  marginTop={24}
                >
                  Continuar
                </Typography>
              </Pressable>
            </LoadingContainer>
          </FullModal>
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

const LoadingContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
`

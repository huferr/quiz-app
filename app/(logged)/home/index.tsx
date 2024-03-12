import { RefreshControl } from "react-native"
import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { useGetOpenBattles, useGetProfile } from "@/hooks"
import { useState } from "react"
import { getCorrectAnswersRate, isPlatform } from "@/utils"
import {
  Banknote,
  Brain,
  CircleDollarSign,
  Medal,
  Rocket,
  Search,
  SearchCheck,
  Swords
} from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BattleCard } from "@/components/BattleCard"

export default function Page() {
  const { data: userData, refetch: refetchUserData } = useGetProfile()
  const { data, refetch: refetchBattles } = useGetOpenBattles()

  const [refreshing, setRefreshing] = useState(false)
  const { bottom } = useSafeAreaInsets()

  const openBattles = data?.battles

  const handleOnRefresh = async () => {
    setRefreshing(true)
    await refetchUserData()
    await refetchBattles()
    setRefreshing(false)
  }

  const goToMarathon = () => router.push("/game/marathon/onboarding")
  const goToBattle = () => router.push("/game/battle/onboarding")

  return (
    <SafeView>
      <Container
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isPlatform("android") ? bottom + 98 : bottom + 48
        }}
        refreshControl={
          <RefreshControl onRefresh={handleOnRefresh} refreshing={refreshing} />
        }
      >
        <Header>
          <ProfileContainer>
            <ProfileImage source={require("assets/placeholder.png")} />
            <Typography fontWeight="600" fontSize={20}>
              {userData?.username}
            </Typography>
            <LevelBadge>
              <Typography color="#fff" fontWeight="700" fontSize={12}>
                {userData?.level}
              </Typography>
            </LevelBadge>
          </ProfileContainer>
          <RightActionsContainer>
            <ActionButton>
              <Search color="#000" />
            </ActionButton>
          </RightActionsContainer>
        </Header>
        <CoinsContainer>
          <Coin color="#2C9D04">
            <CircleDollarSign size="20px" color="#2C9D04" />

            <Typography fontWeight="600" color="#2C9D04" fontSize={14}>
              {userData?.free_coins}
            </Typography>
          </Coin>
          <Coin color="#C23FE3">
            <Banknote size="20px" color="#C23FE3" />
            <Typography fontWeight="600" color="#C23FE3" fontSize={14}>
              {userData?.paid_coins}
            </Typography>
          </Coin>
        </CoinsContainer>

        <Typography
          marginBottom={16}
          fontWeight="700"
          fontSize={18}
          color="#818181"
        >
          Progresso
        </Typography>

        <StatusCard>
          <InfoCard>
            <InfoLeftCard>
              <SearchCheck color="#2D900B" />
              <Typography fontWeight="700" color="#5C5C5C">
                Respostas corretas
              </Typography>
            </InfoLeftCard>
            <Typography color="#4181FC" fontWeight="700">
              {userData?.correct_answers}
            </Typography>
          </InfoCard>
          <InfoCard>
            <InfoLeftCard>
              <Brain color="#0952A6" />
              <Typography fontWeight="700" color="#5C5C5C">
                Acertividade (%)
              </Typography>
            </InfoLeftCard>
            <Typography color="#4181FC" fontWeight="700">
              {getCorrectAnswersRate(
                userData?.correct_answers,
                userData?.wrong_answers
              )}
            </Typography>
          </InfoCard>
          <InfoCard>
            <InfoLeftCard>
              <Medal color="#C7BF00" />
              <Typography fontWeight="700" color="#5C5C5C">
                Ranking
              </Typography>
            </InfoLeftCard>
            <Typography color="#4181FC" fontWeight="700">
              #1
            </Typography>
          </InfoCard>
        </StatusCard>

        <Typography
          marginBottom={16}
          fontWeight="700"
          fontSize={18}
          color="#818181"
        >
          Modos de Jogo
        </Typography>

        <GameCard
          color="#2CFA4D25"
          borderColor="#119F28"
          onPress={goToMarathon}
        >
          <GameCardHeader>
            <Rocket color="#119F28" />
            <Typography fontWeight="700">Maratona</Typography>
          </GameCardHeader>

          <Typography>Acerte o máximo de perguntas que puder.</Typography>
        </GameCard>

        <GameCard color="#2C72FA25" borderColor="#2C72FA" onPress={goToBattle}>
          <GameCardHeader>
            <Swords color="#2C72FA" />
            <Typography fontWeight="700">Batalha 1v1</Typography>
          </GameCardHeader>

          <Typography>Desafie seus oponentes.</Typography>
        </GameCard>

        <Typography
          marginBottom={16}
          marginTop={24}
          fontWeight="700"
          fontSize={18}
          color="#818181"
        >
          Batalhas
        </Typography>

        {openBattles?.map((battle) => {
          return <BattleCard key={battle.id} battle={battle} />
        })}

        {/* {oppponentTurnBattles?.map((battle) => {
          return (
            <Pressable
              key={battle.id}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10
              }}
            >
              <Typography>{battle.id} | </Typography>
              <Typography>{myScore(battle)} : </Typography>
              <Typography>{opponentScore(battle)} | </Typography>
              <Typography>Vez do oponente</Typography>
            </Pressable>
          )
        })} */}
      </Container>
    </SafeView>
  )
}

const Container = styled.ScrollView`
  padding: 16px 16px 0px;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`
const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
export const ProfileImage = styled.Image`
  width: 38px;
  height: 38px;
  border-radius: 8px;
`

export const LevelBadge = styled.View`
  background-color: #2c72fa;
  padding: 0px 6px;
  border-radius: 4px;
`

export const RightActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const ActionButton = styled.TouchableOpacity``

export const CoinsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`

export const Coin = styled.TouchableOpacity<{ color: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 1px 10px;
  border-color: ${({ color }) => color};
  border-width: 1px;
  border-radius: 16px;
  border-style: solid;
  background-color: #fff;
`

export const StatusCard = styled.View`
  background-color: #fff;
  padding: 16px 16px 0px;
  border-radius: 12px;
  margin-bottom: 32px;
  border-width: 1px;
  border-color: #d2d2d2;
  border-style: solid;
`

const InfoCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const InfoLeftCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const GameCard = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })<{
  color: string
  borderColor: string
}>`
  background-color: ${(p) => p.color || "#fff"};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${(p) => p.borderColor || "#d2d2d2"};
  border-style: solid;
`
const GameCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`

const BattleItem = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #d2d2d2;
  border-radius: 12px;
  background-color: #fff;
  padding: 16px;
`

const ScoreContainer = styled.View`
  flex-direction: row;
  padding: 2px 12px;
  background-color: #e7e7e7;
  gap: 8px;
  border-radius: 16px;
`

const BattleItemLeft = styled.View`
  gap: 8px;
`

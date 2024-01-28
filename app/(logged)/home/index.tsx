import { Pressable, RefreshControl } from "react-native"
import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { useGetOpenBattles, useGetProfile } from "@/hooks"
import { useState } from "react"
import { Battle } from "@/types"
import { userIsOpponent } from "@/utils"

export default function Page() {
  const { data: userData, refetch: refetchUserData } = useGetProfile()
  const { data, refetch: refetchBattles } = useGetOpenBattles()

  const [refreshing, setRefreshing] = useState(false)

  const username = userData?.username

  const openBattles = data?.battles

  const handleOnRefresh = async () => {
    setRefreshing(true)
    await refetchUserData()
    await refetchBattles()
    setRefreshing(false)
  }

  const yourTurnBattles = openBattles?.filter(
    (battle) => battle.round_owner === userData?.id || battle.winner_id !== null
  )

  const oppponentTurnBattles = openBattles?.filter(
    (battle) => battle.round_owner !== userData?.id && battle.winner_id === null
  )

  const myScore = (battle: Battle) =>
    userIsOpponent(battle, userData!) ? battle.opponent_score : battle.my_score

  const opponentScore = (battle: Battle) =>
    userIsOpponent(battle, userData!) ? battle.my_score : battle.opponent_score

  return (
    <SafeView>
      <Container
        refreshControl={
          <RefreshControl onRefresh={handleOnRefresh} refreshing={refreshing} />
        }
      >
        <Typography marginBottom={24}>Olá, {username}!</Typography>

        <Typography marginBottom={24} fontWeight="700">
          Batalhas
        </Typography>

        {yourTurnBattles?.map((battle) => {
          const won = battle.winner_id && battle.winner_id === userData?.id

          const lost = battle.winner_id && battle.winner_id !== userData?.id

          return (
            <Pressable
              key={battle.id}
              onPress={() => {
                if (won || lost) return
                router.push({
                  pathname: `game/battle/${battle.id}`
                })
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10
              }}
            >
              <Typography>{battle.id} | </Typography>
              <Typography>{myScore(battle)} : </Typography>
              <Typography>{opponentScore(battle)}</Typography>
              {won && <Typography> Você venceu!</Typography>}
              {lost && <Typography> Você perdeu!</Typography>}
            </Pressable>
          )
        })}

        <Typography marginBottom={24} marginTop={24} fontWeight="700">
          Esperando pelo oponente
        </Typography>

        {oppponentTurnBattles?.map((battle) => {
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
        })}
      </Container>
    </SafeView>
  )
}

const Container = styled.ScrollView``

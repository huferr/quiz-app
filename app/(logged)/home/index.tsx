import { Pressable, RefreshControl } from "react-native"
import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { useGetOpenBattles, useGetProfile } from "@/hooks"
import { useState } from "react"

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

  return (
    <SafeView>
      <Container
        refreshControl={
          <RefreshControl onRefresh={handleOnRefresh} refreshing={refreshing} />
        }
      >
        <Typography>Home</Typography>
        <Typography>Olá, {username}</Typography>

        {openBattles?.map((battle) => {
          const isMyTurn = battle.round_owner === userData?.id
          return (
            <Pressable
              key={battle.id}
              onPress={() => {
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
              <Typography>{battle.my_score} : </Typography>
              <Typography>{battle.opponent_score} | </Typography>
              <Typography>
                {isMyTurn ? "Sua vez" : "Vez do oponente"}
              </Typography>
            </Pressable>
          )
        })}
      </Container>
    </SafeView>
  )
}

const Container = styled.ScrollView``

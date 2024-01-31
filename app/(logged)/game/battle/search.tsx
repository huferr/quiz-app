import { FlatList, Pressable, TextInput, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { isPlatform } from "@/utils"
import { useSearchBattlePlayers, useStartBattle } from "@/hooks"
import { useEffect, useState } from "react"

export default function SearchPlayer() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")

  const { data: playersData } = useSearchBattlePlayers(query)

  const { mutateAsync: handleStartBattle, isPending } = useStartBattle()

  const opponents = playersData?.players

  useEffect(() => {
    if (search.length < 2) return
    const timeout = setTimeout(() => {
      setQuery(search)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

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
        <Typography color="#fff">Pesquisar Jogador</Typography>
      </Header>
      <Content>
        <Typography
          fontWeight="700"
          fontSize={16}
          color="#fff"
          textAlign="center"
          marginTop={24}
        >
          Pesquisar Jogador
        </Typography>
        <TextInput
          value={search}
          onChangeText={(t) => setSearch(t)}
          style={{ backgroundColor: "red", width: "100%", height: 50 }}
        />

        <FlatList
          data={opponents}
          renderItem={({ item }) => (
            <Pressable
              onPress={async () => {
                const response = await handleStartBattle({
                  opponentId: item.id
                })

                router.push(`/game/battle/${response.battle.id}`)
              }}
            >
              <Typography color="#fff">{item.username}</Typography>
            </Pressable>
          )}
        />
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
  width: 100%;
  height: 100%;
`

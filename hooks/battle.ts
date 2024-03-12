import { useMutation, useQuery } from "@tanstack/react-query"
import { useGetProfile, useAuth } from "./user"
import { supabase } from "@/api"

export const useStartBattle = () => {
  const { userId } = useAuth()
  const { data: currentUserData } = useGetProfile()

  const userLevel = currentUserData?.level || 1

  const fetcher = async ({ opponentId }: { opponentId: string }) => {
    if (!userId) throw { message: "Missing userId" }
    if (!userLevel) throw { message: "Missing userLevel" }

    let opponent = {} as {
      id: string
      username: string | null
      level: number
    }

    // if opponentId is provided, use that opponent, otherwise find a random opponent
    if (opponentId) {
      const { data: specificOpponent, error: specificOpponentError } =
        await supabase
          .from("profiles")
          .select("id, username, level")
          .eq("id", opponentId)
          .single()

      if (specificOpponentError) {
        throw {
          message: "Couldn't find this opponent",
          specificOpponentError
        }
      }

      opponent = specificOpponent
    } else {
      // find only a random opponent that has been active in the last week
      const { data: randomOpponent, error: opponentError } = await supabase
        .from("profiles")
        .select("id, username, level")
        .neq("id", userId)
        .gte(
          "updated_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        )
        .gte("level", userLevel - 10)
        .lte("level", userLevel + 10)
        .limit(1)
        .single()

      if (opponentError) {
        throw {
          message: "Couldn't find an opponent for you",
          opponentError
        }
      }

      opponent = randomOpponent
    }

    // Create a new battle
    const { data: battle, error: battleError } = await supabase
      .from("battles")
      .insert([
        { user_id: userId, opponent_id: opponent.id, round_owner: userId }
      ])
      .select()
      .single()

    if (battleError) {
      throw {
        message: "Couldn't create a new battle",
        battleError
      }
    }

    return { battle, opponent }
  }

  return useMutation({
    mutationKey: ["useStartBattle", userId],
    mutationFn: fetcher
  })
}

export const useUpdateBattle = () => {
  const { userId } = useAuth()

  const fetcher = async ({
    battleId,
    changeOwner,
    value,
    finished,
    winnerId
  }: {
    battleId: number
    changeOwner: boolean
    value: number
    finished: boolean
    winnerId: string
  }) => {
    if (!battleId) throw { message: "Missing battleId" }
    if (!userId) throw { message: "Missing userId" }
    if (finished && !winnerId)
      throw {
        message: "Missing winnerId when finished TRUE"
      }

    // Find the battle
    const { data: battle, error: battleError } = await supabase
      .from("battles")
      .select("*")
      .eq("id", battleId)
      .single()

    if (battleError) {
      throw {
        message: "Couldn't find this battle",
        battleError
      }
    }

    // if the user (who is requesting) is the opponent, we need to swap the user and opponent
    const isOpponent = userId === battle?.opponent_id

    if (value) {
      const { error: updateBattleScoreError } = await supabase.rpc(
        "update_battle_score",
        {
          battle_id: battleId,
          type: isOpponent ? "opponent" : "self",
          value
        }
      )

      if (updateBattleScoreError) {
        throw {
          message: "Couldn't update the battle score",
          battleError
        }
      }
    }

    if (changeOwner) {
      const { error: changeRoundOwnerError } = await supabase
        .from("battles")
        .update({
          round_owner:
            battle?.round_owner === userId && isOpponent
              ? battle.user_id
              : battle.opponent_id
        })
        .eq("id", battleId)

      if (changeRoundOwnerError) {
        throw {
          message: "Couldn't change the round owner",
          changeRoundOwnerError
        }
      }
    }

    if (finished && winnerId) {
      const { error: finishBattleError } = await supabase
        .from("battles")
        .update({ finished: true, winner_id: winnerId })
        .eq("id", battleId)

      if (finishBattleError) {
        throw {
          message: "Couldn't finish the battle",
          finishBattleError
        }
      }
    }

    return { message: "Battle updated" }
  }

  return useMutation({
    mutationKey: ["useUpdateBattle"],
    mutationFn: fetcher
  })
}

export const useGetBattle = (battleId: number) => {
  const { userId } = useAuth()

  const fetcher = async () => {
    if (!battleId) throw { message: "Missing battleId" }
    if (!userId) throw { message: "Missing userId" }

    const { data: battle, error: battleError } = await supabase
      .from("battles")
      .select("*")
      .eq("id", battleId)
      .single()

    if (battleError) {
      throw {
        message: "Couldn't find this battle",
        battleError
      }
    }

    // if the user (that is requesting) is the opponent, we need to swap the user and opponent
    const isOpponent = userId === battle?.opponent_id

    const { data: opponent } = await supabase
      .from("profiles")
      .select("username, level, id")
      .eq("id", isOpponent! ? battle.user_id! : battle.opponent_id!)
      .single()

    return { battle, opponent }
  }

  return useQuery({ queryKey: ["useGetBattle", battleId], queryFn: fetcher })
}

export const useGetOpenBattles = () => {
  const { userId } = useAuth()

  const fetcher = async () => {
    if (!userId) throw { message: "Missing userId" }

    const { data: battles, error: battlesError } = await supabase
      .from("battles")
      .select("*")
      .or(`user_id.eq.${userId},opponent_id.eq.${userId}`)

    if (battlesError) {
      throw {
        message: "Couldn't find battles",
        battlesError
      }
    }

    return { battles }
  }

  return useQuery({ queryKey: ["useGetOpenBattles"], queryFn: fetcher })
}

export const useSearchBattlePlayers = (query: string) => {
  const { userId } = useAuth()

  // TODO: Add pagination
  const fetcher = async () => {
    if (!userId) throw { message: "Missing userId" }

    const { data: players, error: playersError } = await supabase
      .from("profiles")
      .select("id, username, level")
      .ilike("username", `%${query}%`)
      .neq("id", userId)

    if (playersError) {
      throw {
        message: `Couldn't find a player with ${query}`,
        playersError
      }
    }

    return { players }
  }

  return useQuery({
    queryKey: ["useSearchBattlePlayers", query],
    queryFn: fetcher,
    enabled: !!query
  })
}

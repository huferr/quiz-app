import { useContext, useEffect, useRef, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { api } from "@/api"
import { Battle, Question, User } from "@/types"
import { AuthContext } from "@/providers/AuthProvider"

export const useAuth = () => useContext(AuthContext)

export const useGetQuestions = () => {
  const fetcher = async () => {
    try {
      const response = await api.get("/questions")

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery({ queryKey: ["questions"], queryFn: fetcher })
}

export const useGetSingleQuestion = () => {
  const fetcher = async () => {
    try {
      const response = await api.get<Question>("questions/single")

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery({
    queryKey: ["useGetSingleQuestion"],
    queryFn: fetcher,
    staleTime: Infinity,
    gcTime: 0
  })
}

export const useGetProfile = () => {
  const { userId } = useAuth()

  const fetcher = async () => {
    try {
      const response = await api.get<{ data: User }>(`/user/${userId}`)

      return response.data.data
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery({
    queryKey: ["useGetProfile", userId],
    queryFn: fetcher,
    staleTime: Infinity,
    refetchOnMount: "always",
    enabled: !!userId
  })
}

export const useComputeUserAnswer = () => {
  const { userId } = useAuth()

  const fetcher = async ({
    value,
    type
  }: {
    value: number
    type: "wrong" | "correct"
  }) => {
    try {
      const response = await api.post("/questions/compute", {
        userId,
        value,
        type
      })
      console.log(response.data, value, type)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useMutation({
    mutationKey: ["useComputeUserAnswer", userId],
    mutationFn: fetcher
  })
}

export const useUpdateStreak = () => {
  const { userId } = useAuth()

  const fetcher = async (streak: number) => {
    try {
      const response = await api.post("/questions/streak", {
        userId,
        newStreak: streak
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useMutation({
    mutationKey: ["useUpdateStreak", userId],
    mutationFn: fetcher
  })
}

export const useUpdateFreeCoins = () => {
  const { userId } = useAuth()

  const fetcher = async ({
    value,
    type
  }: {
    value: number
    type: "add" | "remove"
  }) => {
    try {
      const response = await api.post("/user/update-free-coins", {
        userId,
        type,
        value
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useMutation({
    mutationKey: ["useUpdateFreeCoins", userId],
    mutationFn: fetcher
  })
}

export const useUpdatePaidCoins = () => {
  const { userId } = useAuth()

  const fetcher = async ({
    value,
    type
  }: {
    value: number
    type: "add" | "remove"
  }) => {
    try {
      const response = await api.post("/user/update-paid-coins", {
        userId,
        type,
        value
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useMutation({
    mutationKey: ["useUpdateFreeCoins", userId],
    mutationFn: fetcher
  })
}

export const useGetGlobalRanking = () => {
  type Ranking = User & { rank: number }

  const fetcher = async () => {
    try {
      const response = await api.get<{ data: Ranking[] }>(
        "/user/ranking/global"
      )

      return response.data.data
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery({ queryKey: ["useGetGlobalRanking"], queryFn: fetcher })
}

export const useStartBattle = () => {
  const { userId } = useAuth()
  const { data: currentUserData } = useGetProfile()

  const userLevel = currentUserData?.level || 1

  interface Props {
    opponentId?: string
  }

  const fetcher = async ({ opponentId }: Props) => {
    try {
      const response = await api.post("/battle/start", {
        userId,
        userLevel,
        opponentId
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
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
    value
  }: {
    battleId: number
    changeOwner?: boolean
    value: number
  }) => {
    try {
      const response = await api.post("/battle/update", {
        userId,
        battleId,
        changeOwner,
        value
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useMutation({
    mutationKey: ["useUpdateBattle"],
    mutationFn: fetcher
  })
}

export const useGetBattle = (battleId: number) => {
  const { userId } = useAuth()

  const fetcher = async () => {
    try {
      const response = await api.get(`/battle/${battleId}?userId=${userId}`)

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery({ queryKey: ["useGetBattle", battleId], queryFn: fetcher })
}

export const useGetOpenBattles = () => {
  const { userId } = useAuth()

  const fetcher = async () => {
    try {
      const response = await api.get<{ battles: Battle[] }>(
        `/battle/open/${userId}`
      )

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery({ queryKey: ["useGetOpenBattles"], queryFn: fetcher })
}

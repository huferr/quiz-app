import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/api"
import { xpToLevel } from "@/utils"
import { AuthContext } from "@/providers/AuthProvider"

export const useAuth = () => useContext(AuthContext)

export const useGetProfile = () => {
  const { userId } = useAuth()

  const fetcher = async () => {
    if (!userId) throw { message: "Missing userId" }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single()

    if (error) throw error

    const level = Math.floor(xpToLevel(data.correct_answers))

    return { ...data, level }
  }

  return useQuery({
    queryKey: ["useGetProfile", userId],
    queryFn: fetcher,
    staleTime: Infinity,
    refetchOnMount: "always",
    enabled: !!userId
  })
}

export const useGetUserBasicInfo = (userId: string) => {
  const fetcher = async () => {
    if (!userId) throw { message: "Missing userId" }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("id", userId)
      .limit(1)
      .single()

    if (error) throw error

    return data
  }

  return useQuery({
    queryKey: ["useGetUserBasicInfo", userId],
    queryFn: fetcher,
    enabled: !!userId
  })
}

export const useUpdateFreeCoins = () => {
  const { userId } = useAuth()
  const queryClient = useQueryClient()

  const fetcher = async ({
    value,
    type
  }: {
    value: number
    type: "add" | "remove"
  }) => {
    if (!userId) return { message: "Missing userId" }

    if (!value) return { message: "Missing value" }

    if (!type) return { message: "Missing type" }

    const { error } = await supabase.rpc("update_free_coins", {
      user_id: userId,
      type,
      value
    })

    if (error) throw { error }

    return { message: "Free coins updated" }
  }

  return useMutation({
    mutationKey: ["useUpdateFreeCoins", userId],
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetProfile", userId] })
    }
  })
}

export const useUpdatePaidCoins = () => {
  const { userId } = useAuth()
  const queryClient = useQueryClient()

  const fetcher = async ({
    value,
    type
  }: {
    value: number
    type: "add" | "remove"
  }) => {
    if (!userId) return { message: "Missing userId" }

    if (!value) return { message: "Missing value" }

    if (!type) return { message: "Missing type" }

    const { error } = await supabase.rpc("update_paid_coins", {
      user_id: userId,
      type,
      value
    })

    if (error) throw { error }

    return { message: "Paid coins updated" }
  }

  return useMutation({
    mutationKey: ["useUpdateFreeCoins", userId],
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetProfile", userId] })
    }
  })
}

export const useGetGlobalRanking = () => {
  const fetcher = async () => {
    const { data, error } = await supabase
      .from("global_user_ranking")
      .select("*")

    if (error) throw { error }

    return data
  }

  return useQuery({ queryKey: ["useGetGlobalRanking"], queryFn: fetcher })
}

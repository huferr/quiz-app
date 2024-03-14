import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "./user"
import { supabase } from "@/api"
import { Database } from "@/types/api"

export const useUpdateStreak = () => {
  const { userId } = useAuth()

  const fetcher = async ({ newStreak }: { newStreak: number }) => {
    if (!userId) return { message: "Missing userId" }

    const { error } = await supabase
      .from("profiles")
      .update({ streak: newStreak })
      .eq("id", userId)

    if (error) return { error }

    return { message: "Streak updated" }
  }

  return useMutation({
    mutationKey: ["useUpdateStreak", userId],
    mutationFn: fetcher
  })
}

export const useComputeUserAnswer = () => {
  const { userId } = useAuth()

  const fetcher = async ({
    value,
    type,
    questionType
  }: {
    value: number
    type: "wrong" | "correct"
    questionType?: string | null
  }) => {
    if (!userId) throw { message: "Missing userId" }

    if (type === "correct" && !questionType)
      throw { message: "Missing questionType" }

    // If type === wrong
    if (type === "wrong") {
      const { error } = await supabase.rpc("update_wrong_answer_amount", {
        user_id: userId,
        new_value: value
      })

      if (error) return { error }

      return {
        message: "Wrong answers amount updated"
      }
    }

    const functionName =
      `update_${questionType}_correct_answers` as keyof Database["public"]["Functions"]

    // If type === correct
    const { error } = await supabase.rpc(functionName, {
      user_id: userId,
      new_value: value
    })

    if (error) return { error }

    return {
      message: "Correct answers amount updated"
    }
  }

  return useMutation({
    mutationKey: ["useComputeUserAnswer", userId],
    mutationFn: fetcher
  })
}

export const useGetSingleQuestion = (type?: string) => {
  const fetcher = async () => {
    const baseCall = () => supabase.from("random_questions").select("*")

    const { data, error } = await (type
      ? baseCall().eq("type", type).limit(1).single()
      : baseCall().limit(1).single())

    if (error) throw { error }

    return { ...data }
  }

  return useQuery({
    queryKey: ["useGetSingleQuestion"],
    queryFn: fetcher,
    staleTime: Infinity,
    gcTime: 0
  })
}

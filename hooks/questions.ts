import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "./user"
import { supabase } from "@/api"

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
    type
  }: {
    value: number
    type: "wrong" | "correct"
  }) => {
    if (!userId) return { message: "Missing userId" }

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

    // If type === correct
    const { error } = await supabase.rpc("update_correct_answer_amount", {
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

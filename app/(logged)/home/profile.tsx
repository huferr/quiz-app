import { Typography, SafeView, LoadingScreen } from "@/components"
import { useGetProfile } from "@/hooks"
import { supabase } from "@/api"
import { Pressable } from "react-native"

export default function Profile() {
  const { data, isLoading } = useGetProfile()

  const correctAnswers = data?.correct_answers || 0
  const wrongAnswers = data?.wrong_answers || 0
  const streak = data?.streak || 0
  const badges = data?.badges || []
  const freeCoins = data?.free_coins || 0
  const paidCoins = data?.paid_coins || 0
  const points = data?.points || 0

  const calcRate = (correctAnswers / (correctAnswers + wrongAnswers)) * 100

  const rate = Number.isNaN(calcRate) ? 0 : calcRate.toFixed(2)

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      alert("Signed out!")
    }
    if (error) {
      alert(error.message)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeView paddingHorizontal={24}>
      <Typography>Profile</Typography>
      <Typography>Correct Answers: {correctAnswers}</Typography>
      <Typography>Wrong Answers: {wrongAnswers}</Typography>
      <Typography>Correct Answers Rate: {rate}</Typography>
      <Typography>Streak: {streak}</Typography>
      <Typography>Badges: {badges.map((badge) => `${badge} `)}</Typography>
      <Typography>Paid Coins: {paidCoins}</Typography>
      <Typography>Free Coins: {freeCoins}</Typography>
      <Typography>Points: {points}</Typography>

      <Pressable onPress={logout}>
        <Typography>Logout</Typography>
      </Pressable>
    </SafeView>
  )
}

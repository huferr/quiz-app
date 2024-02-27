import { Typography, SafeView, LoadingScreen } from "@/components"
import { useGetProfile } from "@/hooks"
import { PageHeader } from "@/components/PageHeader"
import styled from "styled-components/native"
import { Settings } from "lucide-react-native"
import { router } from "expo-router"

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

  const goToSettings = () => {
    router.push("/home/settings")
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeView>
      <PageHeader
        title="Meu Perfil"
        actionIcon={<Settings size="24px" color="#000" />}
        onPressAction={goToSettings}
      />
      <Page>
        <Typography>Correct Answers: {correctAnswers}</Typography>
        <Typography>Wrong Answers: {wrongAnswers}</Typography>
        <Typography>Correct Answers Rate: {rate}</Typography>
        <Typography>Streak: {streak}</Typography>
        <Typography>Badges: {badges.map((badge) => `${badge} `)}</Typography>
        <Typography>Paid Coins: {paidCoins}</Typography>
        <Typography>Free Coins: {freeCoins}</Typography>
        <Typography>Points: {points}</Typography>
      </Page>
    </SafeView>
  )
}

const Page = styled.View`
  padding: 0px 16px;
`

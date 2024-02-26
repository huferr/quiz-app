import { TouchableOpacity } from "react-native"
import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { useGetProfile } from "@/hooks"
import { PageHeader } from "@/components/PageHeader"

export default function MarathonOnboarding() {
  const { data } = useGetProfile()

  const streak = data?.streak || 0

  const onPressGoBack = () => {
    router.push("/home/play")
  }

  return (
    <SafeView>
      <PageHeader title="Maratona" onPressGoBack={onPressGoBack} />
      <Content>
        <TouchableOpacity onPress={() => router.push("/game/marathon")}>
          <Typography fontWeight="700" fontSize={24} textAlign="center">
            Play
          </Typography>
        </TouchableOpacity>
        <Typography
          fontWeight="700"
          fontSize={24}
          textAlign="center"
          marginTop={24}
        >
          Record: {streak}
        </Typography>
      </Content>
    </SafeView>
  )
}

const Content = styled.View`
  align-items: center;
  padding-top: 48px;
`

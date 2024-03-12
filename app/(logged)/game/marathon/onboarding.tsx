import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography } from "@/components"
import { useGetProfile } from "@/hooks"
import { PageHeader } from "@/components/PageHeader"
import { Info, Trophy } from "lucide-react-native"
import { Button } from "@/components/Button"

export default function MarathonOnboarding() {
  const { data } = useGetProfile()

  const streak = data?.streak || 0

  const onPressGoBack = () => {
    router.push("/home")
  }

  return (
    <SafeView>
      <PageHeader
        title="Maratona"
        onPressGoBack={onPressGoBack}
        actionIcon={<Info />}
        onPressAction={() => {}}
      />
      <Content>
        <Trophy size="48px" strokeWidth={1.5} />
        <Typography
          fontWeight="700"
          fontSize={24}
          textAlign="center"
          marginTop={24}
          marginBottom={24}
        >
          O seu recorde de respostas corretas é {streak}!
        </Typography>

        <Typography textAlign="center" marginTop={24}>
          Responda 10 questões seguidas para ganhar o emblema "Maratonista Bronze"
        </Typography>

        <ButtonContainer>
          <Button onPress={() => router.push("/game/marathon")}>
            <Typography fontWeight="600" color="#fff">
              Jogar
            </Typography>
          </Button>
        </ButtonContainer>
      </Content>
    </SafeView>
  )
}

const Content = styled.View`
  align-items: center;
  padding-top: 48px;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  flex: 1;
`

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 16px;
  width: 100%;
`

import { useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import styled from "styled-components/native"

import { SafeView, Typography, FullModal, PageHeader } from "@/components"
import {
  useComputeUserAnswer,
  useGetProfile,
  useGetSingleQuestion,
  useUpdatePaidCoins,
  useUpdateStreak
} from "@/hooks"
import { useTimer } from "@/utils"

import { AlarmClock } from "lucide-react-native"

export default function Marathon() {
  const { data, refetch, isLoading } = useGetSingleQuestion()
  const { refetch: refetchUserData, data: userData } = useGetProfile()
  const { mutateAsync: computeAnswer } = useComputeUserAnswer()
  const { mutateAsync: updateStreak } = useUpdateStreak()
  const { mutateAsync: updatePaidCoins } = useUpdatePaidCoins()

  const [selectedOption, setSelectedOption] = useState("")
  const [streak, setStreak] = useState(0)
  const [lose, setLose] = useState(false)

  const {
    clock,
    resetClock,
    pause: pauseClock
  } = useTimer(20, {
    onFinish: () => {
      resetClock()
      pauseClock()
      setLose(true)
    }
  })

  const question = data?.title

  const userCurrentStreak = userData?.streak || 0

  const userPaidCoins = userData?.paid_coins || 0

  const options = data
    ? [data?.opt_one, data?.opt_two, data?.opt_three, data?.opt_four]
    : []

  const answer = data?.answer

  const handleUpdateStreak = async (add?: boolean) => {
    // In the moment of calling this function (When user select an option, and it is CORRECT),
    // the streak state (React State) is not updated yet,
    // so we need to add 1 to the streak
    const addOne = add ? 1 : 0
    if (userCurrentStreak < streak + addOne) {
      await updateStreak(streak + addOne)
    }
  }

  const handleOnSelectOption = async (opt: string) => {
    setSelectedOption(opt)

    const correctOption = opt === answer

    if (correctOption) {
      setStreak((prev) => prev + 1)
      await computeAnswer({ type: "correct", value: 1 })

      setTimeout(() => {
        refetch().then(() => {
          setSelectedOption("")
          resetClock()
        })
      }, 100)

      await handleUpdateStreak(true)

      return
    }

    pauseClock()

    setTimeout(() => {
      setLose(true)
    }, 100)

    await computeAnswer({ type: "wrong", value: 1 })
    await handleUpdateStreak()
    await refetchUserData()
  }

  const handleViewAds = async () => {
    console.log("view ads")
  }

  return (
    <SafeView>
      <PageHeader
        centerElement={
          <CenterTitle>
            <AlarmClock size={28} />
            <Typography fontWeight="700" fontSize={24} lineHeight={32}>
              {isLoading ? 20 : clock}s
            </Typography>
          </CenterTitle>
        }
      />

      <QuestionContainer>
        <Typography
          fontWeight="600"
          fontSize={24}
          textAlign="center"
          marginBottom={72}
          marginTop={72}
        >
          {question}
        </Typography>
      </QuestionContainer>

      <Content>
        <OptionsContainer>
          {options.map((option) => {
            const isSelectedCorrect = selectedOption === answer

            return (
              <OptionButton
                key={option}
                activeOpacity={0.9}
                correctAnswer={option === answer}
                isSelectedCorrect={isSelectedCorrect}
                isSelectedOption={selectedOption === option}
                disabled={!!selectedOption}
                onPress={() => handleOnSelectOption(String(option))}
              >
                <Typography fontWeight="700" color="#FFF">
                  {option}
                </Typography>
              </OptionButton>
            )
          })}
        </OptionsContainer>
        <Text style={{ color: "#fff", paddingTop: 24 }}>Streak: {streak}</Text>
      </Content>

      <FullModal visible={lose} animationType="slide">
        <LoseModalContainer>
          <Typography>Você perdeu!</Typography>
          <TouchableOpacity
            onPress={async () => {
              setSelectedOption("")

              await handleViewAds().then(async () => {
                await refetch().then(() => {
                  resetClock()
                  setLose(false)
                })
              })
            }}
          >
            <Typography fontWeight="700">Ver Anuncio</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              setSelectedOption("")

              if (userPaidCoins < 200) return

              await updatePaidCoins({ type: "remove", value: 200 })

              await refetch().then(() => {
                resetClock()
              })
              setLose(false)
            }}
          >
            <Typography fontWeight="700">200 coins</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              refetch()
              router.push("/game/marathon/onboarding")
            }}
          >
            <Typography fontWeight="700">Sair</Typography>
          </TouchableOpacity>
        </LoseModalContainer>
      </FullModal>
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
  padding-left: 16px;
  padding-right: 16px;
`

const OptionsContainer = styled.View`
  width: 100%;
  gap: 24px;
`

const OptionButton = styled.TouchableOpacity<{
  isSelectedCorrect: boolean | undefined
  correctAnswer: boolean
  isSelectedOption: boolean
}>`
  padding: 10px 48px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(p) => {
    if (!p.disabled) return "#2C72FA"

    if (p.correctAnswer || (p.isSelectedCorrect && p.isSelectedOption))
      return "#48B117"

    if (!p.isSelectedCorrect && p.isSelectedOption) return "#c53030"

    return "#fff"
  }};
  align-items: center;
`

const LoseModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 40px;
  align-items: center;
`

const CenterTitle = styled.View`
  width: 78px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const QuestionContainer = styled.View`
  padding: 0px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #d2d2d2;
  margin: 0px 0px 24px;
`

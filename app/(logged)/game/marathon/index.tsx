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

import {
  AlarmClock,
  Banknote,
  CircleDollarSign,
  DraftingCompass,
  Dumbbell,
  FastForward,
  Hourglass,
  Scissors
} from "lucide-react-native"

const getIconByQuestionType = (type: "math" | "history" | "sports") => {
  return (
    {
      math: <DraftingCompass />,
      history: <Hourglass />,
      sports: <Dumbbell />
    }[type] || null
  )
}

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
      // setLose(true)
    }
  })

  const question = data?.title

  const userCurrentStreak = userData?.streak || 0

  const userPaidCoins = userData?.paid_coins || 0

  const userFreeCoins = userData?.free_coins || 0

  const options = data
    ? [data?.opt_one, data?.opt_two, data?.opt_three, data?.opt_four]
    : []

  const answer = data?.answer

  const type = data?.type

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
    }, 500)

    await computeAnswer({ type: "wrong", value: 1 })
    await handleUpdateStreak()
    await refetchUserData()
  }

  const handleViewAds = async () => {
    console.log("view ads")
  }

  return (
    <SafeView>
      <HeaderContainer>
        <ClockContainer>
          <AlarmClock size={24} />
          <Typography fontWeight="600" fontSize={18} lineHeight={32}>
            {isLoading ? 20 : clock}s
          </Typography>
        </ClockContainer>
        <StreakContainer>
          <Typography fontWeight="600" fontSize={18} lineHeight={24}>
            {streak}
          </Typography>
        </StreakContainer>
        <TypeContainer>{getIconByQuestionType(data?.type)}</TypeContainer>
      </HeaderContainer>

      <Subheader>
        <CoinOuterContainer>
        <CoinContainer color="#2C9D04">
          <CircleDollarSign color="#2C9D04" size="20px" />
          <Typography
            fontWeight="600"
            fontSize={16}
            lineHeight={20}
            color="#2C9D04"
          >
            {userFreeCoins}
          </Typography>
        </CoinContainer>
        <CoinContainer color="#E807DF">
          <Banknote color="#E807DF" size="20px" />
          <Typography
            fontWeight="600"
            fontSize={16}
            lineHeight={20}
            color="#E807DF"
          >
            {userPaidCoins}
          </Typography>
        </CoinContainer>
        </CoinOuterContainer>
      
      </Subheader>

      <Content>
        <QuestionContainer>
          <Typography fontWeight="600" fontSize={24} textAlign="center">
            {question}
          </Typography>
        </QuestionContainer>

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

        <PowersContainer>
          <PowerItem color="#2C9D04">
            <Scissors size="32px" color="#2C9D04" />
            <CostContainer>
              <CircleDollarSign color="#2C9D04" size="20px" />
              <Typography
                fontWeight="600"
                fontSize={16}
                lineHeight={20}
                color="#2C9D04"
              >
                200
              </Typography>
            </CostContainer>
          </PowerItem>
          <PowerItem color="#E807DF">
            <FastForward size="32px" color="#E807DF" />

            <CostContainer>
              <Banknote color="#E807DF" size="20px" />
              <Typography
                fontWeight="600"
                fontSize={16}
                lineHeight={20}
                color="#E807DF"
              >
                20
              </Typography>
            </CostContainer>
          </PowerItem>
        </PowersContainer>
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

const Subheader = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 24px 16px;
  gap: 24px;
  justify-content: center;
`

const Content = styled.View`
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`

const OptionsContainer = styled.View`
  width: 100%;
  gap: 16px;
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

    return "#2C72FA50"
  }};
  align-items: center;
`

const LoseModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 40px;
  align-items: center;
`

const QuestionCardEffectSmaller = styled.View`
  width: 90%;
  top: -16px;
  height: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-width: 0px;
  border: 2px solid #d2d2d2;
  border-top-width: 4px;

  z-index: 1;
`

const QuestionCardEffect = styled.View`
  width: 100%;
  top: -10px;
  height: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: 2px solid #d2d2d2;
  border-bottom-width: 0px;
  border-top-width: 4px;
  z-index: 2;
`

const QuestionContainer = styled.View`
  padding: 0px 16px;
  width: 100%;
  margin-bottom: 48px;
  border-width: 2px;
  border-color: #d2d2d2;
  height: 190px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`

const HeaderContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #d2d2d2;
`

const ClockContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 80px;
  position: absolute;
  left: 16px;
`

const StreakContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const CoinOuterContainer = styled.View`
  flex-direction: row;
  gap: 24px;
  border: 1px solid #d2d2d2;
  border-radius: 24px;
  padding: 8px 12px;
`

const CoinContainer = styled.View<{ color: string }>`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: center;
`

const TypeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  position: absolute;
  right: 16px;
`

const PowersContainer = styled.View`
  flex-direction: row;
  margin-top: 48px;
  gap: 24px;
`

const PowerItem = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })<{
  color: string
}>`
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${(p) => p.color + '20'};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px solid ${(p) => p.color + '40'};
  gap: 8px;
  width: 140px;
`

const CostContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`

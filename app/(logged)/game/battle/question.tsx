import { TouchableOpacity } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import styled from "styled-components/native"

import { FullModal, SafeView, Typography } from "@/components"
import { isPlatform } from "@/utils"
import {
  useComputeUserAnswer,
  useGetBattle,
  useGetSingleQuestion,
  useUpdateBattle
} from "@/hooks"

import { useTimer } from "@/utils"
import { useEffect, useState } from "react"

export default function QuestionScreen() {
  const { data: question, isLoading } = useGetSingleQuestion()
  const { mutateAsync: computeAnswer } = useComputeUserAnswer()
  const { mutateAsync: handleUpdateBattle } = useUpdateBattle()
  const { id: battleId } = useLocalSearchParams()
  const { refetch: refetchBattle } = useGetBattle(Number(battleId))

  const { clock, pause: pauseClock } = useTimer(20, {
    onFinish: async () => {
      await handleOnLose()
    }
  })
  const [selectedOption, setSelectedOption] = useState("")
  const [openReview, setOpenReview] = useState(false)
  const [lose, setLose] = useState(false)

  const title = question?.title
  const answer = question?.answer

  const options = question
    ? [
        question?.opt_one,
        question?.opt_two,
        question?.opt_three,
        question?.opt_four
      ]
    : []

  const handleOnLose = async () => {
    setLose(true)
    setTimeout(() => setOpenReview(true), 250)

    await handleUpdateBattle({
      battleId: Number(battleId),
      value: 0,
      changeOwner: true
    }).then(async () => {
      await refetchBattle()
    })

    await computeAnswer({ type: "wrong", value: 1 })
  }
  const handleOnSelectOption = async (opt: string) => {
    setSelectedOption(opt)
    pauseClock()

    const correctOption = opt === answer

    if (correctOption) {
      setLose(false)
      setTimeout(() => setOpenReview(true), 250)

      await handleUpdateBattle({
        battleId: Number(battleId),
        value: 1,
        changeOwner: false
      }).then(async () => {
        await refetchBattle()
      })

      await computeAnswer({ type: "correct", value: 1 })

      return
    }

    await handleOnLose()
  }

  return (
    <SafeView
      paddingHorizontal={isPlatform("android") ? 16 : 24}
      backgroundColor="#292929"
    >
      <Header>
        <Typography color="#fff">Question</Typography>

        {!isLoading && (
          <Typography fontWeight="700" fontSize={24} color="#fff">
            {clock}
          </Typography>
        )}
      </Header>
      <Content>
        <Typography color="#fff" fontSize={24} marginBottom={24}>
          {title}
        </Typography>
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
                <Typography fontWeight="700">{option}</Typography>
              </OptionButton>
            )
          })}
        </OptionsContainer>
      </Content>

      <FullModal visible={openReview} animationType="slide">
        <ReviewContainer>
          <Typography color="#fff">
            {lose ? "Você perdeu!" : "Parabéns"}
          </Typography>

          <TouchableOpacity
            onPress={() => {
              router.push(`/game/battle/${battleId}`)
            }}
          >
            <Typography fontWeight="700" color="#fff">
              Continuar
            </Typography>
          </TouchableOpacity>
        </ReviewContainer>
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
  padding-top: 48px;
`

const ReviewContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 40px;
  align-items: center;
`

const OptionsContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  gap: 24px;
`

const OptionButton = styled.TouchableOpacity<{
  isSelectedCorrect: boolean | undefined
  correctAnswer: boolean
  isSelectedOption: boolean
}>`
  padding: 6px 48px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(p) => {
    if (!p.disabled) return "#fff"

    if (p.correctAnswer || (p.isSelectedCorrect && p.isSelectedOption))
      return "#48B117"

    if (!p.isSelectedCorrect && p.isSelectedOption) return "#c53030"

    return "#fff"
  }};
  align-items: center;
`

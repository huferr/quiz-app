import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { SafeView, Typography, FullModal } from "@/components";
import { useGetSingleQuestion, useTimer } from "@/hooks";
import { isPlatform } from "@/utils";

export default function Marathon() {
  const { data, refetch, isLoading } = useGetSingleQuestion();

  const [selectedOption, setSelectedOption] = useState("");
  const [streak, setStreak] = useState(0);
  const [lose, setLose] = useState(false);

  const { clock, resetClock, pause } = useTimer(20, {
    onFinish: () => {
      resetClock();
      pause();
      setLose(true);
    },
  });

  const question = data?.title;

  const options = data
    ? [data?.opt_one, data?.opt_two, data?.opt_three, data?.opt_four]
    : [];

  const answer = data?.answer;

  const handleOnSelectOption = (opt: string) => {
    setSelectedOption(opt);

    const correctOption = opt === answer;

    if (correctOption) {
      setStreak((prev) => prev + 1);

      setTimeout(() => {
        refetch().then(() => {
          setSelectedOption("");
          resetClock();
        });
      }, 500);

      return;
    }

    setStreak(0);
    pause();

    setTimeout(() => {
      setLose(true);
    }, 250);
  };

  return (
    <SafeView
      paddingHorizontal={isPlatform("android") ? 16 : 24}
      backgroundColor="#292929"
    >
      <Header>
        <TouchableOpacity onPress={() => router.push("/home/play")}>
          <Typography fontWeight="700" color="#fff">
            Voltar
          </Typography>
        </TouchableOpacity>

        {!isLoading && (
          <Typography fontWeight="700" fontSize={24} color="#fff">
            {clock}
          </Typography>
        )}

        <Typography color="#fff">Maratona</Typography>
      </Header>

      <Content>
        <Typography
          fontWeight="700"
          fontSize={24}
          color="#fff"
          textAlign="center"
        >
          {question}
        </Typography>

        <OptionsContainer>
          {options.map((option) => {
            const isSelectedCorrect = selectedOption === answer;

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
            );
          })}
        </OptionsContainer>
        <Text style={{ color: "#fff", paddingTop: 24 }}>Streak: {streak}</Text>
      </Content>

      <FullModal visible={lose} animationType="slide">
        <LoseModalContainer>
          <Typography color="#fff">Você perdeu!</Typography>
          <TouchableOpacity
            onPress={() => {
              setSelectedOption("");

              refetch().then(() => {
                resetClock();
              });
              setLose(false);
            }}
          >
            <Typography fontWeight="700" color="#fff">
              Tentar Novamente
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/game/marathon/onboarding");
            }}
          >
            <Typography fontWeight="700" color="#fff">
              Sair
            </Typography>
          </TouchableOpacity>
        </LoseModalContainer>
      </FullModal>
    </SafeView>
  );
}

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.View`
  align-items: center;
  padding-top: 48px;
`;

const OptionsContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  gap: 24px;
`;

const OptionButton = styled.TouchableOpacity<{
  isSelectedCorrect: boolean | undefined;
  correctAnswer: boolean;
  isSelectedOption: boolean;
}>`
  padding: 6px 48px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(p) => {
    if (!p.disabled) return "#fff";

    if (p.correctAnswer || (p.isSelectedCorrect && p.isSelectedOption))
      return "#48B117";

    if (!p.isSelectedCorrect && p.isSelectedOption) return "#c53030";

    return "#fff";
  }};
  align-items: center;
`;

const LoseModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 40px;
  align-items: center;
`;
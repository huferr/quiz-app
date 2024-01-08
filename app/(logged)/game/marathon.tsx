import { TouchableOpacity } from "react-native";
import { SafeView, Typography } from "../../../components";
import { router } from "expo-router";
import { useGetSingleQuestion } from "../../../hooks";
import styled from "styled-components/native";
import { isPlatform } from "../../../utils";
import { useState } from "react";

export default function Play() {
  const { data, refetch } = useGetSingleQuestion();
  const [selectedOption, setSelectedOption] = useState("");

  const question = data?.title;

  const options = data
    ? [data?.opt_one, data?.opt_two, data?.opt_three, data?.opt_four]
    : [];

  const answer = data?.answer;

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
        <Typography color="#fff">Modo Maratona</Typography>
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
                activeOpacity={0.8}
                correctAnswer={option === answer}
                isSelectedCorrect={isSelectedCorrect}
                isSelectedOption={selectedOption === option}
                disabled={!!selectedOption}
                onPress={() => {
                  setSelectedOption(String(option));
                  setTimeout(() => {
                    refetch().then(() => {
                      setSelectedOption("");
                    });
                  }, 1000);
                }}
              >
                <Typography fontWeight="700">{option}</Typography>
              </OptionButton>
            );
          })}
        </OptionsContainer>
      </Content>
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

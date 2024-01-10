import React from "react";
import styled from "styled-components/native";
import { isPlatform } from "@/utils";

interface Props {
  children: React.ReactNode;
  paddingHorizontal?: number;
  backgroundColor?: string;
}

export function SafeView({ children, ...props }: Props) {
  return (
    <SafeContainer {...props}>
      <Container {...props}>{children}</Container>
    </SafeContainer>
  );
}

const SafeContainer = styled.SafeAreaView<Omit<Props, "children">>`
  padding-top: ${isPlatform("android") ? 50 : 0}px;
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "#fff"};
`;

const Container = styled.View<Omit<Props, "children">>`
  padding: 0px ${({ paddingHorizontal }) => paddingHorizontal ?? 0}px;
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "#fff"};
`;

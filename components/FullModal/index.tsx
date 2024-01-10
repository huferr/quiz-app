import React from "react";
import { ModalBaseProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ModalBaseProps {
  children: React.ReactNode;
  paddingHorizontal?: number;
}

export function FullModal({ children, ...props }: Props) {
  return (
    <ModalContainer presentationStyle="overFullScreen" transparent {...props}>
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.Modal<Omit<Props, "children">>`
  flex: 1;
`;

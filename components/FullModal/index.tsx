import React from "react";
import styled from "styled-components/native";
import { ModalBaseProps } from "react-native";

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

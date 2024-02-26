import { GeneralProps } from "@/types"
import React from "react"
import styled from "styled-components/native"
import { ChevronLeft } from "lucide-react-native"
import { Typography } from "../Typography"

interface Props extends GeneralProps {
  onPressGoBack?: () => void
  onPressAction?: () => void
  actionIcon?: React.ReactNode
  title?: string
}

export function PageHeader({ ...props }: Props) {
  return (
    <Container {...props}>
      {props.onPressGoBack && (
        <LeftButtonContainer onPress={props.onPressGoBack}>
          <ChevronLeft size="28px" color="#000" />
        </LeftButtonContainer>
      )}

      <TitleContainer>
        <Typography fontWeight="600">{props.title}</Typography>
      </TitleContainer>

      {props.onPressAction && (
        <RightButtonContainer onPress={props.onPressAction}>
          {props.actionIcon}
        </RightButtonContainer>
      )}
    </Container>
  )
}

const Container = styled.View<Props>`
  width: 100%;
  height: 46px;
  border-bottom-width: 1px;
  border-bottom-color: #d2d2d2;
  margin-bottom: ${(props) => props.mb || 0}px;
  margin-top: ${(props) => props.mt || 0}px;
  margin-left: ${(props) => props.ml || 0}px;
  margin-right: ${(props) => props.mb || 0}px;
  align-items: center;
  justify-content: center;
`

export const LeftButtonContainer = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 0;
  height: 46px;
  align-items: center;
  justify-content: center;
`
export const RightButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 0;
  height: 40px;
  align-items: center;
  justify-content: center;
`

export const TitleContainer = styled.View``

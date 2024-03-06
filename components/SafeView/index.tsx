import React from "react"
import styled from "styled-components/native"
import { isPlatform } from "@/utils"
import { Typography } from "../Typography"
import { SafeAreaView } from "react-native-safe-area-context"

interface Props {
  children: React.ReactNode
  paddingHorizontal?: number
  backgroundColor?: string
  isLoading?: boolean
}

export function SafeView({ children, isLoading, ...props }: Props) {
  return (
    <SafeContainer {...props}>
      <Container {...props}>
        {isLoading ? (
          <LoadingContainer>
            <Typography color="#fff">Carregando...</Typography>
          </LoadingContainer>
        ) : (
          children
        )}
      </Container>
    </SafeContainer>
  )
}

const SafeContainer = styled(SafeAreaView)<Omit<Props, "children">>`
  padding-top: ${isPlatform("android") ? 50 : 0}px;
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "#F0F4F8"};
`

const Container = styled.View<Omit<Props, "children">>`
  padding: 0px ${({ paddingHorizontal }) => paddingHorizontal ?? 0}px;
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "#F0F4F8"};
`

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

import React from "react"
import { TouchableOpacityProps } from "react-native"
import styled from "styled-components/native"

interface Props extends TouchableOpacityProps {
  children: React.ReactNode
  marginBottom?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
  type?: "primary" | "secondary"
}

export function Button({ children, type = "primary", ...props }: Props) {
  return (
    <Container {...props} type={type} activeOpacity={0.8}>
      {children}
    </Container>
  )
}

const Container = styled.TouchableOpacity<Props>`
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
  padding: 12px 16px;
  background-color: ${(props) =>
    props.type === "primary" ? "#2c72fa" : "#060C18"};
  border-radius: 8px;
  align-items: center;
  width: 100%;
`

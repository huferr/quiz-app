import React from "react"
import { TextInputProps } from "react-native"
import styled from "styled-components/native"
import { Typography } from "../Typography"

interface Props extends TextInputProps {
  marginBottom?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
  label?: string
}

export function TextField({
  label,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  ...props
}: Props) {
  return (
    <Container
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
    >
      {label && <Typography marginBottom={8}>{label}</Typography>}
      <Input {...props} />
    </Container>
  )
}

const Container = styled.View<Props>`
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
`

const Input = styled.TextInput<Props>`
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 16px;
`

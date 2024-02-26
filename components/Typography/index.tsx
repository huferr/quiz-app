import React from "react"
import styled from "styled-components/native"

interface Props {
  children: React.ReactNode
  fontSize?: number
  color?: string
  fontWeight?: string
  textAlign?: string
  lineHeight?: number
  marginBottom?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
}

export function Typography({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>
}

const Container = styled.Text<Omit<Props, "children">>`
  font-size: ${(props) => props.fontSize || 16}px;
  color: ${(props) => props.color || "#000"};
  font-weight: ${(props) => props.fontWeight || "400"};
  text-align: ${(props) => props.textAlign || "left"};
  line-height: ${(props) => props.lineHeight || 24}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
`

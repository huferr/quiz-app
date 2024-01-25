import styled from "styled-components/native"

import { Typography } from "../Typography"
import { FullModal } from "../FullModal"

export function LoadingScreen() {
  return (
    <FullModal animationType="none">
      <Container>
        <Typography color="#fff">Carregando...</Typography>
      </Container>
    </FullModal>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
`

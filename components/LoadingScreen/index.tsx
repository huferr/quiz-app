import styled from "styled-components/native"

import { CircleDashed } from "lucide-react-native"
import { Animated, Easing } from "react-native"
import { useEffect, useRef } from "react"

export function LoadingScreen() {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ).start()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  })

  return (
    <Container>
      <SpinnerContainer
        style={{
          transform: [{ rotate: spin }]
        }}
      >
        <CircleDashed size="48px" />
      </SpinnerContainer>
    </Container>
  )
}

const SpinnerContainer = styled(Animated.View)`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`

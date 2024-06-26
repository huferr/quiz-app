import { Battle, User } from "@/types"
import { useEffect, useRef, useState } from "react"
import { Platform } from "react-native"

export const isPlatform = (os: typeof Platform.OS) => Platform.OS === os

export const userIsOpponent = (battle: Battle, userData: User) =>
  battle?.opponent_id === userData?.id

export function useInterval(
  callback: () => void,
  delay: number | null,
  stop?: boolean
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) {
      return
    }
    const id = setInterval(() => savedCallback.current(), delay)

    if (stop) {
      clearInterval(id)
    }
    return () => clearInterval(id)
  }, [delay, stop])
}

export function useTimer(
  time: number,
  options?: { onFinish?: () => void; enabled?: boolean }
) {
  const [clock, setClock] = useState(time || 60)
  const [stop, setStop] = useState(false)

  useInterval(
    () => {
      setClock((secounds) => (secounds > 0 ? secounds - 1 : 0))
    },
    1000,
    (!options?.enabled && options?.enabled !== undefined) || stop
  )

  useEffect(() => {
    if (clock === 0) {
      options?.onFinish?.()
    }
  }, [clock])

  const resetClock = (newTime = time) => {
    setClock(newTime)
    setStop(false)
  }

  const pause = () => setStop(true)

  return { clock, resetClock, pause }
}

export const getCorrectAnswersRate = (
  correctAnswers?: number,
  wrongAnswers?: number
) => {
  if (!correctAnswers || !wrongAnswers) {
    return 0
  }

  const calcRate = (correctAnswers / (correctAnswers + wrongAnswers)) * 100

  const rate = Number.isNaN(calcRate) ? 0 : calcRate.toFixed(1)

  return rate
}

export const xpToLevel = (xp: number) => {
  const constant = 0.5

  return constant * Math.sqrt(xp)
}

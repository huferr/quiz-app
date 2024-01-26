import { Battle, User } from "@/types"
import { Platform } from "react-native"

export const isPlatform = (os: typeof Platform.OS) => Platform.OS === os

export const userIsOpponent = (battle: Battle, userData: User) =>
  battle.opponent_id === userData?.id

import { useGetProfile, useGetUserBasicInfo } from "@/hooks"
import { Battle } from "@/types"
import styled from "styled-components/native"
import { Typography } from "../Typography"
import { userIsOpponent } from "@/utils"
import { router } from "expo-router"

interface Props {
  battle: Battle
}

export const BattleCard = ({ battle }: Props) => {
  const { data: userData } = useGetProfile()

  const opponentId = userIsOpponent(battle, userData!)
    ? battle.user_id
    : battle.opponent_id

  const { data: opponentInfo } = useGetUserBasicInfo(opponentId!)

  const myScore = (battle: Battle) =>
    userIsOpponent(battle, userData!) ? battle.opponent_score : battle.my_score

  const opponentScore = (battle: Battle) =>
    userIsOpponent(battle, userData!) ? battle.my_score : battle.opponent_score

  const won = battle.winner_id && battle.winner_id === userData?.id
  const lost = battle.winner_id && battle.winner_id !== userData?.id

  const subtitle = (() => {
    if (won) return "Você venceu!"
    if (lost) return "Você perdeu!"
    if (battle.round_owner === userData?.id) return "Sua vez de jogar"
    return "Vez do oponente"
  })()

  const subtitleColor = (() => {
    if (won) return "#4CAF50"
    if (lost) return "#F44336"
    if (battle.round_owner === userData?.id) return "#2C72FA"
    return "#9E9E9E"
  })()

  return (
    <BattleItem
      key={battle.id}
      onPress={() => {
        if (won || lost || battle.round_owner !== userData?.id) return

        router.push({
          pathname: `game/battle/${battle.id}`
        })
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 10
      }}
    >
      <BattleItemLeft>
        <Typography fontWeight="700" color="#636363">
          {opponentInfo?.username}
        </Typography>
        <Typography color={subtitleColor} fontSize={14}>
          {subtitle}
        </Typography>
      </BattleItemLeft>
      <ScoreContainer>
        <Typography fontWeight="600">{myScore(battle)}</Typography>
        <Typography fontWeight="500">:</Typography>
        <Typography fontWeight="600">{opponentScore(battle)}</Typography>
      </ScoreContainer>
    </BattleItem>
  )
}

const BattleItem = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #d2d2d2;
  border-radius: 12px;
  background-color: #fff;
  padding: 12px 16px;
`

const ScoreContainer = styled.View`
  flex-direction: row;
  padding: 2px 12px;
  background-color: #e7e7e7;
  gap: 8px;
  border-radius: 16px;
`

const BattleItemLeft = styled.View`
  gap: 2px;
`

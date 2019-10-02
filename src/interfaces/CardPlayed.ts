import { ICard } from './Card'

export interface ICardPlayed {
  card: ICard
  board: ICard[]
  hand: ICard[]
  mana: number
}

export interface IOpponentCardPlayed {
  card: ICard
  board: ICard[]
  hand: number
  opponentMana: number
}
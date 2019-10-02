import { ICard } from './Card'

export interface ICardDrawed {
  drawedCards: ICard[]
  hand: ICard[]
  deck: ICard[]
}

export interface IOpponentCardDrawed {
  drawedCards: number
  hand: number
  deck: number
}
import { ICard } from './Card'

export interface IOpponent {
  life: number
  maxMana: number
  mana: number
  deck: number
  hand: number
  board: ICard[]
}
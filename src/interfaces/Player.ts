import { ICard } from './Card'

export interface IPlayer {
  life: number
  maxMana: number
  mana: number
  deck: ICard[]
  hand: ICard[]
  board: ICard[]
}
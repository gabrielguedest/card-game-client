import { IPlayer } from "./Player"
import { IOpponent } from "./Opponent"

export interface INewMatch {
  actor: string
  player: IPlayer
  opponent: IOpponent
}
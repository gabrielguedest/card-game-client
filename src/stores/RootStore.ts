import { MatchStore } from './MatchStore';
import { PlayerStore } from './PlayerStore'
import { OpponentStore } from './OpponentStore'

export class RootStore {
  playerStore: PlayerStore
  opponentStore: OpponentStore
  matchStore: MatchStore

  constructor() {
    this.playerStore = new PlayerStore()
    this.opponentStore = new OpponentStore()
    this.matchStore = new MatchStore(this.playerStore, this.opponentStore)
  }
}
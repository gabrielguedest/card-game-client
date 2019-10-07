import { MatchStore } from './MatchStore';
import { PlayerStore } from './PlayerStore'
import { OpponentStore } from './OpponentStore'
import { createContext } from 'react';

export class RootStore {
  static instance: RootStore

  playerStore: PlayerStore
  opponentStore: OpponentStore
  matchStore: MatchStore

  private constructor() {
    this.playerStore = new PlayerStore()
    this.opponentStore = new OpponentStore()
    this.matchStore = new MatchStore(this.playerStore, this.opponentStore)
  }

  static getInstance() {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore()
    }

    return RootStore.instance
  }
}

export const rootStore = RootStore.getInstance()
export default createContext(RootStore.getInstance())
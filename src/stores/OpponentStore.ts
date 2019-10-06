import { ICard } from './../interfaces/Card'
import { observable } from "mobx"
import { IOpponent } from '../interfaces/Opponent'
import { IOpponentCardPlayed } from '../interfaces/CardPlayed'

export class OpponentStore {
  @observable
  life: number = 0

  @observable
  maxMana: number = 0

  @observable
  mana: number = 0

  @observable
  deck: number = 0

  @observable
  hand: number = 0

  @observable
  board: ICard[] = []

  @observable
  selectedCard: ICard | null = null

  initOpponent(opponent: IOpponent) {
    this.life = opponent.life
    this.maxMana = opponent.maxMana
    this.mana = opponent.mana
    this.deck = opponent.deck
    this.hand = opponent.hand
  }

  setSelectedCard(card: ICard | null) {
    this.selectedCard = card
  }

  onCardPlayed(data: IOpponentCardPlayed) {
    this.board = data.board
    this.hand = data.hand
    this.mana = data.opponentMana
  }
}
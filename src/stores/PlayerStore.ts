import { ICardPlayed } from './../interfaces/CardPlayed';
import { ICard } from './../interfaces/Card'
import { observable } from "mobx"
import { IPlayer } from '../interfaces/Player'

export class PlayerStore {
  @observable
  life: number = 0

  @observable
  maxMana: number = 0

  @observable
  mana: number = 0

  @observable
  deck: ICard[] = []

  @observable
  hand: ICard[] = []

  @observable
  board: ICard[] = []

  @observable
  inactiveCards: ICard[] = []

  @observable
  selectedCard: ICard | null = null

  initPlayer(player: IPlayer) {
    this.life = player.life
    this.maxMana = player.maxMana
    this.mana = player.mana
    this.deck = player.deck
    this.hand = player.hand
  }

  setSelectedCard(card: ICard | null) {
    this.selectedCard = card
  }

  addHandCards(cards: ICard[]) {
    cards.forEach((card: ICard) => this.hand.push(card))
  }

  onCardPlayed(data: ICardPlayed) {
    this.board = data.board
    this.hand = data.hand
    this.mana = data.mana
    this.inactiveCards.push(data.card)
  }
}
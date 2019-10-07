import { ICardPlayed } from './../interfaces/CardPlayed';
import { ICard } from './../interfaces/Card'
import { observable } from "mobx"
import { IPlayer } from '../interfaces/Player'
import SocketService, { SocketEvents } from '../SocketService';

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

  setSelectedCard(card: ICard | null, isPlayerTurn: boolean) {
    if (!card) {
      this.selectedCard = null
    }

    const hasAlreadyAttacked = card && this.hasAlreadyAttacked(card)

    if (isPlayerTurn && !hasAlreadyAttacked && card) {
      this.selectedCard = card
      SocketService.emit(SocketEvents.SELECTED_CARD, card)
    }
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

  hasAlreadyAttacked(card: ICard) {
    return this.inactiveCards.find(c => c.id === card.id)
  }

  canPlay(card: ICard, isPlayerTurn: boolean) {
    const hasMana = this.mana >= card.mana

    return (isPlayerTurn && hasMana)
  }

  playCard(card: ICard, isPlayerTurn: boolean) {
    if (isPlayerTurn) {
      SocketService.emit(SocketEvents.PLAY_CARD, card)
    }
  }

  canAttack(card: ICard, isPlayerTurn: boolean) {
    const hasAlreadyAttacked = this.hasAlreadyAttacked(card)

    return (isPlayerTurn && !hasAlreadyAttacked)
  }

  attackCard(card: ICard, isPlayerTurn: boolean) {
    if (!this.selectedCard) {
      return
    }

    const hasAlreadyAttacked = this.hasAlreadyAttacked(card)
    
    if (isPlayerTurn && this.selectedCard && !hasAlreadyAttacked) {
      SocketService.emit(SocketEvents.ATTACK_CARD, {
        attacker: this.selectedCard,
        attacked: card,
      })

      this.inactiveCards.push(this.selectedCard!)
      this.setSelectedCard(null, isPlayerTurn)
    }
  }

  endTurn() {
    this.setSelectedCard(null, false)
    SocketService.emit(SocketEvents.END_TURN)
  }
}
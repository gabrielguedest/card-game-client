import { ICardPlayed, IOpponentCardPlayed } from './../interfaces/CardPlayed';
import { ICardDrawed, IOpponentCardDrawed } from './../interfaces/CardDrawed'
import { ITurn } from './../interfaces/Turn'
import { ICard } from './../interfaces/Card'
import { INewMatch } from './../interfaces/NewMatch'
import { PlayerStore } from "./PlayerStore"
import { OpponentStore } from "./OpponentStore"
import { observable, computed } from "mobx"
import SocketService, { SocketEvents } from '../SocketService'

export class MatchStore {
  playerStore: PlayerStore
  opponentStore: OpponentStore

  @observable
  hasActiveGame: boolean = false

  @observable
  actualPlayer: string = ''

  constructor(playerStore: PlayerStore, opponentStore: OpponentStore) {
    this.playerStore = playerStore
    this.opponentStore = opponentStore
  }

  newMatch(data: INewMatch) {
    this.playerStore.initPlayer(data.player)  
    this.opponentStore.initOpponent(data.opponent)
    this.hasActiveGame = true
    this.actualPlayer = data.actor
  }

  startGame() {
    if (this.isPlayerTurn) {
      SocketService.emit(SocketEvents.DRAW_CARD)
    }
  }

  playerTurn(data: ITurn) {
    this.actualPlayer = data.actor
    this.playerStore.mana = data.mana
    this.playerStore.inactiveCards = []

    this.opponentStore.mana = data.opponentMana
    this.opponentStore.setSelectedCard(null)

    SocketService.emit(SocketEvents.DRAW_CARD)
  }

  opponentTurn(data: ITurn) {
    this.actualPlayer = data.actor
    this.opponentStore.mana = data.opponentMana

    this.playerStore.mana = data.mana
    this.playerStore.setSelectedCard(null)
  }

  cardDrawed(data: ICardDrawed) {
    this.playerStore.addHandCards(data.drawedCards)
    this.playerStore.deck = data.deck
  }

  opponentCardDrawed(data: IOpponentCardDrawed) {
    this.opponentStore.hand = data.hand
    this.opponentStore.deck = data.deck
  }

  playerCard(card: ICard) {
    if (this.isPlayerTurn) {
      SocketService.emit(SocketEvents.PLAY_CARD, card)
    }
  }

  cardPlayed(data: ICardPlayed) {
    this.playerStore.onCardPlayed(data)
  }

  opponentCardPlayed(data: IOpponentCardPlayed) {
    this.opponentStore.onCardPlayed(data)
  }

  @computed
  get isPlayerTurn() {
    return SocketService.socket.id === this.actualPlayer
  }
}
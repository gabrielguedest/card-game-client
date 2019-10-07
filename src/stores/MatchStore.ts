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
  player: PlayerStore
  opponent: OpponentStore

  @observable
  hasActiveGame: boolean = false

  @observable
  actualPlayer: string = ''

  @observable
  boardOnAttackFocus: boolean = false

  constructor(playerStore: PlayerStore, opponentStore: OpponentStore) {
    this.player = playerStore
    this.opponent = opponentStore
  }

  @computed
  get isPlayerTurn() {
    return SocketService.socket.id === this.actualPlayer
  }

  newMatch(data: INewMatch) {
    this.player.initPlayer(data.player)  
    this.opponent.initOpponent(data.opponent)
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
    this.player.mana = data.mana
    this.player.inactiveCards = []

    this.opponent.mana = data.opponentMana
    this.opponent.setSelectedCard(null)

    SocketService.emit(SocketEvents.DRAW_CARD)
  }

  opponentTurn(data: ITurn) {
    this.actualPlayer = data.actor
    this.opponent.mana = data.opponentMana

    this.player.mana = data.mana
    this.player.setSelectedCard(null, this.isPlayerTurn)
  }

  cardDrawed(data: ICardDrawed) {
    this.player.addHandCards(data.drawedCards)
    this.player.deck = data.deck
  }

  opponentCardDrawed(data: IOpponentCardDrawed) {
    this.opponent.hand = data.hand
    this.opponent.deck = data.deck
  }

  cardPlayed(data: ICardPlayed) {
    this.player.onCardPlayed(data)
  }

  opponentCardPlayed(data: IOpponentCardPlayed) {
    this.opponent.onCardPlayed(data)
  }

  cardAttack(data: any) {
    this.player.life = data.life
    this.player.board = data.board

    this.opponent.life = data.opponentLife
    this.opponent.board = data.opponentBoard
  }

  cardAttacked(data: any) {
    this.player.life = data.life
    this.player.board = data.board

    this.opponent.life = data.opponentLife
    this.opponent.board = data.opponentBoard
    this.opponent.setSelectedCard(null)
  }

  boardAttack() {
    if (this.isPlayerTurn && !this.opponent.board.length && this.player.selectedCard) {
      SocketService.emit(SocketEvents.BOARD_ATTACK, this.player.selectedCard)

      const opponentLifeAfterAttack = this.opponent.life - this.player.selectedCard.attack
      this.opponent.life = opponentLifeAfterAttack > 0 ? opponentLifeAfterAttack : 0

      this.player.inactiveCards.push(this.player.selectedCard)
      this.player.setSelectedCard(null, this.isPlayerTurn)
    }
  }

  boardAttacked(life: number) {
    this.player.life = life
    this.opponent.setSelectedCard(null)
    this.boardOnAttackFocus = false
  }

  playerAttackFocus(card: ICard | null) {
    if (this.isPlayerTurn && this.player.selectedCard) {
      SocketService.emit(SocketEvents.ATTACK_FOCUS, card)
    }
  }

  boardFocusAttack() {
    if (this.isPlayerTurn && !this.opponent.board.length && this.player.selectedCard) {
      SocketService.emit(SocketEvents.BOARD_ATTACK_FOCUS)
    }
  }

  boardLoseAttackFocus() {
    if (this.isPlayerTurn && !this.opponent.board.length && this.player.selectedCard) {
      SocketService.emit(SocketEvents.BOARD_LOSE_ATTACK_FOCUS)
    }
  }

  boardAttackFocus() {
    this.boardOnAttackFocus = !this.boardOnAttackFocus
  }
}
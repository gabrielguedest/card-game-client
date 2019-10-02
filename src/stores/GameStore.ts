import { observable, computed } from 'mobx'
import { createContext } from 'react'
import { ICard } from './../interfaces/Card'
import { INewMatch } from '../interfaces/NewMatch'
import { IPlayer } from '../interfaces/Player'
import { IOpponent } from '../interfaces/Opponent'
import { ICardDrawed, IOpponentCardDrawed } from '../interfaces/CardDrawed'
import { ITurn } from './../interfaces/Turn'
import { ICardPlayed, IOpponentCardPlayed } from '../interfaces/CardPlayed'
import SocketService from '../SocketService';

class GameStore {
  static instance: GameStore

  @observable
  hasActiveGame: boolean = false

  @observable
  playerTurn: string | null = null

  @observable
  alreadyAttacked: ICard[] = []

  @observable
  player: IPlayer = {
    life: 0,
    maxMana: 0,
    mana: 0,
    deck: [],
    hand: [],
    board: [],
  }

  @observable
  opponent: IOpponent = {
    life: 0,
    maxMana: 0,
    mana: 0,
    deck: 0,
    hand: 0,
    board: [],
  }

  private constructor() {}

  static getInstance() {
    if (!GameStore.instance) {
      GameStore.instance = new GameStore()
    }

    return GameStore.instance
  }

  setNewMatch(data: INewMatch) {
    this.playerTurn = data.actor
    this.player = data.player
    this.player.board = []
    this.opponent = data.opponent
    this.opponent.board = []
    this.hasActiveGame = true

    this.startGame()
  }

  startGame() {
    if (this.isPlayerTurn) {
      console.log('drawCard emit')
      SocketService.emit('drawCard')
    }
  }

  @computed 
  get isPlayerTurn() {
    return SocketService.socket.id === this.playerTurn
  }

  cardDrawed(data: ICardDrawed) {
    data.drawedCards.forEach((card: ICard) => this.player.hand.push(card))
    this.player.deck = data.deck
  }

  opponentCardDrawed(data: IOpponentCardDrawed) {
    this.opponent.hand = data.hand
    this.opponent.deck = data.deck
  }

  startPlayerTurn(data: ITurn) {
    this.playerTurn = data.actor
    this.player.mana = data.mana
    this.opponent.mana = data.opponentMana
    this.alreadyAttacked = []
    SocketService.emit('drawCard')
  }

  opponentTurn(data: ITurn) {
    this.playerTurn = data.actor
    this.opponent.mana = data.opponentMana
    this.player.mana = data.mana
  }
  
  playCard(card: ICard) {
    if (this.isPlayerTurn) {
      SocketService.emit('playCard', card)
    }
  }

  cardPlayed(data: ICardPlayed) {
    this.player.board = data.board
    this.player.hand = data.hand
    this.player.mana = data.mana
    this.alreadyAttacked.push(data.card)
  }

  opponentCardPlayed(data: IOpponentCardPlayed) {
    this.opponent.board = data.board
    this.opponent.hand = data.hand
    this.opponent.mana = data.opponentMana
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
  }
}

export const gameStore = GameStore.getInstance()
export default createContext(GameStore.getInstance())
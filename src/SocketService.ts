import { ITurn } from './interfaces/Turn'
import { IOpponentCardPlayed, ICardPlayed } from './interfaces/CardPlayed'
import { ICardDrawed, IOpponentCardDrawed } from './interfaces/CardDrawed'
import { ICard } from './interfaces/Card'
import { INewMatch } from './interfaces/NewMatch'
import socketIOClient from 'socket.io-client'
import { gameStore } from './stores/GameStore'

export enum SocketEvents {
  NEW_MATCH = 'newMatch',
  CARD_DRAWED = 'cardDrawed',
  OPPONENT_CARD_DRAWED = 'opponentCardDrawed',
  PLAYER_TURN = 'playerTurn',
  OPPONENT_TURN = 'opponentTurn',
  CARD_PLAYED = 'cardPlayed',
  OPPONENT_CARD_PLAYED = 'opponentCardPlayed',
  CARD_ATTACK = 'cardAttack',
  CARD_ATTACKED = 'cardAttacked',
  OPPONENT_SELECTED_CARD = 'opponentSelectedCard',
  IS_ATTACK_FOCUS = 'isAttackFocus',
  BOARD_ATTACK_FOCUS = 'boardAttackFocus',
  BOARD_LOSE_ATTACK_FOCUS = 'boardLoseAttackFocus',
  BOARD_ATTACKED = 'boardAttacked',
  VICTORY = 'victory',
  DEFEAT = 'defeat',

  DRAW_CARD = 'drawCard',
  PLAY_CARD = 'playCard',
}

class SocketService {
  static instance: SocketService
  public socket: any

  private constructor() {}

  public initConnection() {
    this.socket = socketIOClient('http://localhost:5000')
    this.listenEvents()
  }

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }

    return SocketService.instance
  }

  public emit(eventName: SocketEvents, data?: any) {
    this.socket.emit(eventName, data)
  }

  public listenEvents() {
    this.socket.on(SocketEvents.NEW_MATCH, (data: INewMatch) => gameStore.setNewMatch(data))

    this.socket.on(SocketEvents.CARD_DRAWED, (data: ICardDrawed) => gameStore.cardDrawed(data))
    this.socket.on(SocketEvents.OPPONENT_CARD_DRAWED, (data: IOpponentCardDrawed) => gameStore.opponentCardDrawed(data))

    this.socket.on(SocketEvents.PLAYER_TURN, (data: ITurn) => gameStore.startPlayerTurn(data))
    this.socket.on(SocketEvents.OPPONENT_TURN, (data: ITurn) => gameStore.opponentTurn(data))

    this.socket.on(SocketEvents.CARD_PLAYED, (data: ICardPlayed) => gameStore.cardPlayed(data))
    this.socket.on(SocketEvents.OPPONENT_CARD_PLAYED, (data: IOpponentCardPlayed) => gameStore.opponentCardPlayed(data))

    // tipar esses parametros
    this.socket.on(SocketEvents.CARD_ATTACK, (data: any) => gameStore.cardAttack(data))
    this.socket.on(SocketEvents.CARD_ATTACKED, (data: any) =>  gameStore.cardAttacked(data))

    this.socket.on(SocketEvents.OPPONENT_SELECTED_CARD, (data: ICard) => gameStore.setOpponentSelectedCard(data))
    this.socket.on(SocketEvents.IS_ATTACK_FOCUS, (data: ICard | null) => gameStore.setOpponentAttackFocus(data))

    this.socket.on(SocketEvents.BOARD_ATTACK_FOCUS, () => gameStore.boardAttackFocus())

    this.socket.on(SocketEvents.BOARD_LOSE_ATTACK_FOCUS, () => gameStore.boardAttackFocus())

    this.socket.on(SocketEvents.BOARD_ATTACKED, (life: number) => gameStore.boardAttacked(life))

    this.socket.on(SocketEvents.VICTORY, () => console.log('victory'))
    this.socket.on(SocketEvents.DEFEAT, () => console.log('defeat'))
  }
}

export default SocketService.getInstance()
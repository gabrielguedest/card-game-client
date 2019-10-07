import { ITurn } from './interfaces/Turn'
import { IOpponentCardPlayed, ICardPlayed } from './interfaces/CardPlayed'
import { ICardDrawed, IOpponentCardDrawed } from './interfaces/CardDrawed'
import { ICard } from './interfaces/Card'
import { INewMatch } from './interfaces/NewMatch'
import socketIOClient from 'socket.io-client'
import { rootStore } from './stores/RootStore'

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
  BOARD_ATTACK = 'boardAttack',
  SELECTED_CARD = 'selectedCard',
  ATTACK_FOCUS = 'attackFocus',
  ATTACK_CARD = 'attackCard',

  READY = 'ready',
  UNREADY = 'unready',
  
  END_TURN = 'endTurn',
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
    const { matchStore } = rootStore
    const { opponent } = matchStore

    this.socket.on(SocketEvents.NEW_MATCH, (data: INewMatch) => matchStore.newMatch(data))

    this.socket.on(SocketEvents.CARD_DRAWED, (data: ICardDrawed) => matchStore.cardDrawed(data))
    this.socket.on(SocketEvents.OPPONENT_CARD_DRAWED, (data: IOpponentCardDrawed) => matchStore.opponentCardDrawed(data))

    this.socket.on(SocketEvents.PLAYER_TURN, (data: ITurn) => matchStore.playerTurn(data))
    this.socket.on(SocketEvents.OPPONENT_TURN, (data: ITurn) => matchStore.opponentTurn(data))

    this.socket.on(SocketEvents.CARD_PLAYED, (data: ICardPlayed) => matchStore.cardPlayed(data))
    this.socket.on(SocketEvents.OPPONENT_CARD_PLAYED, (data: IOpponentCardPlayed) => matchStore.opponentCardPlayed(data))

    // tipar esses parametros
    this.socket.on(SocketEvents.CARD_ATTACK, (data: any) => matchStore.cardAttack(data))
    this.socket.on(SocketEvents.CARD_ATTACKED, (data: any) =>  matchStore.cardAttacked(data))

    this.socket.on(SocketEvents.OPPONENT_SELECTED_CARD, (data: ICard) => opponent.setSelectedCard(data))
    this.socket.on(SocketEvents.IS_ATTACK_FOCUS, (data: ICard | null) => opponent.setAttackFocus(data))

    this.socket.on(SocketEvents.BOARD_ATTACK_FOCUS, () => matchStore.boardAttackFocus())

    this.socket.on(SocketEvents.BOARD_LOSE_ATTACK_FOCUS, () => matchStore.boardAttackFocus())

    this.socket.on(SocketEvents.BOARD_ATTACKED, (life: number) => matchStore.boardAttacked(life))

    this.socket.on(SocketEvents.VICTORY, () => console.log('victory'))
    this.socket.on(SocketEvents.DEFEAT, () => console.log('defeat'))
  }
}

export default SocketService.getInstance()
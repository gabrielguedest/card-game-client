import { ITurn } from './interfaces/Turn'
import { IOpponentCardPlayed, ICardPlayed } from './interfaces/CardPlayed'
import { ICardDrawed, IOpponentCardDrawed } from './interfaces/CardDrawed'
import { ICard } from './interfaces/Card'
import { INewMatch } from './interfaces/NewMatch'
import socketIOClient from 'socket.io-client'
import { gameStore } from './stores/GameStore'

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

  public emit(eventName: string, data?: any) {
    this.socket.emit(eventName, data)
  }

  public listenEvents() {
    this.socket.on('newMatch', (data: INewMatch) => gameStore.setNewMatch(data))

    this.socket.on('cardDrawed', (data: ICardDrawed) => gameStore.cardDrawed(data))
    this.socket.on('opponentCardDrawed', (data: IOpponentCardDrawed) => gameStore.opponentCardDrawed(data))

    this.socket.on('playerTurn', (data: ITurn) => gameStore.startPlayerTurn(data))
    this.socket.on('opponentTurn', (data: ITurn) => gameStore.opponentTurn(data))

    this.socket.on('cardPlayed', (data: ICardPlayed) => gameStore.cardPlayed(data))
    this.socket.on('opponentCardPlayed', (data: IOpponentCardPlayed) => gameStore.opponentCardPlayed(data))

    // tipar esses parametros
    this.socket.on('cardAttack', (data: any) => gameStore.cardAttack(data))
    this.socket.on('cardAttacked', (data: any) =>  gameStore.cardAttacked(data))

    this.socket.on('opponentSelectedCard', (data: ICard) => gameStore.setOpponentSelectedCard(data))
    this.socket.on('isAttackFocus', (data: ICard | null) => gameStore.setOpponentAttackFocus(data))

    this.socket.on('boardAttackFocus', () => gameStore.boardAttackFocus())

    this.socket.on('boardLoseAttackFocus', () => gameStore.boardAttackFocus())

    this.socket.on('boardAttacked', (life: number) => gameStore.boardAttacked(life))

    this.socket.on('victory', () => console.log('victory'))
    this.socket.on('defeat', () => console.log('defeat'))
  }
}

export default SocketService.getInstance()
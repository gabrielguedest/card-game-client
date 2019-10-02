import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import GameStore from '../../stores/GameStore'
import SocketService from '../../SocketService'
import { ICard } from '../../interfaces/Card'
import { 
  Frame,
  Divider,
  OpponentHand,
  PlayerHand,
  OpponentDeck,
  PlayerDeck,
  PlayerBoard,
  OpponentBoard,
  EndTurnButton,
  OpponentLife,
  PlayerLife,
} from './style'
import { CardComponent } from '../Card/CardComponent'
import { CardBackComponent as CardBack } from '../Card/CardBack'
import { Deck } from '../Deck'

const Board: React.FC = observer(() => {
  const store = useContext(GameStore)

  const [selectedCard, setSelectedCard] = useState<ICard | null>(null)

  const renderOpponentHand = () => {
    let cards = []

    for (let i=0; i<store.opponent.hand; i++) {
      cards.push(<CardBack />)
    }

    return cards
  }

  const endTurn = () => {
    setSelectedCard(null)
    SocketService.emit('endTurn')
  }

  const selectCard = (card: ICard) => {
    const hasAlreadyAttacked = store.alreadyAttacked.find(c => c.id === card.id)

    if (store.isPlayerTurn && !hasAlreadyAttacked) {
      setSelectedCard(card)
    }
  }

  const attackCard = (card: ICard) => {
    if (!selectedCard) {
      return
    }

    const hasAlreadyAttacked = store.alreadyAttacked.find(c => c.id === selectedCard!.id)
    
    if (store.isPlayerTurn && selectedCard && !hasAlreadyAttacked) {
      SocketService.emit('attackCard', {
        attacker: selectedCard,
        attacked: card,
      })

      store.alreadyAttacked.push(selectedCard!)
      setSelectedCard(null)
    }
  }

  return (
    <Frame>
      { 
        store.isPlayerTurn && 
        <EndTurnButton onClick={endTurn}>Finalizar Turno</EndTurnButton>
      }
      
      <OpponentLife>
        HP: {store.opponent.life} - Mana: {store.opponent.mana}/{store.opponent.maxMana}
      </OpponentLife>
      <OpponentDeck>        
        <Deck deckLength={store.opponent.deck}/>
      </OpponentDeck>
      <OpponentHand>
        {renderOpponentHand()}
      </OpponentHand>
      <OpponentBoard>
        { store.opponent.board.map((card: ICard) => 
          <CardComponent
            card={card}
            type="board"
            canBeAttacked={!!(store.isPlayerTurn && selectedCard)}
            onClick={() => attackCard(card)}
          />)}
      </OpponentBoard>

      <Divider />

      <PlayerBoard>
        { store.player.board.map((card: ICard) => 
          <CardComponent 
            card={card}
            type="board"
            isSelected={!!(selectedCard && selectedCard.id === card.id)}
            onClick={() => selectCard(card)}
          />)}
      </PlayerBoard>
      <PlayerDeck>
        <Deck deckLength={store.player.deck.length}/>
      </PlayerDeck>
      <PlayerHand>
        { store.player.hand.map((card: ICard) => 
          <CardComponent 
            card={card}
            onClick={() => store.playCard(card)}
          />)
        }
      </PlayerHand>
      <PlayerLife>
        HP: {store.player.life} - Mana: {store.player.mana}/{store.player.maxMana}
      </PlayerLife>
    </Frame>
  )
})

export default Board
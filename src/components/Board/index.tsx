import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import GameStore from '../../stores/GameStore'
import SocketService from '../../SocketService'
import { ICard } from '../../interfaces/Card'
import {
  Container,
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

  const renderOpponentHand = () => {
    let cards = []

    for (let i=0; i<store.opponent.hand; i++) {
      cards.push(<CardBack />)
    }

    return cards
  }

  const endTurn = () => {
    store.setSelectedCard(null)
    SocketService.emit('endTurn')
  }

  const attackCard = (card: ICard) => {
    if (!store.selectedCard) {
      return
    }

    const hasAlreadyAttacked = store.alreadyAttacked.find(c => c.id === store.selectedCard!.id)
    
    if (store.isPlayerTurn && store.selectedCard && !hasAlreadyAttacked) {
      SocketService.emit('attackCard', {
        attacker: store.selectedCard,
        attacked: card,
      })

      store.alreadyAttacked.push(store.selectedCard!)
      store.setSelectedCard(null)
    }
  }

  return (
    <Container>
      
      <OpponentHand>
        {renderOpponentHand()}
      </OpponentHand>

      <PlayerHand>
        { store.player.hand.map((card: ICard) => 
          <CardComponent 
            card={card}
            onClick={() => store.playCard(card)}
          />)
        }
      </PlayerHand>

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
        <OpponentBoard>
          { store.opponent.board.map((card: ICard) => 
            <CardComponent
              card={card}
              type="board"
              canBeAttacked={!!(store.isPlayerTurn && store.selectedCard)}
              isOpponentSelected={!!store.isOpponentSelectedCard(card)}
              onClick={() => attackCard(card)}
              onMouseEnter={() => store.isAttackFocus(card)}
              onMouseLeave={() => store.isAttackFocus(null)}
            />)}
        </OpponentBoard>

        <Divider />

        <PlayerBoard>
          { store.player.board.map((card: ICard) => 
            <CardComponent 
              card={card}
              type="board"
              isSelected={!!(store.selectedCard && store.selectedCard.id === card.id)}
              isAttackFocus={!!(store.isOpponentAttackFocus(card))}
              onClick={() => store.setSelectedCard(card)}
            />)}
        </PlayerBoard>
        <PlayerDeck>
          <Deck deckLength={store.player.deck.length}/>
        </PlayerDeck>
        <PlayerLife>
          HP: {store.player.life} - Mana: {store.player.mana}/{store.player.maxMana}
        </PlayerLife>
      </Frame>
    </Container>
  )
})

export default Board
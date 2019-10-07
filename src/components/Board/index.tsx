import React, { useContext } from 'react'
import { observer } from 'mobx-react'
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
  DefenseIcon,
} from './style'
import { CardComponent } from '../Card/CardComponent'
import { CardBackComponent as CardBack } from '../Card/CardBack'
import { Deck } from '../Deck'
import defenseIcon from '../../assets/icons/shield.png'
import RootStore from '../../stores/RootStore'

const Board: React.FC = observer(() => {
  const rootStore = useContext(RootStore)
  const { matchStore } = rootStore
  const { player, opponent, isPlayerTurn } = matchStore

  const renderOpponentHand = () => {
    let cards = []

    for (let i=0; i<opponent.hand; i++) {
      cards.push(<CardBack />)
    }

    return cards
  }

  return (
    <Container>
      
      <OpponentHand>
        {renderOpponentHand()}
      </OpponentHand>

      <PlayerHand>
        { player.hand.map((card: ICard) => 
          <CardComponent 
            card={card}
            canPlay={player.canPlay(card, isPlayerTurn)}
            onClick={() => player.playCard(card, isPlayerTurn)}
          />)
        }
      </PlayerHand>

      <Frame>
        {isPlayerTurn && 
          <EndTurnButton onClick={() => player.endTurn()}>
            Finalizar Turno
          </EndTurnButton>}
        
        <OpponentLife>
          HP: {opponent.life} - Mana: {opponent.mana}/{opponent.maxMana}
        </OpponentLife>

        <OpponentDeck>        
          <Deck deckLength={opponent.deck}/>
        </OpponentDeck>

        <OpponentBoard
          canBeAttacked={!!(isPlayerTurn && !opponent.board.length && player.selectedCard)}
          onMouseEnter={() => matchStore.boardFocusAttack()}
          onMouseLeave={() => matchStore.boardLoseAttackFocus()}
          onClick={() => matchStore.boardAttack()}
        >
          <DefenseIcon src={defenseIcon} />
          { opponent.board.map((card: ICard) => 
            <CardComponent
              card={card}
              type="board"
              canBeAttacked={!!(isPlayerTurn && player.selectedCard)}
              isOpponentSelected={opponent.isSelectedCard(card)}
              onClick={() => player.attackCard(card, isPlayerTurn)}
              onMouseEnter={() => matchStore.playerAttackFocus(card)}
              onMouseLeave={() => matchStore.playerAttackFocus(null)}
            />)}
        </OpponentBoard>

        <Divider />

        <PlayerBoard isOnAttackFocus={matchStore.boardOnAttackFocus}>
          <DefenseIcon src={defenseIcon} />
          { player.board.map((card: ICard) =>
            <CardComponent
              card={card}
              type="board"
              isSelected={!!(player.selectedCard && player.selectedCard.id === card.id)}
              isAttackFocus={opponent.isAttackFocus(card)}
              onClick={() => player.setSelectedCard(card, isPlayerTurn)}
              canPlay={player.canAttack(card, isPlayerTurn)}
            />)}
        </PlayerBoard>

        <PlayerDeck>
          <Deck deckLength={player.deck.length}/>
        </PlayerDeck>
        
        <PlayerLife>
          HP: {player.life} - Mana: {player.mana}/{player.maxMana}
        </PlayerLife>
      </Frame>
    </Container>
  )
})

export default Board
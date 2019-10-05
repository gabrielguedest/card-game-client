import React from 'react'
import swordIcon from '../../assets/icons/sword.png'
import { ICard } from '../../interfaces/Card'
import { Card, BoardCard, SwordIcon, OpponentSwordIcon, SwordContainer } from './style'
import CardContent from './CardContent'

import someCard from '../../assets/cards/card-1.png'

interface ICardComponent {
  card: ICard
  onClick: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  isSelected?: boolean
  isOpponentSelected?: boolean
  canBeAttacked?: boolean
  isAttackFocus?: boolean
  type?: string
  canPlay?: boolean
}

export const CardComponent: React.FC<ICardComponent> = ({ 
  card,
  onClick,
  isSelected,
  isOpponentSelected,
  type,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const canPlay = props.canPlay || false

  if (type === 'board') {
    const canBeAttacked = props.canBeAttacked || false
    const isAttackFocus = props.isAttackFocus || false

    return (
      <BoardCard
        onClick={onClick} 
        canBeAttacked={canBeAttacked}
        isAttackFocus={isAttackFocus}
        onMouseEnter={onMouseEnter && onMouseEnter}
        onMouseLeave={onMouseLeave && onMouseLeave}
        background={someCard}
        canPlay={canPlay}
      >
        {(isSelected || isOpponentSelected) && 
        <SwordContainer>
          <SwordIcon src={swordIcon}/>
        </SwordContainer>}
        <CardContent card={card} />
      </BoardCard>
    )
  }

  return (
    <Card 
      onClick={onClick} 
      background={someCard}
      canPlay={canPlay}
    >
      <CardContent card={card} />
    </Card>
  )
}
import React from 'react'
import swordIcon from '../../assets/icons/sword.png'
import { ICard } from '../../interfaces/Card'
import { Card, BoardCard, SwordIcon, OpponentSwordIcon } from './style'
import CardContent from './CardContent'

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
      >
        {isSelected && <SwordIcon src={swordIcon}/> }
        {isOpponentSelected && <OpponentSwordIcon src={swordIcon} /> }
        <CardContent card={card} />
      </BoardCard>
    )
  }

  return (
    <Card onClick={onClick}>
      <CardContent card={card} />
    </Card>
  )
}
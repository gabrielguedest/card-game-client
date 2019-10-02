import React from 'react'
import swordIcon from '../../assets/icons/sword.png'
import { ICard } from '../../interfaces/Card'
import { Card, BoardCard, SwordIcon } from './style'
import CardContent from './CardContent'

interface ICardComponent {
  card: ICard
  onClick: () => void
  isSelected?: boolean
  canBeAttacked?: boolean
  type?: string
}

export const CardComponent: React.FC<ICardComponent> = ({ 
  card,
  onClick,
  isSelected,
  type,
  ...props
}) => {
  if (type === 'board') {
    const canBeAttacked = props.canBeAttacked || false

    return (
      <BoardCard
        onClick={onClick} 
        canBeAttacked={canBeAttacked}
      >
        {isSelected && <SwordIcon src={swordIcon}/> }
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
import React from 'react'
import { ICard } from '../../../interfaces/Card'
import {
  Container,
  Mana,
  CardName,
  Description,
  Stats,
} from './style'

interface ICardContent {
  card: ICard
}

const CardContent: React.FC<ICardContent> = ({
  card
}) => (
  <Container>
    <Mana>
      <span>{card.mana}</span>
    </Mana>
    <CardName>{card.name}</CardName>
    <Description>{card.description} Aliados ganham +3 ATQ</Description>
    <Stats>
      <div>
        <span>{card.attack}</span>
      </div>
      <div>
        <span>{card.defense}</span>
      </div>
    </Stats>
  </Container>
)

export default CardContent
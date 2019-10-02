import React from 'react'
import cardIcon from '../../../assets/cards-icons/027-dragon-3.png'
import { ICard } from '../../../interfaces/Card'
import { 
  ImageContainer,
  CardImage,
  CardName,
  Description,
  ManaContainer,
  Stats,
} from './style'

interface ICardContent {
  card: ICard
}

const CardContent: React.FC<ICardContent> = ({
  card
}) => (
  <>
    <ImageContainer>
      <CardImage src={cardIcon} />
    </ImageContainer>
    <CardName>{card.name}</CardName>
    
    <ManaContainer>{card.mana}</ManaContainer>
    <Description>{card.description}</Description>
    <Stats>
      <p>ATQ:<span>{card.attack}</span></p>
      <p>DEF:<span>{card.defense}</span></p>
    </Stats>
  </>
)

export default CardContent
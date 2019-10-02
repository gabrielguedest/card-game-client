import React from 'react'
import { CardDeck, BackStar, DeckLength } from './style'
import backStar from '../../assets/icons/back-star.png'

export const Deck: React.FC<{ deckLength: number }> = ({ 
  deckLength 
}) => (
  <CardDeck>
    <DeckLength>{deckLength}</DeckLength>
    <BackStar src={backStar} />
  </CardDeck>
)
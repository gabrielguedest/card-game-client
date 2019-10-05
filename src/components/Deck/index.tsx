import React from 'react'
import { DeckLength, CardDeck } from './style'

export const Deck: React.FC<{ deckLength: number }> = ({ 
  deckLength 
}) => (
  <CardDeck>
    <DeckLength>{deckLength}</DeckLength>
  </CardDeck>
)
import styled from 'styled-components'
import { cardStyle } from '../Card/style'
import cardBackImage from '../../assets/card-back.png'

export const CardDeck = styled.div`
  ${cardStyle}; 

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${cardBackImage}); 

  &:hover {
    transform: scale(1.05);
  }
`

export const DeckLength = styled.h2`
  color: white;
  -webkit-text-stroke: 1px black;
`

import styled from 'styled-components'
import { cardStyle } from '../Card/style'

export const CardDeck = styled.div`
  ${cardStyle};

  width: 90px;
  height: 120px;
  box-shadow: 0px 12px 0px #2c2c2c;
  background-color: #4A4A4A;

  &:hover {
    transform: none;
    background-color: #676666;
  }
`

export const DeckLength = styled.h2``

export const BackStar = styled.img`
  width: 68px;
  opacity: .1;
`

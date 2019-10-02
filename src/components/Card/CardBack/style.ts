import styled from 'styled-components'
import { cardStyle } from '../style'

export const CardBack = styled.div`
  ${cardStyle}; 

  background-color: #4A4A4A;

  &:hover {
    margin-bottom: -30px;
  }
`

export const BackStar = styled.img`
  width: 68px;
  opacity: .1;
`
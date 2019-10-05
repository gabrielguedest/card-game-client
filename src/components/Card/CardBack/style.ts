import styled from 'styled-components'
import { cardStyle } from '../style'
import cardBackImage from '../../../assets/card-back.png'

export const CardBack = styled.div`
  ${cardStyle}; 

  background-image: url(${cardBackImage}); 

  &:hover {
    transform: scale(1.1);
    margin-bottom: -30px;
  }
`
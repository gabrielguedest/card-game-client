import styled, { css, keyframes } from 'styled-components'

export const cardStyle = css`
  width: 100px;
  height: 140px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 4px solid #404040;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    z-index: 2;
    transform: scale(1.4);
  }
`

export const Card = styled.div`
  ${cardStyle};

  &:hover {
    margin-top: -30px;
  }
`

export const BoardCard = styled(Card)<{
  canBeAttacked: boolean, 
  onClick: () => void
}>`
  margin: 0 5px;
  transition: all 125ms linear;

  &:hover {
    transform: scale(1.1);
    margin-top: 0px;
  } 

  ${({ canBeAttacked }) => canBeAttacked && css`
    &:hover {
      background-color: red;
    }
  `}
`

const AttackAnimation = keyframes`
  0% {
    top: -15px;
    opacity: 0.3;
  }
  50% {
    top: -25px;
    opacity: 1;
  }
  100% {
    top: -15px;
    opacity: 0.3;
  }
`

export const SwordIcon = styled.img`
  transform: rotate(-45deg);
  position: absolute;
  top: -15px;
  width: 50px;
  z-index: 100;
  animation: ${AttackAnimation} 1.5s infinite;
`
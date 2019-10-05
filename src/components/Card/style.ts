import styled, { css, keyframes } from 'styled-components'

export const cardStyle = css`
  width: 101px;
  height: 150px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background-size: cover;
  cursor: pointer;
  transition: transform 100ms linear;
`

export const Card = styled.div<{ background: string, canPlay: boolean }>`
  ${cardStyle};

  background-image: url(${props => props.background});

  &:hover {
    box-shadow: 0px 0px 5px 2px ${({ canPlay }) => canPlay ? 'green' : 'red'};
    transform: scale(1.5) translateY(-30px);
    z-index: 2;
  }
`

const PlayCard = keyframes`
  from {
    opacity: 0;
    transform: scale(1.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const BoardCard = styled.div<{
  canBeAttacked: boolean
  isAttackFocus: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick: () => void
  background: string
  canPlay: boolean
}>`
  ${cardStyle};

  margin: 0 5px;
  transition: all 125ms linear;
  background-image: url(${props => props.background});
  animation: ${PlayCard} 1s;

  &:hover {
    transform: scale(1.1);
    margin-top: 0px;
    box-shadow: 0px 0px 5px 2px ${({ canPlay }) => canPlay ? 'green' : 'red'};
  } 

  ${({ canBeAttacked }) => canBeAttacked && css`
    &:hover {
      box-shadow: 0px 0px 5px 2px red;
    }
  `}

  ${({ isAttackFocus }) => isAttackFocus && css`
    box-shadow: 0px 0px 5px 2px red;
  `}
`

const AttackAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`

const SwordOpacity = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const SwordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 150px;
  width: 101px;
` 

export const SwordIcon = styled.img`
  width: 50px;
  z-index: 100;
  animation: ${AttackAnimation} 1.5s infinite, ${SwordOpacity} 1s;
`

const OpponentAttackAnimation = keyframes`
  0% {
    bottom: -15px;
    opacity: 0.3;
  }
  50% {
    bottom: -25px;
    opacity: 1;
  }
  100% {
    bottom: -15px;
    opacity: 0.3;
  }
`

export const OpponentSwordIcon = styled.img`
  transform: rotate(135deg);
  position: absolute;
  bottom: -15px;
  width: 50px;
  z-index: 100;
  animation: ${OpponentAttackAnimation} 1.5s infinite;
`
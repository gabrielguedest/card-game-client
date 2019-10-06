import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

export const Frame = styled.div`
  background-color: #ccc;
  min-width: 1024px;
  min-height: 580px;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #404040;
`

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
  z-index: 100;
`

export const OpponentHand = styled(Cards)`
  top: 20px;
`

export const PlayerHand = styled(Cards)`
  bottom: 20px;
`

export const OpponentDeck = styled.div`
  position: absolute;
  top: 20px;
  left: 25px;
`

export const PlayerDeck = styled.div`
  position: absolute;
  right: 30px;
  bottom: 35px;
`

export const PlayerBoard = styled.div<{ isOnAttackFocus: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 150px;  
  width: 70%;
  position: absolute;
  top: 310px;
  left: 50%;
  transform: translate(-50%);

  ${({ isOnAttackFocus }) => isOnAttackFocus && css`
    ${DefenseIcon} {
      display: block;
    } 
  `}
`

const DefenseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.4);
    opacity: .9;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`

export const DefenseIcon = styled.img`
  display: none;
  width: 50px;
  height: 50px;
  animation: ${DefenseAnimation} 2s infinite;
`

export const OpponentBoard = styled.div<{ canBeAttacked: boolean }>`
  width: 70%;
  min-height: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translate(-50%);

  ${({ canBeAttacked }) => canBeAttacked && css`
    &:hover {
      cursor: pointer;

      ${DefenseIcon} {
        display: block;
      }
    }
  `}
`

export const EndTurnButton = styled.div`
  position: absolute;
  background-color: #ccc;
  padding: 20px 20px;
  border: 1px solid black;
  cursor: pointer;
`

export const OpponentLife = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`
export const PlayerLife = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
`
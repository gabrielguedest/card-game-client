import styled from 'styled-components'

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

export const PlayerBoard = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 310px;
  transform: translate(-50%);
  left: 50%;
`

export const OpponentBoard = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  transform: translate(-50%);
  top: 120px;
  left: 50%;
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
import React from 'react'
import styled from 'styled-components'
import { 
  CardComponent as Card,
  CardBackComponent as CardBack,
  CardDeckComponent as Deck,
} from './Card'

const Frame = styled.div`
  background-color: #ccc;
  width: 1024px;
  height: 720px;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #404040;
`

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
`

const OponnentHand = styled(Cards)`
  top: 5px;
`

const PlayerHand = styled(Cards)`
  bottom: 5px;
`

const OponnentDeck = styled.div`
  position: absolute;
  top: 20px;
  left: 25px;
`

const PlayerDeck = styled.div`
  position: absolute;
  right: 30px;
  bottom: 35px;
`

const PlayerBoard = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 380px;
  transform: translate(-50%);
  left: 50%;
`

const OponnentBoard = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  transform: translate(-50%);
  top: 190px;
  left: 50%;
`

class Board extends React.Component {
  render() {
    return (
      <Frame>
        <OponnentDeck>        
          <Deck />
        </OponnentDeck>
        <OponnentHand>
          <CardBack />
          <CardBack />
          <CardBack />
          <CardBack />
          <CardBack />
        </OponnentHand>

        <OponnentBoard>
          <Card type="board" />
          <Card type="board" />
        </OponnentBoard>

        <Divider />

        <PlayerBoard>
          <Card type="board" />
          <Card type="board" />
        </PlayerBoard>

        <PlayerDeck>
          <Deck />
        </PlayerDeck>
        <PlayerHand>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </PlayerHand>
      </Frame>
    )
  }
}

export default Board
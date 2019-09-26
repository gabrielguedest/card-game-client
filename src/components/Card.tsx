import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import icon from '../assets/cards-icons/027-dragon-3.png'
import star from '../assets/icons/favorite.png'
import backStar from '../assets/icons/back-star.png'

const cardStyle = css`
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

const Card = styled.div`
  ${cardStyle};

  &:hover {
    margin-top: -40px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, .05);
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardImage = styled.img`
  width: 63px;
  height: 63px;
`

const CardName = styled.div`
  border-radius: 15px;
  margin-top: -23px;
  padding: 3px 5px;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  z-index: 1;
`

const Description = styled.p`
  margin-top: 5px;
  font-weight: 200;
  font-size: 8px;
`

const Stats = styled.div`
  margin-bottom: 4px;

  p {
    display: inline-block;
    font-size: 10px;
    font-weight: 200;
    text-transform: uppercase;
    margin: 0 5px;

    span {
      font-weight: bold;
    }
  }
`

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`

const Star = styled.img`
  width: 10px;
  margin: 0 1px;
`

const CardContent = (props: any) => (
  <>
    <ImageContainer>
      <CardImage src={icon} />
    </ImageContainer>
    <CardName>DRAGON ELITE V</CardName>
    
    <StarContainer>
      <Star src={star}/>
      <Star src={star}/>
      <Star src={star}/>
    </StarContainer>
    <Description>Aliados ganham +3 ATQ</Description>
    <Stats>
      <p>ATQ:<span>15</span></p>
      <p>DEF:<span>10</span></p>
    </Stats>
  </>
)

const BoardCard = styled(Card)`
  margin: 0 5px;
  transition: all 125ms linear;

  &:hover {
    transform: scale(1.2);
    margin-top: 0px;
  } 
`

export const CardComponent = (props: any) => {
  return props.type === 'board' 
    ? (<BoardCard>
        <CardContent {...props}/>
      </BoardCard>) 
    : (<Card>
        <CardContent {...props}/>
      </Card>)
}

const CardBack = styled.div`
  ${cardStyle}; 
  
  background-color: #4A4A4A;

  &:hover {
    margin-bottom: -30px;
  }
`

const BackStar = styled.img`
  width: 68px;
  opacity: .1;
`

export const CardBackComponent = () => {
  return (
    <CardBack>
      <BackStar src={backStar} />
    </CardBack>
  )
}

const CardDeck = styled.div`
  ${cardStyle};

  width: 90px;
  height: 120px;
  box-shadow: 0px 12px 0px #2c2c2c;
  background-color: #4A4A4A;

   &:hover {
     transform: none;
   }
`

export const CardDeckComponent = () => {
  return (
    <CardDeck>
      <BackStar src={backStar} />
    </CardDeck>
  )  
}
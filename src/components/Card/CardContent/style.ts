import styled from 'styled-components'

export const ImageContainer = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, .05);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardImage = styled.img`
  width: 63px;
  height: 63px;
`

export const CardName = styled.div`
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

export const Description = styled.p`
  margin-top: 5px;
  font-weight: 200;
  font-size: 8px;
`

export const Stats = styled.div`
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

export const ManaContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`
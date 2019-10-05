import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const Mana = styled.div`
  height: 17px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  span {
    font-size: 0.6rem;
    font-weight: bold;
    color: rgba(255, 255, 255, .85);
    text-shadow: 0px 0px 2px black;
  }
`

export const CardName = styled.p`
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  font-size: .5rem;
  width: 90%;
  margin: 0 auto;
  margin-top: 68px;
  text-shadow: 0px 0px 2px black;
  text-align: center;
`

export const Description = styled.div`
  width: 75%;
  height: 30px;
  margin: 8px auto 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .4rem;
  font-weight: 200;
  text-align: center;
  color: rgba(0, 0, 0, .8);
`

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -5px;

  div:first-child {
    margin-left: 4.5px;
  }

  div:last-child {
    margin-right: 5px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 15px;

    span {
      font-size: .6rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0.3px 0.3px 2px black;
    }
  }
`
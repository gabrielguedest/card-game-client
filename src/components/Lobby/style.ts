import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #383838;
`

export const SearchButton = styled.div`
  width: 245px;
  height: 65px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #5359DA;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #E8E8E8;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #6065E7;
  }
`
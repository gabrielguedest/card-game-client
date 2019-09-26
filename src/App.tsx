import React from 'react'
import styled from 'styled-components'
import Board from './components/Board'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4e4e4e;
`

const App: React.FC = () => {
  return (
    <Container>
      <Board />
    </Container>
  )
}

export default App

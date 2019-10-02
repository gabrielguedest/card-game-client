import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import GameStore from '../../stores/GameStore'
import SocketService from '../../SocketService'
import Board from '../Board'
import { Container, SearchButton} from './style'

const Lobby: React.FC = observer(() => {
  const store = useContext(GameStore)
  const [searching, setSearching] = useState(false)

  const searchGame = () => {
    setSearching(!searching)

    if (searching) {
      SocketService.emit('unready')
    } else {
      SocketService.emit('ready')
    }
  }

  const renderButton = () => {
    return (
      <SearchButton onClick={searchGame}>
        { !searching ? 'Procurar jogo' : 'Procurando jogo' }
      </SearchButton>
    )
  }

  return (
    <Container>
      { store.hasActiveGame
        ? <Board />
        : renderButton()}
    </Container>
  )
})

export default Lobby

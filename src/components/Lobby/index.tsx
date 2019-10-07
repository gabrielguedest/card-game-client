import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import SocketService, { SocketEvents } from '../../SocketService'
import Board from '../Board'
import { Container, SearchButton} from './style'
import RootStore from '../../stores/RootStore'

const Lobby: React.FC = observer(() => {
  const rootStore = useContext(RootStore)
  const [searching, setSearching] = useState(false)
  const { matchStore } = rootStore

  const searchGame = () => {
    setSearching(!searching)

    if (searching) {
      SocketService.emit(SocketEvents.UNREADY)
    } else {
      SocketService.emit(SocketEvents.READY)
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
      { matchStore.hasActiveGame
        ? <Board />
        : renderButton()}
    </Container>
  )
})

export default Lobby

import React from 'react'
import ReactDOM from 'react-dom'
import Lobby from './components/Lobby'
import SocketService from './SocketService'

SocketService.initConnection()

ReactDOM.render(<Lobby />, document.getElementById('root'))

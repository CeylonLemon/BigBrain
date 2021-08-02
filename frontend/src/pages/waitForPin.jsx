// import React, { useContext } from 'react'
import React from 'react'
// import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { getQuiz, startGame } from '../helper/api';

export function WaitForPin () {
  // const { token } = useContext(UserContext);
  // const { id } = useParams();
  // const game = useLocation().state.game;
  const history = useHistory()
  const id = useLocation().search.substr(5)
  console.log(id)
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh'
    },
    header: {
      position: 'absolute',
      top: '30%'
    }
  }))
  const classes = useStyles()
  const connect = () => {
    const io = require('socket.io-client')
    const socket = io('http://localhost:5005', { query: { sessionId: id } });
    console.log(socket)
  }
  // console.log(game)
  // const history = useHistory();

  React.useEffect(() => {
    startGame(id)
      .then(() => { return getQuiz(id) })
      .then(data => { return data.active })
      .then(pin => {
        history.push({
          pathname: '/waitForPlayers',
          search: `?gid=${id}&pin=${pin}`
        })
      })
  }, [])

  return <div className={classes.root}>
    <header className={classes.header}>
      <p >GameID: {id}</p>
      <h2>Wait for pin...</h2>
      <button onClick={connect}>connect</button>
    </header>

  </div>
}

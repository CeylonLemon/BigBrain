import React, { useRef, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import QuizBoard from '../object/QuizBoard';
import { connectToServer } from '../object/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8vh',
    height: '90vh',
    width: '100vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
}))
// const connectToServer = (socketRef, body) => {
//   const io = require('socket.io-client')
//   socketRef.current = io('http://localhost:5005', body)
// }

export function StartGame () {
  const classes = useStyles()
  const location = useLocation();
  const history = useHistory()
  const queryString = require('query-string');
  const { gid, pin } = queryString.parse(location.search)
  const socket = useRef();
  const quizBoardRef = useRef()

  useEffect(() => {
    connectToServer(socket, { query: { pin, role: 'host' } })

    socket.current.on('end game', () => {
      socket.current.close()
      history.push('/endOfGame')
    })
    socket.current.on('advance game', state => {
      quizBoardRef.current.hostAdvanceGame()
    })
  }, [])

  return <div className={classes.root} id='boardWrapper'>

            <QuizBoard
                ref={quizBoardRef}
                gid={parseInt(gid)}
                pin={pin}
            />

    </div>
}

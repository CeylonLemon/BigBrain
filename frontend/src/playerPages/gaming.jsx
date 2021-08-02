import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
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
const Gaming = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const queryString = require('query-string')
  const { pin, pid } = queryString.parse(location.search)
  const { question, numOfQuestions } = location.state
  const socket = useRef()
  const quizBoardRef = useRef()

  useEffect(() => {
    connectToServer(socket, { query: { pin, role: 'player' } })
    socket.current.on('end game', () => {
      socket.current.close()
      history.push('/endOfGame')
    })
    socket.current.on('advance game', state => {
      quizBoardRef.current.playerAdvanceGame()
    })
  }, [])

  return (
      <div className={classes.root} id='boardWrapper'>
        <QuizBoard
            ref={quizBoardRef}
            player={true}
            pin={pin}
            pid={pid}
            questionForPlayer={question}
            numOfQuestions={numOfQuestions}
        />
      </div>
  );
}

export default Gaming

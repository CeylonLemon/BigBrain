import PropTypes from 'prop-types';

import React, { useEffect, useState, useReducer } from 'react'
import { getAllQuizzes, getNewQuizId, getQuiz } from './request';
import { Game } from '../object/game';

export const UserContext = React.createContext(null);
export const ControlContext = React.createContext(null);
export const AlertContext = React.createContext(null);

export const BlankPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAP1BMVEWpqan///+mpqaqqqqysrLIyMi2trbExMStra2/v7+jo6P6+vrr6+vb29vy8vL4+PjPz8/k5OTV1dXd3d3o6OgbQExvAAAFDklEQVR4nO2b6XqjOhBEpRb7Zry8/7NeBGiXPcmEuU6bOr+CY/zRhbrU2oQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAj1L07kf4PSgaC8ixQ7WUI0GOFeqllH3dvfs5fgGKbnJlKCCHKKRhpMVM3/04b6UbrBhnzxUlaukzVGc2UrrIkFGcVg7jnh46V85pHU2ixXlzpXuY5jAEctzFCTuW1kRfdmUf5Eq55Mq7n+7/xbrnRIJoDBrHVJ2qm1XOPSt9TVWUK2cazSrrnndSeiS/DNniXDmLHMq6p7TuQCLOFTqHdZB1z9m+f6WoOGGuLGFb9wydMupXZEni41sHzc49w1hzufLhWPe8uoZhgj5brnRXE2mzf6JEdy+3RrL8WYcDuPmDpwWViN1z6VfVoKd3titF0RDug2sw1U0mSNoMQ1HVay919nGaXEndsyvXS3JiZHKl+8iqI3FPum/XbfD201z5PDWU7546OG0XG7cwFZYa7BHIcW0+LldC99zsYmNIbLJr41x5wwP/Qzz3XC9nF2offzftVy7tB8mhnHu2+trYhTHUFGqSXOHnHJRjCc1zT6JiCgJdeozg2xqV5gq7Gqxo81j3rPVVGVKH3zUtgLo0VzhNklIpf07jfq65Bv/h1a8cLEY2V9i0jYPFWH8yyRUuahwrxjrDo+J+5VEwUeM4MZYRWtVWYi3FuzbofYp3R/lFjhODbuvenrVUV94gT1fvTLqU48QwA5eB9pGMqd4vbDoUK0b1F8xODK9CXddXPJXbd8f4Zewz/8WkjL23CRfqt6wxDePBZ5DiB/SDe93yyt4U3JosF/cU3xVD6ZK76/Y1kldiVObixsYx8mI0zTP3V1RdL3IaC4rE8HYD6ragyNjphU/9mRejnp69TVtc1hTd65Zk5YOUc8+auRjddTG9bNvwioc2vrcxhtk3S8MwFwOjJMm3DKknMbIv1KWCXi4I7222zBgapu4pMmIosX4y5tTwd4M2yb1dNd/mdRXJuufIKUlyYtCW/beMGl6JrWf+onuV2Ca9nHv2XOrwnTRN1P5BMsGt/tAy7E/ar9WsHCMTkOsIylSNV57hsO7Jp/bcSALytsy30Yv1ekxZ0TMxnHvm5tB/NUlA/iAj2X9iF0+SOsNhy6+RW8NIAvLnIZae0e3j2v9d3KfLdGuSCtR+zbasZKXp9xP3CF24w8B1uG45YBmbqNy92/ese5bM3FOkARWBFvKyfUxkJiXUuhf0qRhCuA1xrHrVlTigORRDTmZKMzOqzYjhbSfm1zCSKnKSsRq0ze5muoaMGIzdUyQBFbEWyyB0c5Ey3YCSVq+ee/JLkjigzJEjwy0dZqQtw3NP9mIoSrLEcn0lxu4Pz7YTcyF8u1VGBRNfaoj23v1wZ3QYgx+BGC+yRMq0q/Sq80FPBFrDufNsGJEY8YlNn7RvDRagRnJH2Tj6hSYQ40WW5NaCwtW43jYrhrXnhi9GuG8rJg3xydLk0+nkX08gxtT3l4VpZ1h4rFwXvixGfBiDD0GadK940ZsEXJm6pwjWWr9NlxWDa7MQnhhl/X3MnJY/7J9Z1p4bh+zPEO7A2sRYi4M2q7iD0BXEUOYQDmP3FIdtY1L6EE7P2j3FoVsfSdxntvXWyoFi6HMWb47mh/yDHcKMaYqfw9spAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfyn+Kly7OBZVu/QAAAABJRU5ErkJggg==';
export const ACTIONS = {
  DELETE_GAME: 'deleteGame',
  COVER_GAME: 'coverGame',
  MODIFY_GAME: 'modifyGame',
  OPEN_ALERT: 'openAlert',
  CLOSE_ALERT: 'closeAlert',
  OPEN_POPUP: 'openPopup',
  CLOSE_POPUP: 'closePopup',
  CHANGE_INDEX: 'changeIndex',
  MODIFY_QUESTION: 'modifyQuestion',
  ADD_QUESTION: 'addQuestion'
}
const reducer = (games, action) => {
  switch (action.type) {
    case ACTIONS.DELETE_GAME:
      return games.filter(game => { return game.id !== action.payload.id })
    case ACTIONS.COVER_GAME:
      return action.payload.games
    case ACTIONS.MODIFY_GAME:
      return games.map(g => {
        if (g.id === action.payload.id) {
          return action.payload.newGame;
        } return g
      })
    case ACTIONS.MODIFY_QUESTION:
      for (let i = 0; i < games.length; i++) {
        const game = games[i]
        if (game.id === action.payload.gid) {
          game.questions[action.payload.index] = action.payload.question
          break
        }
      }
      return [...games]
    default:
      return games
  }
}

export const ContextProvider = ({ children }) => {
  const [games, dispatch] = useReducer(reducer, [new Game()])
  const [token, setToken] = useState(sessionStorage.getItem('token'))
  console.log(token)
  console.log('usercontext render')
  // const [open, setOpen] = useState(false)
  // const [editing, setEditing] = useState(0)
  // const label = useRef('label')
  // const token = sessionStorage.getItem('token')
  async function getAllGames () {
    const gs = []
    getAllQuizzes(token)
    // get further info of each quiz
      .then(async (data) => {
        const promises = [];
        if (data.quizzes.length !== 0) {
          data.quizzes.forEach((q, i) => {
            promises.push(getQuiz(q.id, token)
              .then(data => {
                const g = new Game()
                Object.assign(q, data)
                Object.assign(g, q)
                gs.push(g);
              }))
          })
        } else {
          await getNewQuizId('A New Quiz', token)
          getAllGames()
        }
        return Promise.all(promises)
      }).then(() => {
        if (gs.length !== 0) { dispatch({ type: ACTIONS.COVER_GAME, payload: { games: gs } }); }
      })
  }
  useEffect(() => {
    getAllGames()
  }, [])
  return <UserContext.Provider value={{ token, setToken, games, dispatch }}>
            {/* <GamesContext.Provider value = {{ games, dispatch }}> */}
                 {/* <ControlContext.Provider value = {{ open, setOpen, editing, setEditing }}> */}
                {children}
                 {/* </ControlContext.Provider> */}
            {/* </GamesContext.Provider> */}
        </UserContext.Provider>
}

ContextProvider.propTypes = {
  children: PropTypes.any
}

export const ControlProvider = ({ children }) => {
  // const [open, setOpen] = useState(false);
  // const [editing, setEditing] = useState('newGame')
  // const [Alert, openAlert] = useState(false)

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.OPEN_POPUP:
        return { ...state, open: true, editing: action.payload.id }
      case ACTIONS.CLOSE_POPUP:
        return { ...state, open: false }
      case ACTIONS.CHANGE_INDEX:
        return { ...state, index: action.payload.index }
    }
  }
  const [states, dispatchStates] = useReducer(reducer, {
    open: false,
    editing: 'newGame',
    alert: false,
    QIndex: 0
  })
  console.log('controlcontext render')
  return <ControlContext.Provider value={{ states, dispatchStates }}>
        {children}
    </ControlContext.Provider>
}
ControlProvider.propTypes = {
  children: PropTypes.any
}

export const AlertProvider = ({ children }) => {
  console.log('alertContext render')
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.OPEN_ALERT:
        return { open: true, type: action.payload.type, message: action.payload.message }
      case ACTIONS.CLOSE_ALERT:
        return { ...state, open: false }
    }
  }
  const [alert, dispatchAlert] = useReducer(reducer, {
    open: false,
    type: 'success',
    message: 'success'
  })
  return <AlertContext.Provider value={{ alert, dispatchAlert }}>
        {children}
    </AlertContext.Provider>
}
AlertProvider.propTypes = {
  children: PropTypes.any
}

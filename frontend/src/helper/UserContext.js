import PropTypes from 'prop-types';
import React, { useEffect, useState, useReducer } from 'react'
import { getAllQuizzes, getQuiz, updateQuiz } from './api';
import { Game } from '../object/game';
import { useMediaQuery } from 'react-responsive/src';

export const UserContext = React.createContext(null);
export const AlertContext = React.createContext(null);
export const MediaContext = React.createContext(null);

export const BlankPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAP1BMVEWpqan///+mpqaqqqqysrLIyMi2trbExMStra2/v7+jo6P6+vrr6+vb29vy8vL4+PjPz8/k5OTV1dXd3d3o6OgbQExvAAAFDklEQVR4nO2b6XqjOhBEpRb7Zry8/7NeBGiXPcmEuU6bOr+CY/zRhbrU2oQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAj1L07kf4PSgaC8ixQ7WUI0GOFeqllH3dvfs5fgGKbnJlKCCHKKRhpMVM3/04b6UbrBhnzxUlaukzVGc2UrrIkFGcVg7jnh46V85pHU2ixXlzpXuY5jAEctzFCTuW1kRfdmUf5Eq55Mq7n+7/xbrnRIJoDBrHVJ2qm1XOPSt9TVWUK2cazSrrnndSeiS/DNniXDmLHMq6p7TuQCLOFTqHdZB1z9m+f6WoOGGuLGFb9wydMupXZEni41sHzc49w1hzufLhWPe8uoZhgj5brnRXE2mzf6JEdy+3RrL8WYcDuPmDpwWViN1z6VfVoKd3titF0RDug2sw1U0mSNoMQ1HVay919nGaXEndsyvXS3JiZHKl+8iqI3FPum/XbfD201z5PDWU7546OG0XG7cwFZYa7BHIcW0+LldC99zsYmNIbLJr41x5wwP/Qzz3XC9nF2offzftVy7tB8mhnHu2+trYhTHUFGqSXOHnHJRjCc1zT6JiCgJdeozg2xqV5gq7Gqxo81j3rPVVGVKH3zUtgLo0VzhNklIpf07jfq65Bv/h1a8cLEY2V9i0jYPFWH8yyRUuahwrxjrDo+J+5VEwUeM4MZYRWtVWYi3FuzbofYp3R/lFjhODbuvenrVUV94gT1fvTLqU48QwA5eB9pGMqd4vbDoUK0b1F8xODK9CXddXPJXbd8f4Zewz/8WkjL23CRfqt6wxDePBZ5DiB/SDe93yyt4U3JosF/cU3xVD6ZK76/Y1kldiVObixsYx8mI0zTP3V1RdL3IaC4rE8HYD6ragyNjphU/9mRejnp69TVtc1hTd65Zk5YOUc8+auRjddTG9bNvwioc2vrcxhtk3S8MwFwOjJMm3DKknMbIv1KWCXi4I7222zBgapu4pMmIosX4y5tTwd4M2yb1dNd/mdRXJuufIKUlyYtCW/beMGl6JrWf+onuV2Ca9nHv2XOrwnTRN1P5BMsGt/tAy7E/ar9WsHCMTkOsIylSNV57hsO7Jp/bcSALytsy30Yv1ekxZ0TMxnHvm5tB/NUlA/iAj2X9iF0+SOsNhy6+RW8NIAvLnIZae0e3j2v9d3KfLdGuSCtR+zbasZKXp9xP3CF24w8B1uG45YBmbqNy92/ese5bM3FOkARWBFvKyfUxkJiXUuhf0qRhCuA1xrHrVlTigORRDTmZKMzOqzYjhbSfm1zCSKnKSsRq0ze5muoaMGIzdUyQBFbEWyyB0c5Ey3YCSVq+ee/JLkjigzJEjwy0dZqQtw3NP9mIoSrLEcn0lxu4Pz7YTcyF8u1VGBRNfaoj23v1wZ3QYgx+BGC+yRMq0q/Sq80FPBFrDufNsGJEY8YlNn7RvDRagRnJH2Tj6hSYQ40WW5NaCwtW43jYrhrXnhi9GuG8rJg3xydLk0+nkX08gxtT3l4VpZ1h4rFwXvixGfBiDD0GadK940ZsEXJm6pwjWWr9NlxWDa7MQnhhl/X3MnJY/7J9Z1p4bh+zPEO7A2sRYi4M2q7iD0BXEUOYQDmP3FIdtY1L6EE7P2j3FoVsfSdxntvXWyoFi6HMWb47mh/yDHcKMaYqfw9spAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfyn+Kly7OBZVu/QAAAABJRU5ErkJggg==';
export const ACTIONS = {
  DELETE_GAME: 'deleteGame',
  COVER_GAME: 'coverGame',
  MODIFY_GAME: 'modifyGame',
  ADD_GAME: 'addGame',
  MODIFY_QUESTIONS: 'modifyQuestions',
  OPEN_ALERT: 'openAlert',
  CLOSE_ALERT: 'closeAlert',
  OPEN_POPUP: 'openPopup',
  CLOSE_POPUP: 'closePopup',
  CHANGE_INDEX: 'changeIndex',
  MODIFY_QUESTION: 'modifyQuestion',
  ADD_QUESTION: 'addQuestion',
  REFRESH_CONTROL: 'refreshControl',
  UNSAVE_GAMES: 'unSaveGames',
  SAVE_GAMES: 'SaveGames',

  // UPLOAD_PHOTO: 'uploadPhoto'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.DELETE_GAME:
      return {
        ...state,
        games: state.games.filter(game => {
          return game.id !== action.payload.id
        })
      }
    case ACTIONS.COVER_GAME:
      console.log({ ...state, games: action.payload.games })

      return { ...state, games: action.payload.games }
    case ACTIONS.MODIFY_GAME:
      return {
        ...state,
        saved: 'unsaved',
        games: state.games.map((g, i) => {
          if (i === action.payload.id) {
            return action.payload.newGame;
          } return g
        })
      }
    case ACTIONS.ADD_GAME:
      console.log('add')
      state.games.push({
        ...new Game(),
        id: action.payload.id
      })
      return { ...state }
    case ACTIONS.MODIFY_QUESTION:
      for (let i = 0; i < state.games.length; i++) {
        const game = { ...state.games[i] }
        if (game.id === action.payload.gid) {
          game.questions[action.payload.index] = action.payload.question
          break
        }
      }
      return { ...state, saved: 'unsaved' }
    case ACTIONS.MODIFY_QUESTIONS:
      for (let i = 0; i < state.games.length; i++) {
        const game = { ...state.games[i] }
        if (game.id === action.payload.gid) {
          game.questions = action.payload.questions
          break
        }
      }
      return { ...state, saved: 'unsaved' }
    case ACTIONS.UNSAVE_GAMES:
      return { state, saved: 'unsaved' }
    case ACTIONS.SAVE_GAMES:
      return { state, saved: 'saved' }
    default:
      return state
  }
}

export const GamesProvider = ({ children }) => {
  const [gamesState, dispatchGamesState] = useReducer(reducer, {
    games: [new Game()],
    unsavedList: [],
    saved: 'initial'
  })
  const [haveToken, setHaveToken] = useState(!!sessionStorage.getItem('token'))
  const [gamesIsLoading, setGamesIsLoading] = useState(true)
  console.log(sessionStorage.getItem('token'))
  console.log('usercontext render')

  async function getAllGames () {
    const gs = []
    console.log('get games')
    const token = sessionStorage.getItem('token')
    getAllQuizzes(token)
      .then(async (data) => {
        const promises = [];
        data.quizzes.forEach((q, i) => {
          promises.push(getQuiz(q.id)
            .then(data => {
              const g = new Game()
              Object.assign(q, data)
              Object.assign(g, q)
              gs.push(g);
            }))
        })
        return Promise.all(promises)
      }).then(() => {
        console.log('this is gs', gs)
        // if (gs.length !== 0) { dispatch({ type: ACTIONS.COVER_GAME, payload: { games: gs } }); }
        dispatchGamesState({ type: ACTIONS.COVER_GAME, payload: { games: gs } })
        setGamesIsLoading(false)
      })
  }

  useEffect(() => {
    if (haveToken) { getAllGames() }
  }, [haveToken])

  useEffect(() => {
    console.log('sav')
    if (gamesState === 'saved') {
      const promises = []
      for (const game of gamesState.games) {
        if (gamesState.unsavedList.includes(game.id)) {
          const Data = (({ questions, name, thumbnail }) => ({ questions, name, thumbnail }))(game)
          promises.push(updateQuiz(game.id, Data))
        }
      }
      Promise.all(promises)
        .then(data => console.log('all games saved!!'))
        .catch(e => { dispatchGamesState({ type: ACTIONS.UNSAVE_GAMES }) })
    }
  }, [gamesState.saved])
  return <UserContext.Provider value={{ haveToken, setHaveToken, gamesState, dispatchGamesState, gamesIsLoading }}>
                {children}
        </UserContext.Provider>
}

GamesProvider.propTypes = {
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
export const MediaProvider = ({ children }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width:481px)' })
  const isDevice = useMediaQuery({ query: '(max-width:480px)' })
  return <MediaContext.Provider value={{ isBigScreen, isDevice }}>
    {children}
  </MediaContext.Provider>
}
MediaProvider.propTypes = {
  children: PropTypes.any
}

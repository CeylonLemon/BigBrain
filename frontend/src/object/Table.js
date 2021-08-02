import React, { useContext, Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import CustomizedSwitches from './Switch';
import { TableButton } from './Button';
import Row from './Row.js'
import PropTypes from 'prop-types';
import { UserContext, ACTIONS } from '../helper/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import { addNewQuiz, updateQuiz } from '../helper/api';
import { Game } from './game';
import MediaQuery from 'react-responsive';

export const turn = {
  off: (dom) => {
    dom.dataset.selected = 'on'
    dom.style.background = 'lightcyan'
  },
  on: (dom) => {
    dom.dataset.selected = 'off'
    dom.style.background = ''
  },
  allOn: () => {
    const rows = document.getElementsByClassName('row')
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.background = 'lightcyan'
      rows[i].dataset.selected = 'on'
    }
  },
  allOff: () => {
    const rows = document.getElementsByClassName('row')
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.background = ''
      rows[i].dataset.selected = 'off'
    }
  }
}

export default function Table ({ rows, mediaSize }) {
  console.log(rows)
  const { dispatchGamesState } = useContext(UserContext)
  const header = ['ID', 'NAME', 'QUESTIONS', 'DURATION', 'BUTTON']
  const useStyles = makeStyles((theme) => ({
    buttons: {
      margin: '1vh 3vh 0 0',
      width: '22vh',
      height: '5vh',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontFamily: 'Oswald'
    },
    table: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-45%)',
      boxShadow: '1px 1px 5px black',
      minWidth: '400px',
      minHeight: '300px',
      width: '80%'
    },
    content: {
      maxHeight: '400px',
      overflow: 'scroll',
    }
  }))
  const classes = useStyles()

  const addQuiz = () => {
    let gameId;
    addNewQuiz('new Quiz')
      .then(data => {
        const id = data.quizId
        console.log('this is id', id)
        gameId = id
        const newQuiz = (({ questions, name, thumbnail }) =>
          ({ questions, name, thumbnail }))(new Game())
        console.log('this is data', newQuiz)
        return updateQuiz(id, newQuiz)
      })
      .then(() => {
        dispatchGamesState({
          type: ACTIONS.ADD_GAME,
          payload: { id: gameId }
        })
      })
  }

  return (
      <Fragment>
          <header>
              <Row key="table_header" row={header} mediaSize={mediaSize}/>
              <Divider variant="middle"/>
          </header>
          <div className={classes.content}>
              <MediaQuery minWidth={ 691 }>
                  {rows.map((r, i) => (
                      <Row
                          index={i}
                          key={r[0]}
                          row={r}
                          dispatchGames={dispatchGamesState}
                          mediaSize={mediaSize}
                      />
                  ))}
              </MediaQuery>
              <MediaQuery maxWidth={691}>
                  {rows.map((r, i) => (
                      <Row
                          index={i}
                          key={r[0]}
                          row={r}
                          dispatchGames={dispatchGamesState}
                          mediaSize={mediaSize}
                      />
                  ))}
              </MediaQuery>
          </div>

          <Divider variant="middle" style={{ marginBottom: '2vh' }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CustomizedSwitches/>
              <div className={classes.buttons}>
                  <TableButton variant="outlined" size='small' color="primary" name='addQuizButton' onClick={addQuiz}>
                      <span style={{ fontFamily: 'Oswald' }}>ADD QUIZ</span>
                  </TableButton>
                  <TableButton variant="outlined" size='small' name='deleteQuizButton' color="secondary">
                      <span style={{ fontFamily: 'Oswald' }}>DELETE</span>
                  </TableButton>
              </div>
          </div>
      </Fragment>

  );
}
Table.propTypes = {
  rows: PropTypes.array,
  mediaSize: PropTypes.string,
}

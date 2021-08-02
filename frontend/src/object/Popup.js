import React, { createRef, useContext, useEffect, useRef, useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { ACTIONS, UserContext } from '../helper/UserContext';
import { useHistory, useLocation } from 'react-router-dom';
import CircularIntegration from './CircularIntegration';
import { updateQuiz } from '../helper/api';
import QuestionEditor from './QuestionEditor';
import GameEditor from './GameEditor';
import { Question } from './game';

const styles = (theme) => ({

  root: {
    '&': {
      margin: 0,
      padding: theme.spacing(1, 1, 1, 2),
    },
    '& > button': {
      top: '2px'
    }

  },
  main: {
    width: '75%'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose
          ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                  <CloseIcon />
                </IconButton>
            )
          : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2, 1, 2),
    height: '150vh',
    width: '100%',
    boxSizing: 'border-box',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    '&': {
      margin: 0,
      padding: theme.spacing(0),
      height: '45px',
      justifyContent: 'flex-start'
    }

  },
}))(MuiDialogActions);

const switchQuestionInRefs = (refs, prevIndex, index) => {
  refs[prevIndex].current.style.display = 'none'
  refs[index].current.style.display = ''
}

const GAME_ACTION = {
  ADD_QUESTION: 'add-question',
  DELETE_QUESTION: 'delete-question',
  SWITCH_QUESTION: 'switch-question'
}

function Popup ({ mediaSize }) {
  console.log('popup render')
  const { gamesState, dispatchGamesState } = useContext(UserContext)
  const location = useLocation()
  const index = location.state ? location.state.index : 0
  const game = gamesState.games[index]
  const { name, thumbnail, questions } = game
  const history = useHistory()
  const gameEditorRef = useRef();

  const gameStateReducer = (prevState, action) => {
    switch (action.type) {
      case GAME_ACTION.ADD_QUESTION:
        return {
          questions: [...prevState.questions, new Question()],
          currentQuestion: prevState.currentQuestion,
          editorRefs: [...prevState.editorRefs, createRef()],
          editorSwitchRefs: [...prevState.editorSwitchRefs, createRef()],
        }
      case GAME_ACTION.DELETE_QUESTION:

        if (prevState.questions.length === 1) {
          alert('at least one question required!')
          break
        } else {
          if (prevState.currentQuestion === prevState.questions.length - 1) {
            switchQuestionInRefs(prevState.editorSwitchRefs, prevState.currentQuestion, 0)
          }
          return {
            currentQuestion: prevState.currentQuestion === prevState.questions.length - 1
              ? prevState.currentQuestion - 1
              : prevState.currentQuestion,
            questions: prevState.questions.filter((q, index) => {
              return index !== action.payload.index
            }),

            editorRefs: prevState.editorRefs.filter((q, index) => {
              return index !== action.payload.index
            }),
            editorSwitchRefs: prevState.editorSwitchRefs.filter((q, index) => {
              return index !== action.payload.index
            }),
          }
        }
      case GAME_ACTION.SWITCH_QUESTION:
        switchQuestionInRefs(prevState.editorSwitchRefs, prevState.currentQuestion, action.payload.page - 1)
        return {
          ...prevState,
          currentQuestion: action.payload.page - 1,
        }
    }
  }

  const [gameState, dispatchGameState] = useReducer(gameStateReducer, {
    questions,
    currentQuestion: 0,
    editorRefs: Array(questions.length).fill('').map(ref => createRef()),
    editorSwitchRefs: Array(questions.length).fill('').map(ref => createRef())
  })
  console.log(questions)
  const handleClose = () => {
    history.push({ pathname: '/home', state: { index } })
  }

  const handleSave = (loading, setLoading, setSuccess) => {
    if (loading) { return }
    const gameInfo = gameEditorRef.current.getGameInfo()
    const questions = gameState.editorRefs.map(ref => {
      return ref.current.getQuestionInfo()
    })
    const newGame = { ...gameInfo, questions }
    updateQuiz(game.id, newGame)
      .then(data => {
        dispatchGamesState({
          type: ACTIONS.MODIFY_GAME,
          payload: {
            newGame: Object.assign(game, newGame),
            id: index
          }
        })
        setLoading(false)
        setSuccess(true)
      })
  }

  const editorSwitch = (e, page) => {
    dispatchGameState({
      type: GAME_ACTION.SWITCH_QUESTION,
      payload: {
        page
      }
    })
  }
  const addQuestion = () => {
    dispatchGameState({
      type: GAME_ACTION.ADD_QUESTION
    })
  }

  const deleteQuestion = (index) => {
    return () => {
      dispatchGameState({
        type: GAME_ACTION.DELETE_QUESTION,
        payload: { index }
      })
    }
  }

  useEffect(() => {
    editorSwitch(null, 1)
  }, [])

  return (
      <Dialog
          onClose={handleClose}
          open={true}
          maxWidth={'md'}
          fullWidth={false}
          disablePortal={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ID:{game.id}
        </DialogTitle>
        <DialogContent dividers>
          <GameEditor
              ref={gameEditorRef}
              gameName={name}
              gameThumbnail={thumbnail}
              numberOfQuestions={gameState.questions.length}
              mediaSize={mediaSize}
              editorSwitch={editorSwitch}
              addQuestion={addQuestion}
              currentQuestion={gameState.currentQuestion}
          />
          {gameState.editorRefs.map((ref, index) => (
              <div ref={gameState.editorSwitchRefs[index]} key={gameState.questions[index].id} style={{ display: 'none' }} >
                <QuestionEditor
                    question={gameState.questions[index]}
                    editorSwitch={editorSwitch}
                    ref={ref}
                    deleteQuestion={deleteQuestion(index)}
                />
              </div>
          ))

          }

        </DialogContent>

        <DialogActions>
          <CircularIntegration handleButtonClick={handleSave}/>
        </DialogActions>
      </Dialog>
  );
}
Popup.propTypes = {
  props: PropTypes.object,
  mediaSize: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  game: PropTypes.object,
  editing: PropTypes.any,
  dispatchGames: PropTypes.func,
  alert: PropTypes.object,
  dispatchAlert: PropTypes.func,
  dispatchControl: PropTypes.func,
  QIndex: PropTypes.number
}
export default React.memo(Popup);

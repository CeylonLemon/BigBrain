import React, { createRef, forwardRef, useImperativeHandle, useReducer } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PaginationLink from './Pagination';
import { useLocation } from 'react-router-dom';
import SubPanel from './SubPanel';
import { FileInput, AddButton } from './Button';
import { ACTIONS } from '../helper/UserContext';
import { fileToDataUrl } from '../helper/helper';
import { Question } from './game';
import { DeleteQuestion } from './icons';
// import Draggable from 'react-draggable';

const useStyles = makeStyles({
  root: {
    maxWidth: '85%',
    margin: '0 auto',
    height: '47%',
  },
  pagi: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    height: '3vh',
    padding: '0 0 1vh 0',
  },
  title: {
    height: '6vh',
    fontWeight: 'bold',
    padding: '1vh'

  },
  subPanel: {
    width: '50vh',
    position: 'absolute',
    top: '8.5vh',
    left: '47%',
    height: '77vh',
    zIndex: '2'
  },
  smallSubPanel: {
    width: '95%',
    position: 'absolute',
    top: '8.5vh',
    left: '0',
    zIndex: '2'
  },
})
const LOCAL_ACTIONS = {
  CHANGE_PHOTO: 'change-photo',
  ADD_QUESTION: 'add-question',
  SWITCH_QUESTION: 'switch-question',
  ADD_OPTION: 'add-option',
  DELETE_QUESTION: 'delete-question',
  OPEN_EDITOR: 'open-editor'
}

const SubPanelController = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      getQuestions () {
        const formData = localQuestions.refs.map((r, i) => {
          const textFieldsInSubPanel = Array.from(r.current.getElementsByTagName('input'))
          // const arr = Array.from(array)
          const [basic, options, answers] = [[], [], []]
          for (let i = 0; i < textFieldsInSubPanel.length; i++) {
            if (i < 4) { basic.push(textFieldsInSubPanel[i].value) } else {
              if (textFieldsInSubPanel[i].type === 'text') {
                options.push(textFieldsInSubPanel[i].value)
                if (textFieldsInSubPanel[i + 1].checked) {
                  answers.push(textFieldsInSubPanel[i].value)
                }
              }
            }
          }
          const thumbnail = localQuestions.questions[localQuestions.index].thumbnail
          return ((
            title,
            selection,
            points,
            duration,
            options,
            answers,
            thumbnail
          ) =>
            ({
              title,
              selection,
              points,
              duration,
              options,
              answers,
              thumbnail
            }))(...basic, options, answers, thumbnail)
        })
        console.log(formData)
        return formData
      }

    })
  )
  const { id, questions, dispatchGames, mediaSize } = props

  const location = useLocation()
  const reducer = (state, action) => {
    switch (action.type) {
      case LOCAL_ACTIONS.CHANGE_PHOTO:
        state.questions[state.index] = {
          ...action.payload.question
        }
        return { ...state }

      case LOCAL_ACTIONS.ADD_QUESTION:
        return {
          index: state.index,
          questions: [...state.questions, new Question()],
          refs: [...state.refs, createRef()]
        }
      case LOCAL_ACTIONS.DELETE_QUESTION:
        if (state.questions.length > 1) {
          if (state.index === state.questions.length - 1) {
            window.history.pushState({
              ...location.state,
              id: state.index - 1,
            }, '1', `/home/question${state.index}`)
          }
          state.refs.forEach((r, i) => {
            r.current.style.display = i === state.index - 1 ? '' : 'none'
          })
          return {
            index: state.index === state.questions.length - 1
              ? state.index - 1
              : state.index,
            questions: state.questions.filter((question, i) => {
              return i !== action.payload.index
            }),
            refs: state.refs.filter((question, i) => {
              return i !== action.payload.index
            })
          }
        } else {
          return state
        }
      case LOCAL_ACTIONS.SWITCH_QUESTION:
        state.refs.forEach((r, i) => {
          r.current.style.display = i === action.payload.id ? '' : 'none'
        })
        return {
          index: action.payload.id,
          questions: state.questions,
          refs: state.refs
        }

      case LOCAL_ACTIONS.ADD_OPTION:
        return {
          ...state,
          // questions: [...state.questions,new Question()]
        }

      case LOCAL_ACTIONS.OPEN_EDITOR:
        console.log(state.refs[state.index].current.style.display)
        state.refs[state.index].current.style.display =
            state.refs[state.index].current.style.display === '' ? 'none' : ''
        console.log(state.refs[state.index].current.style.display)
        return state
    }
  }
  const classes = useStyles();
  const initializer = {
    questions: questions,
    refs: Array(questions.length).fill('').map(e =>
      createRef()
    ),
    index: 0
  }
  const [localQuestions, dispatch] = useReducer(reducer, initializer)
  const handleChange = (e, page) => {
    window.history.pushState({
      ...location.state,
      id: page - 1,
    },
    '1', `/home/question${page}`)
    dispatch({
      type: LOCAL_ACTIONS.SWITCH_QUESTION,
      payload: {
        id: page - 1
      }
    })
  }

  const deleteQuestion = (index) => {
    return () => {
      dispatch({
        type: LOCAL_ACTIONS.DELETE_QUESTION,
        payload: {
          index
        }
      })
    }
  }
  const handleUpload = (e) => {
    const file = e.target.files[0]
    fileToDataUrl(file)
      .then(thumbnail => {
        const newQuestion = { ...localQuestions.questions[localQuestions.index], thumbnail }
        dispatch({
          type: LOCAL_ACTIONS.CHANGE_PHOTO,
          payload: {
            question: newQuestion
          }
        })
        dispatchGames({
          type: ACTIONS.MODIFY_QUESTION,
          payload: {
            gid: id,
            index: localQuestions.index,
            question: newQuestion
          }
        })
        e.target.value = ''
      })
  }

  const addQuestion = () => {
    dispatch({
      type: LOCAL_ACTIONS.ADD_QUESTION
    })
  }

  const openEditor = () => {
    console.log('open')
    dispatch({
      type: LOCAL_ACTIONS.OPEN_EDITOR
    })
  }
  return (
      <Card className={classes.root}>
        {localQuestions.questions.map((q, i) => (
            // <Draggable key={id + 'question' + i} cancel='input, svg'>
            //   {
            //     mediaSize === 'small'
            //       ? <div className={classes.smallSubPanel} style={{ left: '10%' }}>
            //           <SubPanel
            //               id={i}
            //               ref={localQuestions.refs[i]}
            //               question={q}
            //               handleClose={openEditor}
            //               mediaSize={mediaSize}
            //           />
            //         </div>
            //       : <div className={classes.subPanel}><SubPanel
            //             id={i}
            //             ref={localQuestions.refs[i]}
            //             question={q}
            //             handleClose={openEditor}
            //             mediaSize={mediaSize}
            //         />
            //         </div>
            //   }
            //
            // </Draggable>
            <SubPanel
                        id={i}
                        ref={localQuestions.refs[i]}
                        question={q}
                        handleClose={openEditor}
                        mediaSize={mediaSize}
                        key={i}
                    />

        ))}

        <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={localQuestions.questions[localQuestions.index].thumbnail}
            title="Contemplative Reptile"
        />

        <CardContent className={classes.title}>
          {localQuestions.questions[localQuestions.index].title}
        </CardContent>

        <CardActions className={classes.pagi}>
          <PaginationLink handleChange={handleChange} pages={localQuestions.questions.length}/>
        </CardActions>

        <CardActions className={classes.buttons}>
          <AddButton handleClick={addQuestion}/>
          <FileInput
              handleChange={handleUpload}
              style={{ height: '3vh', width: '3vh' }}
              id='subPanelFile'
          />
          <DeleteQuestion
              handleClick={deleteQuestion(localQuestions.index)}
              style={{ height: '2.5vh', width: '3vh', paddingBottom: '0.5vh' }}
          />
          <button onClick={openEditor} style={{ cursor: 'pointer' }}>edit</button>
        </CardActions>
      </Card>
  );
})
SubPanelController.propTypes = {
  prop: PropTypes.any,
  id: PropTypes.any,
  questions: PropTypes.array,
  dispatchGames: PropTypes.func,
  index: PropTypes.number,
  mediaSize: PropTypes.string,

}
SubPanelController.displayName = 'SubPanelController'
export default React.memo(SubPanelController)

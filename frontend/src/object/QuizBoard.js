import React, { forwardRef, useContext, useImperativeHandle, useRef, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { StopButton, StartButton } from './Button'
import PropTypes from 'prop-types';
import OptionsGrid from './OptionsGrid';
import Timer from './Timer'
import { getCurrentQuestion, getAnswers, endGame, advanceGame } from '../helper/api';
import { UserContext } from '../helper/UserContext';
import { findGameById } from './helpers';
import { NotAnswered, Correct, InCorrect } from './icons';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    height: '90%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  },
  mediaCard: {
    height: '100%',
    width: '50vh'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  mediaAndController: {
    margin: theme.spacing(3, 3, 0, 3),
    display: 'flex',

    height: '35vh',
  },
  controller: {
    backgroundColor: '#ff80b3',
    display: 'flex',
    flexDirection: 'column',
    width: '40vh',
    marginLeft: theme.spacing(3),
  },
  buttons: {
    display: 'flex',
  },
  timer: {

    paddingTop: '2vh',
    flex: '1 0 auto',
    height: '40%',
    '& .MuiCircularProgress-colorSecondary': {
      color: 'white',
    }
  },
  questionTitle: {
    fontWeight: 'bold',
    fontSize: '2em',
    marginLeft: theme.spacing(2),
  },
  questionSigns: {
    height: '30%',
    boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)',

    margin: theme.spacing(2)
  },
  content: {
    flex: '1 1 auto'
  },
  answersInfo: {
    margin: theme.spacing(2)
  }
}));

const endThisGame = (gid, history) => {
  return () => {
    endGame(gid)
      .then(() => {
        history.push('/home')
      })
  }
}

const advanceThisGame = (gid) => {
  return () => {
    advanceGame(gid)
      .catch(e => alert(e))
  }
}

const QuizBoard = forwardRef((props, ref) => {
  useImperativeHandle(ref,
    () => ({
      hostAdvanceGame () {
        setQuestion(prevState => ({
          question: game.questions[prevState.stage + 1],
          stage: prevState.stage + 1,
          result: [],
          correct: prevState.correct
        }))
      },
      playerAdvanceGame () {
        getCurrentQuestion(pid)
          .then(data => {
            setQuestion(prevState => ({
              question: data.question,
              stage: prevState.stage + 1,
              result: [],
              correct: prevState.correct
            }))
          })
      }

    })
  )
  const classes = useStyles();
  const { gid, pid, questionForPlayer, numOfQuestions } = props
  const { gamesState } = useContext(UserContext)
  const game = useMemo(() => { return findGameById(gamesState.games, gid) }, [])
  const initQuestion = questionForPlayer || game.questions[0]

  const [question, setQuestion] = useState({
    question: initQuestion,
    stage: 0,
    result: [],
    correct: Array(parseInt(numOfQuestions || game.questions.length)).fill('').map(ele => 'unanswered')
  })
  console.log(Array(numOfQuestions), question.correct)
  const history = useHistory()
  const ansRef = useRef()

  const getAnswerSheet = () => {
    const selections = Array.from(ansRef.current.children)
      .map(ele => ele.children[0].dataset.selected)
    return question.question.options.filter((option, i) => {
      return selections[i] === 'true'
    })
  }

  const getResultByPlayer = async () => {
    const returnData = await getAnswers(pid);
    // const returnData = await getResult(pid);
    const answers = returnData.answerIds
    const answerSheet = getAnswerSheet()
    setQuestion(prevState => ({
      ...prevState,
      result: quizQuestionGetResult(question.question, answers, answerSheet),
      correct: prevState.correct.map((ele, i) => {
        return i === prevState.stage ? JSON.stringify(answers) === JSON.stringify(answerSheet) : ele
      })
    }))
  }

  const quizQuestionGetResult = (question, answers, answerSheet) => {
    return question.options.map(option => {
      if (!answers.includes(option) && !answerSheet.includes(option)) {
        return 'true-negative'
      } else if (answers.includes(option) && !answerSheet.includes(option)) {
        return 'false-negative'
      } else if (answers.includes(option) && answerSheet.includes(option)) {
        return 'true-positive'
      } else {
        return 'false-positive'
      }
    })
  }

  return (
      <Card className={classes.root}>
          <Box className={classes.mediaAndController}>
              <Card className={classes.mediaCard}>
                  <CardMedia
                      className={classes.media}
                      image={question.question.thumbnail}
                      title="Contemplative Reptile"
                  />
              </Card>
              <Card className={classes.controller}>
                  {pid
                    ? undefined
                    : <CardActions className={classes.buttons}>
                          <StopButton handleClick={endThisGame(gid, history)} text={'结束游戏'}/>
                          <StartButton handleClick={advanceThisGame(gid)} text={'下一题'}/>
                      </CardActions>
                  }
                  <Box className={classes.timer}>
                    {
                      pid
                        ? <Timer
                              question={question.question}
                              handleArrival={getResultByPlayer}
                          />
                        : <Timer question={question.question}/>
                    }
                  </Box>
              </Card>
          </Box>
          <CardContent className={classes.content}>
              <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.questionTitle}
              >
                  {question.question.title}
              </Typography>
              <OptionsGrid
                  options={question.question.options}
                    ansRef={ansRef}
                  result={question.result}
              />
              <Paper className={classes.questionSigns}>
                  {<Box>
                          {question.correct.map(correct => {
                            if (correct === true) {
                              return <Correct style={{ width: '30px', height: '30px', padding: '5px' }}/>
                            } else if (correct === false) {
                              return <InCorrect style={{ width: '30px', height: '30px', padding: '5px' }}/>
                            } else {
                              return <NotAnswered style={{ width: '30px', height: '30px', padding: '5px' }}/>
                            }
                          })}
                      </Box>
                  }
                  <Box className={classes.answersInfo}>
                      <span>{`已回答: ${question.stage}/${pid ? numOfQuestions : game.questions.length}`}</span>
                  </Box>
              </Paper>
          </CardContent>
      </Card>
  );
})
QuizBoard.displayName = 'QuizBoard'
QuizBoard.propTypes = {
  pid: PropTypes.number,
  gid: PropTypes.number,
  numOfQuestions: PropTypes.number,
  player: PropTypes.bool,
  questionForPlayer: PropTypes.object,
}
export default React.memo(QuizBoard)

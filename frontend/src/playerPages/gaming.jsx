import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCorrect, getQuestion, getResult, putAnswers } from '../helper/request';
import { Question } from '../object/question';
import { Question as Q } from '../object/game';
import { CountDownTimer } from '../object/countDownTimer';
import { Container } from '@material-ui/core';

export function Gaming () {
  const [curStage, setCurStage] = React.useState('notStart');
  const [question, setQuestion] = React.useState(new Q());
  const [pending, setPending] = React.useState(true);
  const [end, setEnd] = React.useState(false)
  const [ans, setAns] = React.useState([])
  const [Correct, setCorrect] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const { pid } = useParams();
  const history = useHistory();

  function submitAnswers () {
    putAnswers(pid, ans)
      .then((data) => { console.log(data) })
      .catch(e => { console.log(e) })
  }

  function showResult () {
    getResult(pid)
      .then(data => {
        history.push({
          pathname: '/gameEnd/' + pid,
          state: { result: score.toString() + '/' + totalScore.toString() }
        });
      })
  }

  function getCorrectAnswer () {
    getCorrect(pid)
      .then(data => {
        setCorrect(data.answerIds);
        if (JSON.stringify(data.answerIds.sort()) ===
            JSON.stringify(ans.sort())) {
          setScore(score + parseInt(question.points))
        }
      })
  }

  useEffect(() => {
    submitAnswers();
  }, [ans])

  useEffect(() => {
    if (pending && curStage !== 'notStart') {
      getCorrectAnswer();
    }
    function checkStage () {
      getQuestion(pid).then(data => {
        if (data.question.qid !== curStage || curStage === 'notStart') {
          setQuestion(data.question)
          setCurStage(data.question.qid);
          setPending(false);
          setCorrect(false);
          setStage(stage + 1);
          const s = totalScore + parseInt(data.question.points);
          setTotalScore(s);
        } else {
          if (pending) {
            setTimeout(function () {
              checkStage(pid)
            }, 1500)
          }
        }
      }).catch(e => {
        setPending(false);
        showResult();
        setEnd(true);
      })
    }
    if (pending && !end) {
      checkStage();
    }
    if (!pending) {
      setAns([]);
    }
  }, [pending])

  return <>
    <h2>Play!</h2>
      <div><Question q={question} setAns = {setAns} ans={ans} mode={'player'}/></div>
      <div><CountDownTimer stage={stage} tl={question.limit} setFinished={setPending}/></div>

    {(Correct)
      ? <Container>
          <div>Correct Answer:
            {Correct.map((a, i) =>
                <span key={i}>{a} </span>
            )}
          </div>
          <div>Your Answer:
            {ans.map((a, i) =>
                <span key={i}>{a} </span>
            )}
          </div>
        </Container>

      : undefined
    }

    </>
}

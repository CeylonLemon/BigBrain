import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { sendRequest } from '../helper/api';
import { UserContext } from '../helper/UserContext';
import { Question } from '../object/question';
import { CountDownTimer } from '../object/countDownTimer';
// import { sleep } from '../helper/helper';

export function StartGame () {
  // const { stage } = useParams();
  const { token } = useContext(UserContext);
  const history = useHistory();
  const game = useLocation().state.game;
  const qs = game.questions;
  const [stage, setStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(qs[stage].limit)
  console.log(stage)
  console.log(qs)
  console.log(qs[stage])
  console.log(qs[stage].limit)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setTimeLeft(qs[stage].limit)
  }, [stage])

  function advanceGame () {
    // if not reach the last question, jump to next question
    if (stage < game.questions.length - 1) {
      console.log(game.questions.length)
      console.log(stage)
      console.log(stage < game.questions.length - 1)
      sendRequest('admin/quiz/' + game.id + '/advance', false, 'POST', token)
        .then(async data => {
          console.log(data)
          console.log(data.stage)
          console.log(qs)
          setStage(data.stage)

          setFinished(false)
        });
      // if reach the end, stop this game
    } else {
      sendRequest('admin/quiz/' + game.id + '/end', false, 'POST', token)
        .then(data => {
          history.push('/home');
        });
    }
  }

  function endGame () {
    sendRequest('admin/quiz/' + game.id + '/end', false, 'POST', token)
      .then(() => {
        history.push('/home')
      })
  }

  return <>
        <h2>Stage {stage}</h2>

         <div>
              <Question q={qs[stage]} mode={'admin'}/>
              <CountDownTimer stage={stage} setFinished={setFinished} tl={timeLeft}/>
            </div>

      {(finished)
        ? <button
              onClick={() => {
                advanceGame();
              }}
                type='advanceGame'
          >Advance</button>
        : undefined
      }

      <button onClick={() => { endGame(); }} type='stopGame'>Stop</button>

    </>
}

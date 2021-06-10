import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { sendRequest } from '../helper/api';
import { UserContext } from '../helper/UserContext';
// import { Question } from '../object/question';
import { CountDownTimer } from '../object/countDownTimer';
// import { sleep } from '../helper/helper';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Option from '../object/Option';
import { BlankPic } from '../helper/helper';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export function StartGame () {
  // const { stage } = useParams();
  const { token } = useContext(UserContext);
  const history = useHistory();
  const game = useLocation().state.game;
  const qs = game.questions;

  const [stage, setStage] = useState(0);
  // const question = qs[stage]
  const [timeLeft, setTimeLeft] = useState(qs[stage].limit)
  const [finished, setFinished] = useState(false)
  const [selected, setSelected] = useState(Array.from({
    length: qs[stage].options.length
  }).map(x => false))
  const classes = useStyles();
  useEffect(() => {
    setTimeLeft(qs[stage].limit)
  }, [stage])

  console.log(selected)
  const optionsStyle = {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    padding: '10px',
    columnGap: '10px',
  }

  const mainStyle = {
    borderRadius: '10px',
    border: '2px solid grey',
    position: 'fixed',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '63%'
  }

  function advanceGame () {
    // if not reach the last question, jump to next question
    if (stage < game.questions.length - 1) {
      sendRequest('admin/quiz/' + game.id + '/advance', false, 'POST', token)
        .then(async data => {
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

  return <div style={mainStyle}>

          <div style={{
            boxSizing: 'border-box',
            textAlign: 'center',
            width: '420px',
            height: '320px',
            borderRadius: '15px',
            padding: '15px 0 0 0',
            margin: '0 0 0 15px'
          }}>
              <img src={BlankPic} style={{ width: '95%', height: '95%' }}/>
          </div>

          <div style={optionsStyle}>
              {qs[stage].options.map((o, i) =>
                  <Option o={o} key={i}
                          index = {i}
                          setSelected={setSelected}
                          selected={selected}
                  />
              )}
          </div>
          <CardActions>
              <Avatar aria-label="recipe" className={classes.avatar}>
                  <CountDownTimer stage={stage} setFinished={setFinished} tl={timeLeft}/>
              </Avatar>

              <Button size="medium" color="primary">
                  Share
              </Button>
              <Button size="medium" color="primary" onClick={() => { endGame(); }}>
                  STOP
              </Button>
              {(finished)
                ? <Button
                      onClick={() => {
                        advanceGame();
                      }}
                      size="medium"
                      color="primary"
                  >Advance</Button>
                : undefined
              }
          </CardActions>
    </div>
}

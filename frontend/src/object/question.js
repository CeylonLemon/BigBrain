import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import { BlankPic } from '../helper/UserContext';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Option from './Option';
export function Question ({ q, ans, setAns, mode }) {
  useEffect(() => {
    if (mode === 'admin') return
    const cbs = document.getElementsByClassName('cb');
    console.log(cbs)
    Array.from(cbs).forEach((e, i) => {
      e.checked = false;
    })
  }, [q])

  const optionsStyle = {
    ColumnCount: 3,
    ColumnBreakInside: 'avoid'
  }
  function modifyAnswers (idx) {
    if (mode !== 'player') return
    const answers = [...ans];
    (answers.includes(q.options[idx]))
      ? answers.splice(idx, 1)
      : answers.push(q.options[idx]);
    setAns(answers);
  }
  return <div>
    <Typography gutterBottom variant="h5" component="h2">
      Question
    </Typography>
      <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image= {BlankPic}
          title="Contemplative Reptile"
      />

      <CardContent>

        <div style={optionsStyle} >

          {q.options.map((o, i) =>
                <Option key={i} onClick={modifyAnswers()}/>

          )}
        </div>

      </CardContent>
    </div>
}

Question.propTypes = {
  q: PropTypes.object,
  ans: PropTypes.array,
  setAns: PropTypes.func,
  mode: PropTypes.string
};

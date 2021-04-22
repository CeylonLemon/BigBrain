import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Question ({ q, ans, setAns, mode }) {
  useEffect(() => {
    if (mode === 'admin') return
    const cbs = document.getElementsByClassName('cb');
    console.log(cbs)
    Array.from(cbs).forEach((e, i) => {
      e.checked = false;
    })
  }, [q])

  function modifyAnswers (idx) {
    if (mode !== 'player') return
    const answers = [...ans];
    (answers.includes(q.options[idx]))
      ? answers.splice(idx, 1)
      : answers.push(q.options[idx]);
    setAns(answers);
  }
  return <>
           <div>Question:{q.title}</div>
            {q.options.map((o, i) =>
              <div key={i + q.qid}>{o}
                <input className='cb' type='checkbox'
                      onChange={(e) => {
                        modifyAnswers(i);
                      }} defaultChecked={false}/></div>
            )}
        </>
}

Question.propTypes = {
  q: PropTypes.object,
  ans: PropTypes.array,
  setAns: PropTypes.func,
  mode: PropTypes.string
};

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { sleep } from '../helper/helper'

export function CountDownTimer ({ stage, tl, setFinished }) {
  // console.log(parseInt(tl))
  const [timeLeft, setTimeLeft] = React.useState(parseInt(tl));
  async function countDown () {
    if (timeLeft > 1) { setTimeLeft(timeLeft - 1); } else {
      setTimeLeft(timeLeft - 1);
      await sleep(1000);
      setFinished(true);
    }
  }

  useEffect(() => {
    console.log('st')
    console.log(tl)
    setTimeLeft(tl);
  }, [stage])

  useEffect(() => {
    if (timeLeft === 0) return
    const interval = setInterval(countDown, 1000);
    return () => { clearInterval(interval) }
  }, [timeLeft])

  return <div>TimeLeft: {timeLeft}</div>
}

CountDownTimer.propTypes = {
  stage: PropTypes.number,
  tl: PropTypes.string,
  setFinished: PropTypes.func
}

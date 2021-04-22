import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { CopyButton } from '../helper/copyButton.js';
import { sendRequest } from '../helper/api';
import { sleep } from '../helper/helper';

export function WaitingRoom () {
  const { sessionId } = useParams();
  const { playerId } = useParams();
  const history = useHistory();
  const [started, setStarted] = React.useState(false)

  useEffect(() => {
    async function checkIfStart () {
      let started = false
      while (!started) {
        await sendRequest('play/' + playerId + '/status', false, 'GET', false)
          .then(data => {
            started = data.started;
          }).then(await sleep(500))
      }
      history.push('/gaming/' + playerId);
      setStarted(true);
    }
    if (!started) { checkIfStart(); }
  }, [])

  return <> <h2>Waiting for host to start game...</h2>
    <div>SessionID: {sessionId}</div>
    <div>playerId: {playerId}</div>
    <div>Invite other player to join in</div>
    <CopyButton text={'localhost:3000/joinGame/' + sessionId}/>
    </>
}

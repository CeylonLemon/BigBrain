import React from 'react';
import { sendRequest } from '../helper/api';
import { useHistory, useParams } from 'react-router-dom'
import { Container } from '@material-ui/core';

export function JoinGame () {
  const history = useHistory();
  const { sessionId } = useParams();
  const [name, setName] = React.useState('');
  const joinGame = () => {
    sendRequest('play/join/' + sessionId, { name: name },
      'POST', false)
      .then(data => {
        return data.playerId
      })
      .then((pid) => {
        history.push('/waitingRoom/' + sessionId + '/' + pid,
        )
      })
  }
  return <Container style={{ marginTop: '100px' }}>
    <div>
        Your name:<input type='text' onChange={(e) => { setName(e.target.value) }}/>
    </div>
        <button onClick={joinGame}>confirm</button>
    </Container>
}

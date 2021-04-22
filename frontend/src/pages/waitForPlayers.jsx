import React, { useContext } from 'react'
import { sendRequest } from '../helper/api';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../helper/UserContext';
import { CopyButton } from '../helper/copyButton.js'

export function WaitForPlayers () {
  const history = useHistory();
  const { pin } = useParams();
  const { token } = useContext(UserContext);
  const game = useLocation().state.game;

  function startGame () {
    sendRequest('admin/quiz/' + game.id + '/advance', false, 'POST', token)
      .then(data => {
        history.push({
          pathname: '/startGame',
          state: { game: game }
        })
      })
  }

  function endGame () {
    sendRequest('admin/quiz/' + game.id + '/end', false, 'POST', token)
      .then(() => {
        history.push('/home')
      })
  }

  return <><h2>Game PIN: {pin}</h2>
  <h2>Waiting for players...</h2>
    <CopyButton text={'localhost:3000/joinGame/' + pin}/>
    <button
        onClick={() => { startGame(); }}
        type='startGame'
    >start</button>
    <button onClick={() => {
      endGame();
    }}
    type='stopGame'>end</button>
    </>
}

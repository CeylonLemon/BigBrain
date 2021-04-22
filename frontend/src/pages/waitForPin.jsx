import React, { useContext } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../helper/UserContext';
import { sendRequest } from '../helper/api';

export function WaitForPin () {
  const { token } = useContext(UserContext);
  const { id } = useParams();
  const game = useLocation().state.game;
  const history = useHistory();

  React.useEffect(() => {
    // send start request
    sendRequest('admin/quiz/' + id + '/start', false, 'POST', token)
    // get pin
      .then(() => { return sendRequest('admin/quiz/' + id, false, 'GET', token) })
      .then(data => { return data.active })
    // jump to game page
      .then(pin => {
        history.push({
          pathname: '/waitForPlayers/' + pin,
          state: { game: game }
        })
      })
  }, [])

  return <>
    <div>GameID: {id}</div>
    <h2>Wait for pin...</h2>
  </>
}

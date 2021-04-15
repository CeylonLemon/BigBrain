import React, { useContext, useEffect } from 'react';
// import { EditButton } from '../helper/button';
import { GameComponent } from '../object/gameComponent';
import { sendRequest } from '../helper/api';
import { initGame } from '../object/game';
import { UserContext } from '../helper/UserContext';
import { Link } from 'react-router-dom';

export function Home () {
  const { token } = useContext(UserContext);
  const [games, setGames] = React.useState([]);
  const [gamesUpdated, setGamesUpdated] = React.useState(false);
  console.log(token);

  // Update game list whenever any of games modified
  useEffect(() => {
    // get all of quiz ids
    // console.log('games updated!!')
    sendRequest('admin/quiz', false, 'GET', token)
      .then(data => {
        const quizzes = [];
        data.quizzes.forEach((q, i) => {
          quizzes.push(q);
        })
        return quizzes
      })
      .then(quizzes => {
        quizzes.forEach((q, i) => {
          sendRequest('admin/quiz/' + q.id, false, 'GET', token)
            .then(data => {
              q.questions = data.questions;
              q.owner = data.owner;
            })
        })
        return quizzes;
      })
      .then(quizzes => { setGames(quizzes) });
  }, [gamesUpdated])

  // delete game when button triggered
  function deleteGame (id) {
    console.log('before delete', games)
    // send request
    sendRequest('admin/quiz/' + id, false, 'DELETE', token)
    // update game list
      .then(() => {
        // setGamesUpdated(true);
        const gs = [...games];
        // console.log(1, gs)
        for (let i = 0; i < gs.length; i++) {
          if (gs[i].id === id) {
            gs.splice(i, 1);
            break;
          }
        }
        console.log('after delete', gs)
        setGames(gs);
        console.log('after delete', games)
      })
  }

  return <>
        <h2>Home</h2>
        <div>
            <Link to={{
              pathname: '/editGames/newGame',
              state: {
                game: initGame(),
                // setUpdate: setGamesUpdated
              }
            }}>
                <button>
                    Add Game
                </button>
            </Link>
            <h2>Game played</h2>
            <div>
                {games.map((g, i) => <div key={i}><GameComponent setgames={setGames} setupdate={setGamesUpdated}
                game={g}/> <button id={g} onClick={() => { deleteGame(g.id); }}>Delete</button></div>)}

            </div>
        </div>
    </>
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJpYXQiOjE2MTgzMzAwNzh9.OaFvYQP46W79TVfAiPBs0ws_d2Bwx1TMb2DOVyHFKG4
// 350804664

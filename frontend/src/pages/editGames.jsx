import React, { useContext } from 'react';
import { EditQuestion } from '../object/editQuestion';
// import { Question } from '../object/game';
import { Link, Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { sendRequest } from '../helper/api';
import { UserContext } from '../helper/UserContext';
import { initQuestion } from '../object/game';
// import { initGame } from '../object/game';

export function EditGames () {
  const { token } = useContext(UserContext);
  const game = useLocation().state.game;
  const curPath = useLocation().pathname;
  const history = useHistory();
  console.log('in editgames,', game);
  // console.log('editgames, id:', game.id);
  const [Game, setGame] = React.useState(game);
  const [questions, setQuestions] = React.useState(game.questions);
  const [name, setName] = React.useState(game.name);
  // Upload the game if it was modified
  React.useEffect(() => {
    // initialize request body
    const Data = {
      questions: game.questions,
      name: game.name,
      thumbnail: game.thumbnail
    };
    console.log(Data)
    // if it is a new game, apply for an empty game
    if (game.id === 'newGame') {
      // console.log(game)
      sendRequest('admin/quiz/new', { name: game.name }, 'POST', token)
        .then(data => {
          // success, get id of new game
          sendRequest('admin/quiz', false, 'GET', token)
            .then(data => {
              return data.quizzes[data.quizzes.length - 1].id;
            })
          // update this game
            .then(id => {
              sendRequest('admin/quiz/' + id, Data, 'PUT', token)
                .then(() => {
                  game.id = id;
                  setGame(game);
                }).then(() => {
                  console.log('after uplaod,', game)
                }
                )
              // .then(data => {
              //   setUpdate(true);
              // })
            })
        })
    } else {
      sendRequest('admin/quiz/' + Game.id, Data, 'PUT', token)
      // .then(data => {
      //   setUpdate(true);
      // })
    }
  }, [Game])
  return <div>
    <div>
      Game name:
      <input type="text" onChange={(e) => { setName(e.target.value) }} value={name}/>
    </div>

      {
        // <div>Add picture <input type="text" onChange={(e)=>{setName(e.target.value)}/></div>
          questions.map((q, i) => <Link to={{
            pathname: '/editGames/' + game.id + '/question' + i,
            state: {
              game: game
            }
          }} key={i}>{i}</Link>)}
          <Switch>{
              questions.map((q, i) => <Route path={'/editGames/' + game.id + '/question' + i} key={i}>
                <EditQuestion questions={game.questions} question={q} setGame={setGame}
                              setQs={setQuestions} idx={i}/></Route>)}
          </Switch>
          <Redirect to={{
            pathname: '/editGames/' + game.id + '/question0',
            state: {
              game: game
            }
          }}/>
          <button onClick={ () => {
            game.name = name;
            game.questions = questions;
            setGame(game);
          }
          }>Submit Change</button>
    <button onClick={() => {
      game.questions.push(initQuestion());
      setQuestions(game.questions);
      console.log(game.questions);

      const curQnumber = curPath.substr(curPath.length - 1)
      history.push({
        pathname: '/editGames/' + game.id + '/question' + curQnumber,
        state: {
          game: game
        }
      });
    }
    }
    >Add question</button>

  </div>
}

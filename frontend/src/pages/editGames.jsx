import React, { useContext, useEffect } from 'react';
import { EditQuestion } from '../object/editQuestion';
import { Link, Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { initQuestion } from '../object/game';
import { sendRequest } from '../helper/api';
import { BlankPic, UserContext } from '../helper/UserContext';
import { SaveButton } from '../object/Button';
import { Container } from '@material-ui/core';
// import { Contain } from '../object/editQuestion.element';
import {
  Contain,
  QNavigator,
  Wrapper,
  Buttons,
  EditGamesContainer
  // QuestionEditor
} from '../object/editQuestion.element';
import { fileToDataUrl } from '../helper/helper';

export function EditGames () {
  const { token } = useContext(UserContext);
  const game = useLocation().state.game;
  const history = useHistory();
  const [Game, setGame] = React.useState(game);
  const [questions, setQuestions] = React.useState(game.questions);
  const [name, setName] = React.useState(game.name);
  const [picture, setPicture] = React.useState(BlankPic);
  // const [loading, setLoading] = React.useState(true);
  // const [addQ, setAddQ] = React.useState(false)
  const ids = [];
  console.log(questions)

  useEffect(() => {
    if (game.thumbnail) setPicture(game.thumbnail);
  }, [game])

  function submitChange () {
    game.name = name;
    game.questions = questions;
    // upload game
    const Data = {
      questions: game.questions,
      name: game.name,
      thumbnail: game.thumbnail
    };
    console.log('i have this data', Data)
    // if it is a new game, apply for an empty game
    if (game.id === 'newGame') {
      // get ids of previously added games
      sendRequest('admin/quiz', false, 'GET', token)
        .then(data => {
          data.quizzes.forEach((q, i) => {
            ids.push(q.id)
          })
          // apply for adding a new game
          return sendRequest('admin/quiz/new', { name: game.name }, 'POST', token)
        })

        .then(data => {
          return sendRequest('admin/quiz', false, 'GET', token)
        })
      // success, get id of new game
        .then(data => {
          const qzs = data.quizzes;
          for (let i = 0; i < qzs.length; i++) {
            if (!ids.includes(qzs[i].id)) { return qzs[i].id }
          }
        })
      // update this game
        .then(id => {
          game.id = id;
          return sendRequest('admin/quiz/' + id, Data, 'PUT', token)
        })
        .then(() => {
          setGame(game);
        }).then(() => {
          alert('success!');
          history.push('/home');
        })
    } else {
      // if not a new game, upload it directly
      sendRequest('admin/quiz/' + Game.id, Data, 'PUT', token)
        .then(() => {
          console.log('success!');
          history.push('/home');
        })
        .catch(e => {
          alert(e);
        })
    }
  }

  function uploadFile (e) {
    const file = e.target.files[0];
    fileToDataUrl(file).then(data => { console.log(data) })
  }

  function addQuestion () {
    const q = initQuestion();
    q.qid = game.questions.length;
    game.questions.push(q);
    setQuestions(game.questions);
  }

  return <EditGamesContainer>
    <Contain>
      <Container >
        <div>
          Game name:
          <input type="text" onChange={(e) => {
            setName(e.target.value)
          }} value={name}/>
        </div>

        <div>Add picture <input type="file" onChange={(e) => { uploadFile(e); }}/></div>
      </Container>

      <Container>
        <img src={picture}/>
      </Container>
      <Buttons>
        <SaveButton clickFunc={submitChange} text={'Confirm'} type={'confirmEdit'}/>
      </Buttons>
    </Contain>

    <Wrapper>
    <QNavigator>
      {questions.map((q, i) =>
          <Link to={{
            pathname: '/editGames/' + game.id + '/question' + i,
            state: { game: game }
          }}
                style={{ marginRight: '3%' }}
                key={i}>{i}</Link>)}
    </QNavigator>
  <div>

    {
      <Switch>{
        questions.map((q, i) => <Route path={
          '/editGames/' + game.id + '/question' + i} key={i}>
          <EditQuestion questions={game.questions} question={q}
                        setQs={setQuestions} idx={i} addQ={addQuestion}/></Route>
        )
      }
      </Switch>
    }

    <Redirect to={{
      pathname: '/editGames/' + game.id + '/question0',
      state: {
        game: game
      }
    }}/>
  </div>

    </Wrapper>
  </EditGamesContainer>
}
// e.target.files[0]

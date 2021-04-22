import React, { useMemo } from 'react';
// import { AppBar, Toolbar } from '@material-ui/core';
import './App.css';
import { EditGames } from './pages/editGames';
// import { EditQuestion } from './object/editGame';
import { Home } from './pages/home'
import { WaitForPin } from './pages/waitForPin';
import { StartGame } from './pages/startGame';
import { JoinGame } from './playerPages/joinGame';
import { Gaming } from './playerPages/gaming';
import { UserContext } from './helper/UserContext';
import { WaitForPlayers } from './pages/waitForPlayers';
import { WaitingRoom } from './playerPages/waitingRoom';
import { GameEnd } from './playerPages/gameEnd.jsx';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import GameTable from './object/GameTable';
import ButtonAppBar from './object/NavBar';

function App11 () {
  // const [mode, changeMode] = React.useState('login');
  const [name, editName] = React.useState('');
  const [email, editEmail] = React.useState('');
  const [password, editPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const providerValue = useMemo(() => ({
    token,
    setToken,
    name,
    editName,
    email,
    editEmail,
    password,
    editPassword
  }), [token, name, email, password]);
  function Navigate () {
    return (
        <UserContext.Provider value={providerValue}>
        <nav>
        <ButtonAppBar/>
    </nav>
        </UserContext.Provider>);
  }

  return (
    <Router>
      <Navigate/>
      <div>
          <UserContext.Provider value={providerValue}>

            <Route path="/SignIn">
                {token
                  ? <Redirect to="/"/>
                  : <SignIn/>
                }
            </Route>

          <Route path="/SignUp">
            {token
              ? <Redirect to="/home" />
              : <SignUp/>
            }
          </Route>

            <Route path="/home">
                {token
                  ? <Home/>
                  : <Redirect to="/SignIn" />
                }
            </Route>
            <Route exact path="/">
              {token
                ? <Redirect to="/home" />
                : <Redirect to="/SignIn" />
              }
            </Route>
              <Route path="/editGames">
              {token
                ? <EditGames/>
                : <Redirect to="/SignIn" />
              }
            </Route>
              <Route path='/waitForPin/:id'>
                <WaitForPin/>
              </Route>
              <Route path='/waitForPlayers/:pin'>
                  <WaitForPlayers/>
              </Route>
              <Route path='/startGame'>
                  <StartGame/>
              </Route>
              <Route path='/waitingRoom/:sessionId/:playerId'>
                  <WaitingRoom/>
              </Route>
              <Route path='/joinGame/:sessionId'>
                  <JoinGame/>
              </Route>
              <Route path='/gaming/:pid'>
                  <Gaming/>
              </Route>
              <Route path='/gameEnd/:pid'>
                  <GameEnd/>
              </Route>
              <Route path='/GameTable'>
                  <GameTable/>
              </Route>

          </UserContext.Provider>

      </div>
    </Router>
  );
}

export default App11;

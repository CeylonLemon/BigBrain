import React from 'react';
import './App.css';
import { EditGames } from './pages/editGames';
import { Home } from './pages/home'
import { WaitForPin } from './pages/waitForPin';
import { StartGame } from './pages/startGame';
import { JoinGame } from './playerPages/joinGame';
import { Gaming } from './playerPages/gaming';
import { AlertProvider, ContextProvider, ControlProvider } from './helper/UserContext';
import { WaitForPlayers } from './pages/waitForPlayers';
import { WaitingRoom } from './playerPages/waitingRoom';
import { GameEnd } from './playerPages/gameEnd.jsx';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GameTable from './object/GameTable';
import ButtonAppBar from './object/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Snackbars from './object/SnackBars';
// import StoreProvider from './object/store'
function App11 () {
  const token = sessionStorage.getItem('token')
  return (
  <ContextProvider>
      <ControlProvider>
          <AlertProvider>
    <Router>
        <nav>
            <ButtonAppBar/>
        </nav>
      <div>

          <Route path="/SignIn">
              <SignIn/>
          </Route>

          <Route path="/SignUp">
              <SignUp/>
          </Route>

            <Route path="/home">
                 <Home/>

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

      </div>
    </Router>
          <Snackbars/>
          </AlertProvider>
      </ControlProvider>
  </ContextProvider>
  );
}

export default App11;

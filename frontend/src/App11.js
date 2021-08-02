import React from 'react';
import { Home } from './pages/home'
import { StartGame } from './pages/startGame';
import { JoinGame } from './playerPages/joinGame';
import Gaming from './playerPages/gaming';
import { AlertProvider, GamesProvider, MediaProvider } from './helper/UserContext';
import { WaitForPlayers } from './pages/waitForPlayers';
import { WaitingRoom } from './playerPages/waitingRoom';
import { GameEnd } from './playerPages/gameEnd.jsx';
import EndOfGame from './pages/EndOfGame';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ButtonAppBar from './object/NavBar';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Snackbars from './object/SnackBars';
function App11 () {
  return (
      <MediaProvider>
          <GamesProvider>
              <AlertProvider>
                  <Snackbars/>
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
                          <CacheSwitch>
                              <CacheRoute path="/home" component={Home}/>
                          </CacheSwitch>
                          <Route exact path="/">
                              {sessionStorage.getItem('token')
                                ? <Redirect to="/home" />
                                : <Redirect to="/SignIn" />
                              }
                          </Route>
                          <Route exact path='/waitForPlayers'>
                              <WaitForPlayers/>
                          </Route>
                          <Route path='/startGame'>
                              <StartGame/>
                          </Route>
                          <Route exact path='/waitingRoom'>
                              <WaitingRoom/>
                          </Route>
                          <Route path='/joinGame/:sessionId'>
                              <JoinGame/>
                          </Route>
                          <Route exact path='/gaming'>
                              <Gaming/>
                          </Route>
                          <Route exact path='/endOfGame'>
                              <EndOfGame/>
                          </Route>
                          <Route path='/gameEnd/:pid'>
                              <GameEnd/>
                          </Route>
                      </div>
                  </Router>
              </AlertProvider>
          </GamesProvider>
      </MediaProvider>
  );
}

export default App11;

import React, { useMemo } from 'react';
import './App.css';
import { Register, Login } from './pages/auth';
import { EditGames } from './pages/editGames';
// import { EditQuestion } from './object/editGame';
import { Home } from './pages/home'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { UserContext } from './helper/UserContext';

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
    return (<nav>
      <ul>
          {(token)
            ? <UserContext.Provider value={providerValue}>
                <li><Link to="/home">Home</Link></li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <button onClick={() => {
                  setToken('')
                }
                }>logout</button>
              </UserContext.Provider>
            : <UserContext.Provider value={providerValue}>
                <li><Link to="/register" >Register</Link></li>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </UserContext.Provider>
          }
      </ul>
    </nav>);
  }

  return (
    <Router>
      <Navigate/>
      <div>

          <UserContext.Provider value={providerValue}>
          <Route path="/login">
            {token
              ? <Redirect to="/"/>
              : <Login/>
            }
          </Route>
          <Route path="/register">
            {token
              ? <Redirect to="/home" />
              : <Register/>
            }
          </Route>
            <Route path="/users">
              {token
                ? <Users/>
                : <Redirect to="/login" />
                  }
            </Route>
            <Route path="/home">
                {token
                  ? <Home/>
                  : <Redirect to="/login" />
                }
            </Route>
            <Route path="/">
              {token
                ? <Redirect to="/home" />
                : <Redirect to="/login" />
              }
            </Route>
              <Route path="/editGames">
              {token
                ? <EditGames/>
                : <Redirect to="/login" />
              }
            </Route>

          </UserContext.Provider>

      </div>
    </Router>
  );
}

export default App11;

function Users () {
  return <>
        <h2>Users</h2>
    </>
}

import React, { useContext } from 'react';
import { UserContext } from '../helper/UserContext.js';
import { sendRequest } from '../helper/api';

export function Register () {
  const { setToken, email, password, editName, editEmail, editPassword } = useContext(UserContext);
  return <>
        <div>
            Name : <input type="text" onChange={ (e) => { editName(e.target.value) }}/>
        </div>
        <div>
            Email : <input type="text" onChange={ (e) => { editEmail(e.target.value) }}/>
        </div>
        <div>
            PassWord: <input type="text" onChange={ (e) => { editPassword(e.target.value) }}/>
        </div>
        <button onClick={ () => {
          const token = '';
          const Data = {
            email: email,
            password: password,
            name: name
          };
          sendRequest('admin/auth/register', Data, 'POST', false)
            .then(data => {
              setToken(data.token);
              editName(name);
              editEmail(email);
              editPassword(password);
            })
            .catch(e => { alert(e) })
          return token
        } }>Register</button>
    </>
}
export function Login () {
  const { setToken, email, password, editEmail, editPassword } = useContext(UserContext);
  return <>
        <div>
            Email : <input type="text" onChange={(e) => { editEmail(e.target.value) }}/>
        </div>
        <div>
            Password : <input type="text" onChange={(e) => { editPassword(e.target.value) }}/>
        </div>
        <button onClick={() => {
          const Data = {
            email: email,
            password: password,
          };
          sendRequest('admin/auth/login', Data, 'POST', false)
            .then(data => {
              setToken(data.token);
              editEmail(email);
              editPassword(password);
              console.log(data.token)
            })
            .catch(e => { alert(e) })
        } }>Login</button>
    </>
}
// 350804664
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJpYXQiOjE2MTgzMjIxNDJ9.ZgkVuISZzWtdjZ6ppxxiOXTyq8iXAElBcZ4zg-U1AZc

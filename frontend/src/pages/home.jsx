import React, { useRef } from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TableWrapper from '../object/TableWrapper'
import PopupWrapper from '../object/PopupWrapper';

export function Home () {
  const history = useHistory()
  const bodyRef = useRef()
  console.log('home render')
  if (!sessionStorage.getItem('token')) {
    history.push('/signIn')
  }
  return (
      <Container ref={bodyRef} style={{ marginTop: '100px' }}>
          <h2 id='greeting' style={{ padding: '0 0 3% 10%' }}>
              欢迎! {sessionStorage.getItem('email')}
          </h2>
          <div>
              <TableWrapper bodyRef={bodyRef}/>
          </div>
          <PopupWrapper/>
      </Container>
  );
}

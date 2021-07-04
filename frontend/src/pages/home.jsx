import React, { useContext } from 'react';
// import GameTable from '../object/GameTable';
// import { UserContext } from '../helper/UserContext';
import { Container } from '@material-ui/core';
// import Table from '../object/Table';
import { UserContext } from '../helper/UserContext';
import { useHistory } from 'react-router-dom';
import TableWrapper from '../object/TableWrapper'
import PopupWrapper from '../object/PopupWrapper';

export function Home () {
  const { token } = useContext(UserContext);
  const history = useHistory()
  if (!token) {
    history.push('/signIn')
  }
  // ('home¡')
  return <Container style={{ marginTop: '100px' }}>
        <h2 id='greeting'>Welcome! {name}</h2>
        <div>

                <TableWrapper/>
        </div>
      <PopupWrapper/>
    </Container>
}

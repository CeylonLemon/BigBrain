import React, { useContext } from 'react';
import GameTable from '../object/GameTable';
import { UserContext } from '../helper/UserContext';
import { Container } from '@material-ui/core';

export function Home () {
  const { name } = useContext(UserContext);
  return <Container style={{ marginTop: '100px' }}>
        <h2 id='greeting'>Welcome! {name}</h2>
        <div>
               <div>
                    <GameTable/>
                </div>
        </div>
    </Container>
}

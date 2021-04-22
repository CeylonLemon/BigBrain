import React from 'react';
// import { getResult } from '../helper/request';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';

export function GameEnd () {
  // const { pid } = useParams();
  const result = useLocation().state.result;
  return <Container style={{ marginTop: '100px' }}>
    <h2 id='endTitle'>Game End!</h2>
    <div>
      Your score: {result}
    </div>
  </Container>
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';

export function GameEnd () {
  const result = useLocation().state.result;
  return <Container style={{ marginTop: '100px' }}>
    <h2 id='endTitle'>游戏结束!</h2>
    <div>
      Your score: {result}
    </div>
  </Container>
}

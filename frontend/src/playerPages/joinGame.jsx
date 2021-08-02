import React from 'react';
import { joinGame } from '../helper/api';
import { useHistory, useParams } from 'react-router-dom'
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { DenseTextFields } from '../object/TextFiled';
import { StartButton } from '../object/Button';

export function JoinGame () {
  const history = useHistory();
  const { sessionId } = useParams();
  const [name, setName] = React.useState('');
  const join = () => {
    joinGame(sessionId, name)
      .catch(err => alert(err))
      .then((data) => {
        const { playerId, numOfQuestions } = data
        history.push({
          pathname: '/waitingRoom',
          search: `?pin=${sessionId}&pid=${playerId}&name=${name}&numOfQuestions=${numOfQuestions}`
        })
      })
  }
  return (
        <Box style={{ marginTop: '150px', textAlign: 'center' }}>
            <Typography gutterBottom variant="h2" component="h1">
                欢迎来到BigBrain!
            </Typography>
            <Typography gutterBottom variant="h4" component="h1">
                <form autoComplete='off'>
                    你的昵称:<DenseTextFields label='name' onChange={(e) => { setName(e.target.value) }}/>
                </form>
            </Typography>
            <StartButton text={'确认'} handleClick={join}/>
        </Box>
  );
}

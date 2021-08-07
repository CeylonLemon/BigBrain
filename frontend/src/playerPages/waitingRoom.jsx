import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { getCurrentQuestion, ADDRESS } from '../helper/api';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { Copy } from '../components/Buttons/icons';
import { copyLink } from '../helper/helper';
import { AlertContext, ACTIONS } from '../helper/UserContext';

export function WaitingRoom () {
  const location = useLocation()
  const queryString = require('query-string');
  console.log(queryString.parse(location.search))
  const { pin, pid, name, numOfQuestions } = queryString.parse(location.search);
  const history = useHistory();
  const { dispatchAlert } = useContext(AlertContext)
  console.log('waiting room render!')
  console.log(numOfQuestions)

  useEffect(() => {
    const io = require('socket.io-client')
    const socket = io(ADDRESS, { query: { pin, role: 'player', name } });
    socket.emit('join game', name)
    socket.on('advance game', async () => {
      const returnData = await getCurrentQuestion(pid)
      socket.close()
      console.log(numOfQuestions)
      history.push({
        pathname: '/gaming/',
        search: `?pin=${pin}&pid=${pid}&name=${name}`,
        state: { question: returnData.question, numOfQuestions }
      });
    })
  }, [])

  return (
  <Box style={{
    marginTop: '150px',
    textAlign: 'center',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }}>
    <Typography gutterBottom variant="h2" component="h1">
      等待房主开启游戏
    </Typography>
    <Typography gutterBottom variant="h4" component="h1">
      房间号码: {pin}
    </Typography>
    <Typography gutterBottom variant="h4" component="h1">
      玩家ID: {pid}
    </Typography>
    <Typography gutterBottom variant="h4" component="h1">
      邀请其他玩家加入<Copy
        handleClick={() => {
          copyLink(pin)
          dispatchAlert({
            type: ACTIONS.OPEN_ALERT,
            payload: {
              type: 'success',
              message: '链接复制成功'
            }
          })
        }}
        style={{ position: 'relative', height: '3.5vh', width: '30px', top: '3px', left: '3vh' }}/>
    </Typography>
  </Box>
  );
}

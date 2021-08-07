import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { endGame, advanceGame, ADDRESS } from '../helper/api';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Copy } from '../components/Buttons/icons'
import { ACTIONS, MediaContext, AlertContext } from '../helper/UserContext';
import { StartButton, StopButton } from '../components/Buttons/Button';
import { copyLink } from '../helper/helper';

export function WaitForPlayers () {
  const history = useHistory();
  const queryString = require('query-string');
  console.log(queryString.parse(location.search))
  const { gid, pin } = queryString.parse(location.search);
  const [players, setPlayers] = useState([])
  const socket = useRef()
  const { isDevice } = useContext(MediaContext)
  const { dispatchAlert } = useContext(AlertContext)
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%,0)',
      paddingTop: '10%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    deviceRoot: {
      // marginTop: '15%',
      position: 'absolute',
      left: '60%',
      transform: 'translate(-50%,0)',
      paddingTop: '10%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    header: {
      // position: 'absolute',
      // top: '25%',
      // left: '48%',
      // transform: 'translate(-50%,-50%)'
      margin: '0 auto'
    },
    divider: {
      '& > hr': {
        background: 'grey',
      },
      '& > span': {
        position: 'relative',
        bottom: '2.5vh',
        left: '42%',
        padding: '1vh',
        fontSize: '4vh',
        fontWeight: 'bold',
        background: '#FFFFFF',
        fontFamily: 'arial'
      },
      height: '1vh',
      width: '60vh',
      margin: '0 auto',
      paddingTop: '5vh'
      // position: 'absolute',
      // top: '42%',
      // left: '48%',
      // transform: 'translate(-50%,-50%)'
    },
    playersList: {
      '& > ul': {
        textAlign: 'center',
        padding: '0',
        fontSize: '1.5em',
        margin: '0.7em',
        fontFamily: 'roman'
      },
      height: '50vh',
      overflow: 'scroll',
      width: '40vh',
      margin: '0 auto',
      paddingTop: '10px',
      // position: 'absolute',
      // top: '70%',
      // left: '48%',
      // transform: 'translate(-50%,-50%)',
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center'
    },
    pin: {
      display: 'flex'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2vh'
    }
  }))
  const classes = useStyles()
  const endThisGame = () => {
    endGame(gid)
      .then(() => {
        history.push('/home')
      })
  }

  const startThisGame = () => {
    // request
    socket.current.close()
    advanceGame(gid)
      .then(() => {
        history.push({
          pathname: '/startGame',
          search: `?gid=${gid}&pin=${pin}`,
        }
        )
      }
      )
  }

  useEffect(() => {
    const getPinAndConnectToServer = async () => {
      // await startGame(gid)
      // const returnData = await getQuiz(gid).catch(e => alert(e))

      const io = require('socket.io-client')
      socket.current = io(ADDRESS,
        { query: { pin: pin, role: 'host' } });
      socket.current.on('join game', (name) => {
        console.log(`${name} come in`)
        setPlayers(prev => [...prev, name])
      })
      // console.log(socket)
      // setPageState({ loading: false, pin: returnData.active })
    }
    getPinAndConnectToServer()
  }, [])

  return (

      <div className={isDevice ? classes.deviceRoot : classes.root}>
            <header className={classes.header}>
              <div className={classes.pin}>
                <h1>房间码: <span id='pin'>{pin}</span></h1>
                <Copy
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
                    style={{ position: 'relative', height: '3.5vh', width: '3.5vh', top: '3.5vh', left: '3vh' }}/>
              </div>

              <h1>等待其它玩家加入...</h1>
              <div className={classes.buttons}>
                <StartButton handleClick={startThisGame}/>
                <StopButton handleClick={endThisGame}/>
              </div>

            </header>
            <div className={classes.divider}><Divider/><span>玩家</span></div>
            <div className={classes.playersList}>
              {players.map(player => (<ul key={player}>{player}</ul>))}
            </div>

          </div>)
}

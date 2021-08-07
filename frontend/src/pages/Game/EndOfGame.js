import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
}))
function EndOfGame () {
  const classes = useStyles()
  return <p className={classes.root}>问答结束</p>
}
export default EndOfGame

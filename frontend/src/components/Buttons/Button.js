import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UploadPic, Add } from './icons';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  addButton: {
    margin: theme.spacing(0.5, 1, 1, 1),
    height: '3vh',
    width: '3vh',
    background: 'none',
    border: 'none'
  },
  stop: {
    width: '12vh',
    margin: theme.spacing(1),
    '& > span': {
      fontFamily: 'roman',
    }
  },
  start: {
    width: '12vh',
    margin: theme.spacing(1),
    backgroundColor: '#6FDE32',
    '&:hover': {
      backgroundColor: '#5CB32C',
    }
  }
}));

export function TextButtons ({ label }) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Button color="primary">{label}</Button>

      </div>
  );
}
TextButtons.propTypes = {
  label: PropTypes.string,
}

export function FileInput ({ handleChange, style, uploadRef, id }) {
  const styleSheet = {
    input: {
      width: 0,
      height: 0,
      zIndex: -1,
      position: 'absolute',
      overflow: 'hidden',
      opacity: 0
    },
    label: {
      width: '10vh',
      height: '2.4vh',
      background: '#333333',
      color: 'white',
      fontFamily: 'Helvetica Neue',
      display: 'block',
      textAlign: 'center',
      lineHeight: '2.4vh',
      cursor: 'pointer'
    }
  }
  return <Fragment>
    <input
        type='file'
        id={id}
        style={styleSheet.input}
        onChange={handleChange}
        ref={uploadRef}
    />
    <label
        htmlFor={id}
        id='uploadButton'

    ><UploadPic style={style}/></label>
  </Fragment>
}
FileInput.propTypes = {
  uploadRef: PropTypes.object,
  style: PropTypes.object,
  handleChange: PropTypes.func,
  id: PropTypes.string
}

export function AddButton ({ handleClick }) {
  const classes = useStyles()
  return <button
      className={classes.addButton}
      onClick={handleClick}
      name='addQuizButton'
  >
    <Add style={{ height: '3vh', width: '3vh' }}/>
  </button>
}
AddButton.propTypes = {
  handleClick: PropTypes.func,
}

export const TableButton = styled(Button)`
  height:4vh;
`

export const StopButton = ({ handleClick, text }) => {
  const classes = useStyles()
  return <Button
      className={classes.stop}
      variant='contained'
      color='secondary'
      onClick={handleClick}
      size='medium'
  >{text || 'STOP'}</Button>
}
StopButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
}
export const StartButton = ({ handleClick, text }) => {
  const classes = useStyles()
  const buttonName = text || 'START'
  return <Button
      className={classes.start}
      variant='contained'
      color='secondary'
      onClick={handleClick}
      size='medium'
  >{buttonName}</Button>
}
StartButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
}

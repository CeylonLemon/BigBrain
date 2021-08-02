import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { UploadPic, Add } from './icons';

// import { fileToDataUrl } from '../helper/helper';

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

export function DeleteButton ({ clickFunc }) {
  const classes = useStyles();
  return <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => clickFunc()}
    >
        Delete
    </Button>
}

DeleteButton.propTypes = {
  clickFunc: PropTypes.func
}

export function SaveButton ({ clickFunc, text, type, style, size }) {
  const classes = useStyles();
  return <Button

      type={type}
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<SaveIcon/>}
      onClick={() => {
        clickFunc();
      }}
      size={size}
  >
        {text}
  </Button>
}
SaveButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  clickFunc: PropTypes.func,
  style: PropTypes.object,
  size: PropTypes.string
}
export function PrimaryButton ({ text, type, size, onClick }) {
  return <Button
      variant="contained"
      color="primary"
      type={type}
      size={size}
      onClick={() => { onClick() }}
  >
        {text}
  </Button>
}
PrimaryButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
}
export function Clearicon ({ clickFunc, idx, ifDisplay }) {
  if (ifDisplay) {
    return <ClearIcon
          onClick={() => {
            clickFunc(idx);
          }}
          style={{ fontSize: '20px' }}
      > </ClearIcon>
  } else {
    return <div style={{ paddingLeft: '20px' }}>   </div>
  }
}
Clearicon.propTypes = {
  ifDisplay: PropTypes.bool,
  clickFunc: PropTypes.func,
  idx: PropTypes.number,
}

export function UploadButton ({ onChange }) {
  // const classes = useStyles();

  const uploadStyle = {
    display: 'none',
  }

  const labelStyle = {
    color: 'white',
    height: '40px',
    width: '140px',
    textAlign: 'center',
    backgroundColor: '#f5af09',
    fontSize: '13px',
    cursor: 'pointer'
  }
  return <div>
      <input type="file" id="file"
             style={uploadStyle}
             onChange={(e) => {
               onChange(e)
             }}
      />
      <label htmlFor="file" >
          <Button style={labelStyle}>
              Choose a photo
          </Button>

      </label>
  </div>
}
UploadButton.propTypes = {
  onChange: PropTypes.func,
}
export function PlayButton ({ id, game }) {
  // const classes = useStyles();
  const history = useHistory()
  const handleClick = () => {
    history.push({
      pathname: '/waitForPin/' + id,
      state: { game: game }
    })
  }
  console.log(111)
  return <div>
        <PlayArrowIcon onClick={handleClick} />
    </div>
}

PlayButton.propTypes = {
  game: PropTypes.object,
  id: PropTypes.string,
}
export function BasicButton ({ text, clickHandler, style }) {
  return <button
        onClick= {clickHandler}
        style = {style}
    >
        {text}
    </button>
}
BasicButton.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  clickHandler: PropTypes.func
}
export const ShadowButton = styled(BasicButton)`
  border:none;
  background:none;
  box-shadow: 0.5px 0.5px 2px black;
`

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
export function SecondaryButtons ({ label }) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Button color="secondary">{label}</Button>
      </div>
  );
}
SecondaryButtons.propTypes = {
  label: PropTypes.string,
}

export function PrimaryButtons ({ label, handleClick }) {
  const classes = useStyles();

  return (
        <div className={classes.root}>
            <Button color="primary" onClick={() => { handleClick() }}>{label}</Button>
        </div>
  );
}
PrimaryButtons.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
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
// export const StopButton = styled(Button)`
//   color: red;
// `

export const StopButton = ({ handleClick }) => {
  const classes = useStyles()
  return <Button
      className={classes.stop}
      variant='contained'
      color='secondary'
      onClick={handleClick}
      size='medium'
  >STOP</Button>
}
StopButton.propTypes = {
  handleClick: PropTypes.func,
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

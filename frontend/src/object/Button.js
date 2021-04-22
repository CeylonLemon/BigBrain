import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons () {
  const classes = useStyles();
  return (
        <div>

            {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
            >
                Send
            </Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
            >
                Upload
            </Button>
            <Button
                variant="contained"
                disabled
                color="secondary"
                className={classes.button}
                startIcon={<KeyboardVoiceIcon />}
            >
                Talk
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
        </div>
  );
}

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

export function AddButton ({ clickFunc, text, style, type }) {
  console.log(typeof clickFunc)
  return <Button
        variant="contained"
        color="primary"
        onClick={() =>
          clickFunc()
        }
        style={style}
        type={type}
    >✛ {text}</Button>
}
AddButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  clickFunc: PropTypes.func
}

export function SaveButton ({ clickFunc, text, type }) {
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
  >
        {text}
  </Button>
}
SaveButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  clickFunc: PropTypes.func
}
export function PrimaryButton ({ text, type }) {
  return <Button
      variant="contained"
      color="primary"
      type={type}
  >
        {text}
  </Button>
}
PrimaryButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
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

export function UploadButton ({ clickFunc, text }) {
  // const classes = useStyles();
  return <Button style={{
    backgroundColor: 'blue',
    height: '25px',
    width: '70px'
  }}
  >
      <input type='file'
             onChange={(e) => {
               clickFunc(e);
             }}
             style={{ opacity: '0' }}
      />
  </Button>
}

UploadButton.propTypes = {
  clickFunc: PropTypes.func,
  text: PropTypes.string,
}
export function PlayButton ({ id, game }) {
  // const classes = useStyles();
  return <Link
      to={{
        pathname: '/waitForPin/' + id,
        state: { game: game }
      }}
      type='playGame'
  >
        <PlayArrowIcon/>
    </Link>
}

PlayButton.propTypes = {
  game: PropTypes.object,
  id: PropTypes.string,
}

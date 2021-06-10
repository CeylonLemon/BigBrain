import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useHistory } from 'react-router-dom'
// import { fileToDataUrl } from '../helper/helper';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
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

export function AddButton ({ clickFunc, text, style, type, size }) {
  console.log(typeof clickFunc)
  return <Button
        variant="contained"
        color="primary"
        onClick={() => {
          clickFunc();
        }}
        style={style}
        type={type}
        size={size}
    >✛ {text}</Button>
}
AddButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  clickFunc: PropTypes.func,
  size: PropTypes.string
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

// export function UploadButton ({ clickFunc, text }) {
//   // const classes = useStyles();
//   return <Button style={{
//     backgroundColor: 'grey',
//     height: '25px',
//     width: '70px'
//   }}
//   >
//       <input type='file'
//              onChange={(e) => {
//                clickFunc(e);
//              }}
//              style={{ opacity: '0' }}
//       />
//   </Button>
// }

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

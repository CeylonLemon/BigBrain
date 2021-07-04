import React, { useRef } from 'react';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import MainPanel from './MainPanel'
// import SubPanel from './SubPanel';
import './App.css'
import { ACTIONS } from '../helper/UserContext';
import SubPanelWrapper from './subPanelWrapper';
import BoilerPlate from './BoilerPlate';
// import { BrowserRouter as Router,Route } from 'react-router-dom';

// import { UserContext } from '../helper/UserContext';
// import SimpleDialogDemo from './Dialog';

const styles = (theme) => ({

  root: {
    '&': {
      margin: 0,
      padding: theme.spacing(1),
    },
    '& > button': {
      top: '2px'
    }

  },
  main: {
    width: '75%'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose
              ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                )
              : null}
        </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    height: '150vh',
    width: '100vh',
    justifyContent: 'space-around'
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    '&': {
      margin: 0,
      padding: theme.spacing(0),
    }

  },
}))(MuiDialogActions);

const handleSave = () => {
  // get new information
  // update state
}

function Popup ({ game, open, dispatchStates, dispatch, dispatchAlert }) {
  // const { games, editing } = useContext(UserContext)
  // const label = useRef(null)
  // const [open, setOpen] = useState(false)
  console.log('popup render')
  const handleClose = () => {
    dispatchStates({
      type: ACTIONS.CLOSE_POPUP
    })
  };
  const label = useRef()
  return (
      <RootRef rootRef={label}>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth={'md'}
                fullWidth={false}
                disablePortal={true}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>

                        <MainPanel game={game}
                                   key='mainPanel'
                                   dispatch={dispatch}
                                   dispatchAlert={dispatchAlert}
                                   />
                                   <SubPanelWrapper key='subPanel' game={game}/>
                                   <BoilerPlate key='boilerPlate' prop={1}/>
                        {/* <SubPanel game={game} dispatchStates={dispatchStates} QIndex={QIndex}/> */}

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
      </RootRef>
  );
}
Popup.propTypes = {
  props: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  game: PropTypes.object,
  editing: PropTypes.any,
  dispatch: PropTypes.func,
  alert: PropTypes.object,
  dispatchAlert: PropTypes.func,
  dispatchStates: PropTypes.func,
  QIndex: PropTypes.number
}
export default React.memo(Popup);

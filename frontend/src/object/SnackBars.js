import React, { useContext } from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ACTIONS, AlertContext } from '../helper/UserContext';
// import Popup from './Popup';

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const CustomizedAlert = ({ type, message }) => {
  return <Alert severity={type}>{message}</Alert>
}
CustomizedAlert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
}
export default function Snackbars () {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const { alert, dispatchAlert } = useContext(AlertContext)
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatchAlert({
      type: ACTIONS.CLOSE_ALERT
    });
  };

  return (
        <div className={classes.root}>
            {/* <Button variant="outlined" onClick={handleClick}> */}
            {/*    Open success snackbar */}
            {/* </Button> */}
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.type}>
                    {alert.message}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert> */}
            {/* <Alert severity="warning">This is a warning message!</Alert> */}
            {/* <Alert severity="info">This is an information message!</Alert> */}
            {/* <Alert severity="success">This is a success message!</Alert> */}
        </div>
  );
}

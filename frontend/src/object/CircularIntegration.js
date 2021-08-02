import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'flex'
  },
  buttonSuccess: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
    width: '35px',
    minHeight: '35px',
    height: '35px',
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  deviceButtonSuccess: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
    width: '40px',
    minHeight: '35px',
    height: '35px',
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonUnSuccess: {
    margin: theme.spacing(1),
    width: '35px',
    minHeight: '35px',
    height: '35px',
  },
  fabProgress: {
    margin: theme.spacing(1),
    color: green[500],
    position: 'absolute',
    top: -2,
    left: -2,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  alert: {
    verticalAlign: 'center',
    margin: theme.spacing(0.7, 1, 1, 1),
    paddingTop: '0.3vh',
    '& :first-child': {
      height: '3vh',
      '& :first-child': {
        padding: '0 0 1.4vh 0'
      },
      '& :nth-child(2)': {
        paddingTop: '0.2vh',
        height: '2vh'
      }
    },

  }
}));

export default function CircularIntegration ({ handleButtonClick }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonUnSuccess]: !success,
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // const handleButtonClick = () => {
  //   if (!loading) {
  //     setSuccess(false);
  //     setLoading(true);
  //     timer.current = window.setTimeout(() => {
  //       setSuccess(true);
  //       setLoading(false);
  //     }, 2000);
  //   }
  // };

  return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="secondary"
                    className={buttonClassname}
                    onClick={() => {
                      handleButtonClick(loading, setLoading, setSuccess)
                      // if (!loading) {
                      //   setSuccess(false);
                      //   setLoading(true);
                      //   timer.current = window.setTimeout(() => {
                      //     setSuccess(true);
                      //     setLoading(false);
                      //   }, 2000);
                      // }
                    }}
                    size={'small'}
                >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && <CircularProgress size={40} className={classes.fabProgress} />}
              <div className={classes.alert}>
                <Alert severity={success ? 'success' : 'error'} >Change unsaved!</Alert>
              </div>
            </div>
            {/* <div className={classes.wrapper}> */}
            {/*    <Button */}
            {/*        variant="contained" */}
            {/*        color="primary" */}
            {/*        className={buttonClassname} */}
            {/*        disabled={loading} */}
            {/*        onClick={handleButtonClick} */}
            {/*    > */}
            {/*        Accept terms */}
            {/*    </Button> */}
            {/* </div> */}
        </div>
  );
}
CircularIntegration.propTypes = {
  handleButtonClick: PropTypes.func
}

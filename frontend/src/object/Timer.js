import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:first-child': {
      margin: '0 auto',
      width: '22vh !important',
      height: '22vh !important',
    },

  },
  countdownNumber: {
    fontSize: '3em',
    fontWeight: 'bold',
    fontFamily: 'roman',
    color: 'white',
    display: 'inline-block',
    position: 'relative',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
}))

function CircularProgressWithLabel (props) {
  return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
  value: PropTypes.number.isRequired,
};

export default function Timer (props) {
  const { question, handleArrival } = props
  const timeLeft = question.duration
  const classes = useStyles()
  const progressPerSec = 100 / timeLeft
  const [progress, setProgress] = React.useState({
    progress: 0,
    timeLeft: timeLeft
  });
  console.log('timer update', timeLeft)

  React.useEffect(() => {
    console.log('effect', progress.progress)
    if (progress.progress > 0) {
      console.log('no time')
      setProgress({
        progress: 0,
        timeLeft: timeLeft
      })
    }
    const timer = setInterval(() => {
      console.log(progress.progress + progressPerSec)
      setProgress((prevProgress) => (
        prevProgress.progress >= 100
          ? prevProgress
          : { progress: prevProgress.progress + progressPerSec, timeLeft: prevProgress.timeLeft - 1 }
      ));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [question]);

  React.useEffect(() => {
    if (handleArrival && progress.progress === 100) {
      console.log('on time')
      handleArrival()
    }
  }, [progress])

  return <Box className={classes.root}>
      <CircularProgress
          variant="determinate"
          value={progress.progress}
          color='secondary'
          className={classes.root} />
      <span className={classes.countdownNumber}>{progress.timeLeft}</span>
  </Box>
}
Timer.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  timeLeft: PropTypes.number.isRequired,
  handleArrival: PropTypes.func,
  question: PropTypes.object.isRequired,
}

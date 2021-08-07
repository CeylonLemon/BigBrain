import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2, 2, 3),
    flexGrow: 1,
    overflow: 'scroll'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  option: {

    '& :hover': {
      WebkitTransition: 'background-color 300ms linear',
      MsTransition: 'background-color 300ms linear',
      transition: 'background-color 300ms linear',
      backgroundColor: '#ff99c2'
    },
    '& :first-child': {
      boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)'
    }
  },
  resultPaper: {
    '& :first-child': {
      boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)'
    }
  },
  'true-positive': {
    '& :first-child': {
      boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)'
    },
    backgroundColor: '#a6ff4d'
  },
  'false-positive': {
    '& :first-child': {
      boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)'
    },
    backgroundColor: '#ffe066'
  },
  'true-negative': {
    '& :first-child': {
      boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)'
    },
  },
  'false-negative': {
    '& :first-child': {
      boxShadow: '2px 2px 0px 2px rgb(0 0 0 / 20%), -1px -1px 1px 0px rgb(0 0 0 / 14%)'
    },
    backgroundColor: '#ff4d4d'
  }
}));

const handleSelection = (e) => {
  e.stopPropagation()
  console.log(e.target)
  if (e.target.dataset.selected === 'true') {
    e.target.dataset.selected = 'false'
    e.target.style.backgroundColor = ''
  } else {
    e.target.dataset.selected = 'true'
    e.target.style.backgroundColor = '#ffb3d1'
  }
}

export default function OptionsGrid ({ options, ansRef, result }) {
  const classes = useStyles();

  const SelectionGrid = () => {
    return <Grid container spacing={3} ref={ansRef} onClick={handleSelection}>
      {options.map(option =>
          <Grid key={option} item xs={6} className={classes.option}>
            <Paper className={classes.paper} data-selected='false'>{option}</Paper>
          </Grid>
      )}
    </Grid>
  }

  const ResultGrid = () => {
    const RESULT_COLOR = {
      'true-positive': '#a6ff4d',
      'false-positive': '#ff4d4d',
      'true-negative': '',
      'false-negative': '#ffe066'
    }
    return <Grid container spacing={3} ref={ansRef}>
      {result.map((res, i) =>
          <Grid key={options[i]} item xs={6} className={classes.option}>
            <Paper className={classes.paper} style={{ backgroundColor: RESULT_COLOR[res] }} data-selected='false'>{options[i]}</Paper>
          </Grid>
      )}
    </Grid>
  }

  return (
        <div className={classes.root} >
          {result.length ? <ResultGrid/> : <SelectionGrid/> }
        </div>
  );
}
OptionsGrid.propTypes = {
  ansRef: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  result: PropTypes.array
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function PrimaryButton ({ name, onClick }) {
  const classes = useStyles();

  return (
        <div className={classes.root}>
            <Button
                variant="contained"
                onClick={() => onClick()}
            >{name}</Button>
        </div>
  );
}
PrimaryButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
}

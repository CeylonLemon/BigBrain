import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {

    margin: theme.spacing(0.7),
    width: '25ch',

  },
  small: {
    '& > *': {
      margin: theme.spacing(0.7),
    },
    '& input': {
      width: '11ch'
    }
  },
  multi: {
    '& > *': {
      margin: theme.spacing(0.7),
      width: '12.5ch'
    }
  },
  mini: {
    '& > *': {
      margin: theme.spacing(0.7),
    },
    '& input': {
      padding: 0,
      height: '4ch',
      width: '12.5ch'
    }
  }
}));

export function BasicTextFields ({ label, id, value, size }) {
  const classes = useStyles();
  // const cls = styleClass || classes.root
  return (
      <TextField
          className={classes.root}
          id={id}
          label={label}
          variant="outlined"
          defaultValue={value}
          size={size}
      />
  );
}
BasicTextFields.propTypes = {
  label: PropTypes.string,
  styleClass: PropTypes.object,
  id: PropTypes.any,
  value: PropTypes.any,
  size: PropTypes.string
}

export function SmallTextFields ({ label, size, value, id }) {
  const classes = useStyles();
  return (
      <TextField value={value} className={classes.small} id={id} label={label} variant="outlined" size={size} />
  );
}
SmallTextFields.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.any,
  id: PropTypes.any
}
export function MultilineTextFields ({ defaultValue }) {
  const currencies = [
    {
      label: 'Single Selection',
    },
    {
      label: 'Multiple Selections',
    }
  ];
  // console.log(defaultValue)
  const [value, setValue] = useState(defaultValue)
  const classes = useStyles();
  // const [currency, setCurrency] = React.useState('EUR');
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
          <TextField
              className={classes.root}
              id="outlined-select-currency"
              select
              label="Select"
              variant="outlined"
              value = {value}
              size={'small'}
              onChange={handleChange}
          >
            {currencies.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>
  );
}
MultilineTextFields.propTypes = {
  defaultValue: PropTypes.string
}
export const MiniTextFields = ({ label }) => {
  const classes = useStyles();
  return (
      <TextField className={classes.mini} id="outlined-basic" label={label} variant="outlined" />
  );
}
MiniTextFields.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string
}

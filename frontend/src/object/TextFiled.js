import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {

    margin: theme.spacing(0.5),
    width: '12ch',
    fontSize: '1em'

  },
  medium: {
    '& > *': {
      margin: theme.spacing(0.7),
    },
    '& input': {
      width: '20ch'
    }
  },
  small: {
    '& > *': {
      margin: theme.spacing(0.7),
    },
    '& input': {
      width: '10ch',
    },
    // '& input:focus': {
    //   width: '4ch',
    // },
    // '& label': {
    //   margin: '0 auto',
    //   fontSize: '0.5em'
    // }
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
  },
  dense: {
    margin: theme.spacing(0.5),
    // marginRight: theme.spacing(1),
    width: '9ch',
  },
}));

export function BasicTextFields ({ label, id, value, size, refValue, onChange }) {
  const classes = useStyles();
  // const cls = styleClass || classes.root
  return (
      <TextField
          datatype={'label'}
          className={classes.root}
          id={id}
          label={label}
          variant="outlined"
          defaultValue={value}
          size={size}
          ref={refValue}
          onChange={onChange}
      />
  );
}
BasicTextFields.propTypes = {
  label: PropTypes.string,
  styleClass: PropTypes.object,
  id: PropTypes.any,
  value: PropTypes.any,
  size: PropTypes.string,
  refValue: PropTypes.any,
  onChange: PropTypes.func
}
export function MediumTextFields ({ label, size, defaultValue, id, refValue }) {
  const classes = useStyles();
  return (
      <TextField defaultValue={defaultValue} ref={refValue} className={classes.medium} id={id} label={label} variant="outlined" size={size} />
  );
}
MediumTextFields.propTypes = {
  refValue: PropTypes.object,
  label: PropTypes.string,
  size: PropTypes.string,
  defaultValue: PropTypes.any,
  id: PropTypes.any
}
export function SmallTextFields ({ label, size, defaultValue, id }) {
  const classes = useStyles();
  return (
      <TextField defaultValue={defaultValue} className={classes.small} id={id} label={label} variant="outlined" size={size} />
  );
}
SmallTextFields.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  defaultValue: PropTypes.any,
  id: PropTypes.any
}
export function MultilineTextFields ({ defaultValue, field }) {
  const currencies = [
    {
      label: 'Single',
    },
    {
      label: 'Multiple',
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
              select
              label="Selection"
              variant="outlined"
              value = {value}
              size={'small'}
              onChange={handleChange}
              {...field}
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
  defaultValue: PropTypes.string,
  field: PropTypes.object
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

export const DenseTextFields = (props) => {
  const classes = useStyles();
  const defaultValue = props.defaultValue || ''
  return (
      <TextField
          defaultValue={defaultValue}
          className={classes.dense}
          margin="dense"
          variant="outlined"
          {...props}
      />
  );
}

DenseTextFields.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
  size: PropTypes.string,
  register: PropTypes.object,
  props: PropTypes.object,
}

import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';

export default function AuthInput ({ label, field, errorText }) {
  return <TextField
        error={errorText || false}
        helperText = {errorText || undefined}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label={label}
        {...field}
    />
}

AuthInput.propTypes = {
  field: PropTypes.any,
  label: PropTypes.any,
  errorText: PropTypes.any,
}

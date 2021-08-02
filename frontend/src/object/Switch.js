import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { turn } from './Table'

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  wrapper: {
    marginTop: '2vh',
    padding: '0 0 1vh 3vh'
  },
  checked: {},
  track: {},
})(Switch);

export default function CustomizedSwitches () {
  const [state, setState] = React.useState(
    false);

  const handleChange = () => {
    setState(prevState => !prevState);
    const attr = !state ? 'allOn' : 'allOff';
    turn[attr]();
  };

  return (
        <div style={{
          marginTop: '1vh',
          padding: '0 0 1vh 3vh'
        }}>
            <FormControlLabel
                control={<PurpleSwitch
                    checked={state}
                    onChange={handleChange}
                    name="checkedA"
                    id="switch"
                />}
                label="Select All"

            />
        </div>
  );
}
